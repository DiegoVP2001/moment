---
description: Use when verifying that the Moment landing page (repo/index.html + src/v2/*.jsx) looks correct on mobile viewports — checks for horizontal overflow and takes screenshots at iPhone SE (375px) and iPhone 12 (390px) widths. Trigger phrases: "revisa mobile", "verifica responsive", "se ve bien en celular".
---

# Check mobile responsiveness — Moment landing

This repo is a no-build static site (React 18 + Babel Standalone via CDN,
no npm/node_modules by design — see repo root `CLAUDE.md`). There is no
project tooling for browser testing, so this skill documents the manual
path that actually worked, instead of rediscovering it each session.

## 1. Serve the site

```bash
cd repo && python -m http.server 8765 &
echo $! > /tmp/moment_server.pid
curl -sf http://localhost:8765/index.html >/dev/null && echo OK
```

Stop with `kill $(cat /tmp/moment_server.pid)` when done. Don't use
`npx serve -s` (SPA mode) — it rewrites all routes to `index.html` and
breaks navigation to `Quienes Somos.html` / `psicologia-deportiva.html`.

## 2. Playwright is NOT part of this repo

Installing it as an npm dependency would violate the project's
intentional no-build-step constraint. Install it at the system/user level
instead (outside `repo/`), once per machine:

```bash
pip install playwright
python -m playwright install chromium
```

## 3. Drive it — overflow check + screenshots

Since the 2026-08 redesign the site is multi-page — `index.html` no longer
has most of the old anchors. Test each page for the sections it actually
owns:

| Page | Sections to check |
|---|---|
| `index.html` | `instalaciones`, `informacion`, `ubicacion`, `servicios` |
| `Quienes Somos.html` | `equipo`, `medios`, `mision-vision`, `historia`, `por-que-moment` |
| `tienda.html` | (whole page, `ShopSection` has no id) |
| `contacto.html` | `contacto`, `trabaja` |
| `clases-escalada.html` / `entrenamiento-funcional.html` / `muro-escalada.html` / `kinesiologia.html` / `nutricion.html` | (whole page — no ids, `PageHero` + pricing content) |

Write a throwaway script (scratchpad, not in the repo) like:

```python
import asyncio
from playwright.async_api import async_playwright

PAGES = {
    "http://localhost:8765/index.html": ["instalaciones", "informacion", "ubicacion", "servicios"],
    "http://localhost:8765/Quienes%20Somos.html": ["equipo", "medios", "mision-vision", "historia", "por-que-moment"],
    "http://localhost:8765/muro-escalada.html": [],
    "http://localhost:8765/contacto.html": ["contacto", "trabaja"],
}

async def check(width, height, label):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": width, "height": height})
        for url, sections in PAGES.items():
            await page.goto(url, wait_until="networkidle")
            page_overflow = await page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
            print(f"[{label}] {url} page-level overflow: {page_overflow}")  # must be 0
            for sec in sections:
                loc = page.locator(f"#{sec}")
                await loc.scroll_into_view_if_needed()
                await page.wait_for_timeout(300)
                inner_overflow = await loc.evaluate("el => el.scrollWidth - el.clientWidth")
                print(f"[{label}] #{sec} own overflow: {inner_overflow}")  # see caveat below
                await page.screenshot(path=f"{label}_{sec.replace(' ', '_')}.png")
        await browser.close()

asyncio.run(check(375, 812, "iphoneSE"))
asyncio.run(check(390, 844, "iphone12"))
```

`page_overflow` must print `0` for every page at both widths — anything
else means a fixed-width element (a `gridTemplateColumns` without a
`@media` override, a hardcoded `width: 380` card, etc.) is forcing
horizontal scroll.

To inspect a specific interactive panel (e.g. the service detail card
opened by clicking a tab in `#servicios`), click first, then
`scroll_into_view_if_needed()` + `screenshot()` on the specific
locator (e.g. `.service-detail-grid`) rather than the whole page.

### Caveat: document-level overflow can read 0 while a section is secretly broken

Found 2026-08-08: `document.documentElement.scrollWidth - clientWidth`
(the whole-page check above) can print `0` even when a `<section>` inside
is genuinely overflowing, if that section's own overflow is being clipped
by `body{overflow-x:hidden}` (set globally on every page in this repo)
before it ever reaches the document root. The real bug was invisible to
the page-level check and only showed up by measuring the section's own
`scrollWidth` vs `clientWidth` directly (the `inner_overflow` column
above) — root cause was a CSS grid item missing `min-width:0`, so a card
containing a wide table refused to shrink and silently pushed content off
the right edge with **no way to scroll to it**. See `repo/CLAUDE.md` →
Notas de desarrollo → "Grid blowout" for the full writeup. **Always check
per-section overflow for anything containing a `<table>` or other
wide/nowrap content, not just the document-level number** — a clean
page-level `0` is not proof the page is fine.

## Responsive convention used in this codebase

Every component in `src/v2/*.jsx` is responsible for its own mobile
styles — there's no separate global stylesheet besides `SHARED_CSS` in
`shared.jsx`. The pattern, consistently, is:

```jsx
<div className="some-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', ... }}>
...
<style>{`@media(max-width:768px){.some-grid{grid-template-columns:1fr!important}}`}</style>
```

Breakpoints: **768px** (tablet/mobile) and **480px** (small mobile).
`!important` is required because it overrides an inline style.

`#instalaciones` (carousel) section intentionally uses
`padding: '... 0 ...'` on the `<section>` itself (horizontal padding is
0) so its horizontal-scroll strip can bleed full-width — any global
mobile padding rule in `SHARED_CSS` must exclude it
(`section:not(#instalaciones)`).

## Gotcha: Windows CRLF false positives

If you've just `git checkout`ed or merged and `git status` shows files
as modified but `git diff --stat` is empty, that's `core.autocrlf=true`
line-ending normalization, not a real change — safe to
`git checkout -- <file>` to clear it, but confirm the diff is genuinely
empty first and ask the user before discarding anything they didn't
explicitly name.
