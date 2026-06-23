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

Write a throwaway script (scratchpad, not in the repo) like:

```python
import asyncio
from playwright.async_api import async_playwright

URL = "http://localhost:8765/index.html"
SECTIONS = ["servicios", "instalaciones", "equipo", "medios", "tienda", "calendario", "trabaja", "contacto"]

async def check(width, height, label):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": width, "height": height})
        await page.goto(URL, wait_until="networkidle")
        for sec in SECTIONS:
            await page.locator(f"#{sec}").scroll_into_view_if_needed()
            await page.wait_for_timeout(300)
            overflow = await page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
            print(f"[{label}] #{sec} overflow: {overflow}")  # must be 0
            await page.screenshot(path=f"{label}_{sec}.png")
        await browser.close()

asyncio.run(check(375, 812, "iphoneSE"))
asyncio.run(check(390, 844, "iphone12"))
```

`overflow` must print `0` for every section at both widths — anything
else means a fixed-width element (a `gridTemplateColumns` without a
`@media` override, a hardcoded `width: 380` card, etc.) is forcing
horizontal scroll.

To inspect a specific interactive panel (e.g. the service detail card
opened by clicking a tab in `#servicios`), click first, then
`scroll_into_view_if_needed()` + `screenshot()` on the specific
locator (e.g. `.service-detail-grid`) rather than the whole page.

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

`#instalaciones` (carousel) and `#calendario` sections intentionally use
`padding: '... 0 ...'` on the `<section>` itself (horizontal padding is
0) so their horizontal-scroll strips can bleed full-width — any global
mobile padding rule in `SHARED_CSS` must exclude them
(`section:not(#instalaciones):not(#calendario)`).

## Gotcha: Windows CRLF false positives

If you've just `git checkout`ed or merged and `git status` shows files
as modified but `git diff --stat` is empty, that's `core.autocrlf=true`
line-ending normalization, not a real change — safe to
`git checkout -- <file>` to clear it, but confirm the diff is genuinely
empty first and ask the user before discarding anything they didn't
explicitly name.
