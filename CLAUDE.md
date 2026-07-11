# Moment Centro Deportivo — Landing Page

## Resumen
Landing page estática para **Moment Centro Deportivo** (Isla de Maipo, Chile).
Servicios: Kinesiología, Psicología Deportiva, Entrenamiento & Recovery, Escalada.

---

## Stack técnico
- **React 18.3.1** vía CDN (UMD) — sin build step, sin npm
- **Babel Standalone 7.29.0** — transpila JSX en el browser
- **CSS-in-JS inline** + variables CSS en `:root`
- **Google Fonts** — Archivo Black, Jost, Inter, Playfair Display, Space Grotesk
- **Sin framework de routing** — dos páginas HTML independientes

---

## Estructura de archivos

```
index.html              ← Entry point principal (GitHub Pages / HostGator)
Quienes Somos.html      ← Página secundaria (nav + footer idénticos al landing)
Moment Landing.html     ← Versión legacy v1 (no usar)
assets/                 ← Imágenes, íconos, videos, PDFs
src/
  v2/
    data.jsx            ← Constantes de marca, datos de servicios, precios, equipo
    shared.jsx          ← Componentes reutilizables (Nav, Footer, QC, Reveal, InfoCard…)
    hero-services.jsx   ← Hero video + ServicesSection + ServiceDetail + ServiceFullModal
    sections-mid.jsx    ← CarouselSection + TeamSection + EnMediosSection
    sections-bottom.jsx ← ShopSection + JobsSection + ContactSection
    app.jsx             ← Root component + hash scroll handler
  (raíz src/)           ← Legacy v1, ignorar
```

---

## Componentes clave

### QC (Quarter Circle)
SVG de sector de anillo relleno. Parámetros: `position`, `color`, `size`, `style`.
- Posiciones: `top-right`, `top-left`, `bottom-right`, `bottom-left`
- Color default: `teal`. Otros: `pink`, `pink-light`, `ink`, o cualquier CSS color
- Los sweep-flags del SVG fueron corregidos: arco interior de 90° (no el de 270°)

### ServiceFullModal
Modal de detalle completo de planes. Se activa con "Ver detalle completo de planes →".
Los datos vienen de `fullDetail` en cada servicio dentro de `SERVICES` en `data.jsx`.

### CarouselSection
- Auto-scroll con `requestAnimationFrame` (0.6px/frame)
- Pausa en hover, drag manual en ambas direcciones
- Click en card → lightbox (imagen full o video con sonido)

---

## Datos editables (data.jsx)
Todo el contenido editable está en `src/v2/data.jsx`:
- `BRAND` — nombre, teléfono, email, dirección, horarios, Instagram
- `SERVICES` — 4 servicios con precios, descripciones y `fullDetail` completo
- `TEAM` — 3 profesionales con foto, rol, bio y LinkedIn
- `CAROUSEL_ITEMS` — imágenes y videos del carrusel
- `MEDIOS` — videos de YouTube (youtubeId)
- `SHOP` — 9 productos de la tienda (con campos `category` e `images[]`)
- `JOBS` — vacantes

### Estructura SHOP
Cada producto incluye `{ name, price, category, desc, images[] }`. Las categorías definidas son:
`'Magnesios'`, `'Magnesera'`, `'Cepillos'`, `'Tape deportivo'`, `'Entrenamiento'`, `'Recuperación'`.
El orden de renderizado está controlado por `SHOP_CATEGORY_ORDER` en `sections-bottom.jsx`.
Las imágenes se guardan en `assets/productos/` con nombres descriptivos (`magnesio-mix-1.jpg`, etc.).

La tienda usa **tabs por categoría** (botones-pill en la parte superior) en vez de una lista larga. El cambio de imagen en cada producto tiene una animación slide (`shopSlideRight`/`shopSlideLeft` en 220ms). Ambos están implementados en `ShopSection` y `ProductCard` en `sections-bottom.jsx`.

---

## Subpágina: Psicología Deportiva
- Archivo: `psicologia-deportiva.html` (raíz del repo, mismo nivel que `index.html`)
- No usa React — es HTML/CSS/JS puro (igual que `Quienes Somos.html`)
- Hero con `assets/hero-psicologia.jpg` (imagen royalty-free, Unsplash)
- Acento de color: `--blue: #6aa6da`
- Agendamiento: botón "Agenda tu hora" → WhatsApp (la integración con TUU Reserva se eliminó en junio 2026)
- WhatsApp interceptor idéntico al de las otras páginas
- El Nav del `index.html` (React) enlaza a esta página desde el dropdown "Más"
- En `ServiceFullModal` para psicología (`s.id === 'psico'`), hay un botón extra que abre esta subpágina

### Agendamiento — solo WhatsApp
- Se eliminó la integración con TUU Reserva (`tuu.cl/centrodeportivomoment`) en junio 2026. Todos los CTA de agendamiento (main y subpágina de psicología) usan únicamente links `wa.me` con texto **"Agenda tu hora"**.

### WA links — sin interceptor
- El interceptor de WhatsApp fue eliminado de `index.html`, `Quienes Somos.html` y `psicologia-deportiva.html` en mayo 2026.
- Los links `wa.me` con `target="_blank"` funcionan nativamente: en móvil abren la app, en desktop abren WhatsApp Web. No se necesita popup intermedio.

---

## Contacto / WhatsApp
- Número: `56998928078`
- Links `wa.me` nativos con `target="_blank"` (el modal interceptor se eliminó en mayo 2026 — ver sección "WA links — sin interceptor")

---

## Deploy
- **Producción**: https://centrodeportivomoment.cl — HostGator Chile (cuenta momentcentrodeportivo@gmail.com)
- **Pipeline**: push a la rama `production` dispara `.github/workflows/deploy.yml` (FTP-Deploy-Action, secretos `FTP_HOST/FTP_USER/FTP_PASS` ya configurados; solo sube diffs, ~20s). Excluye `.git*`, `CLAUDE.md`, `.cpanel.yml` y `Moment Landing.html`.
- **Flujo**: commit en `main` → push → merge `main` en `production` → push. GitHub Pages (https://diegovp2001.github.io/moment/) se actualiza solo con el push a `main`.
- **Repo**: https://github.com/DiegoVP2001/moment
- **Verificar el deploy**: pedir `https://centrodeportivomoment.cl/src/v2/data.jsx?nocache=<n>` — ojo: el servidor entrega `.jsx` como binario, en PowerShell `$r.Content` es `byte[]`; decodificar con `[Text.Encoding]::UTF8.GetString()` antes de buscar texto.
- Sitio 100% estático — no requiere PHP, Node.js ni base de datos.

---

## UX global implementada (mayo 2026)

### Nav scroll-inteligente
- `shared.jsx` Nav: `useEffect` con scroll listener — `transform: translateY(-110%)` al bajar, `translateY(0)` al subir. Threshold: 80px.
- `Quienes Somos.html` y `psicologia-deportiva.html`: mismo comportamiento en JS vanilla. El `<nav>` tiene `transition: transform .3s` en CSS.

### BackToTop (↑)
- `shared.jsx`: componente `BackToTop` exportado vía `window`. Usa `opacity` (no `display`) para mostrar/ocultar con fade. `bottom: 165px, right: 24px, z-index: 90`.
- `app.jsx`: `<BackToTop/>` montado al final del render (después de FloatingContacts).
- HTML pages: botón con `opacity:0` inicial, JS cambia `opacity` y `pointerEvents`.
- **CRÍTICO**: z-index del BTT debe ser > 80 (float-bar). Position `bottom: 165px` para quedar sobre el float-bar (WA + IG ocupan ~22px–138px). No usar `bottom < 145px` o queda tapado.

---

## Tareas pendientes

### Media prioridad
- [ ] **PDFs de planes desactualizados** — `assets/planes moment.pdf` y `assets/detalle_planes.pdf` tienen los precios antiguos (pre julio 2026: aún incluyen plan anual, plan dúo y clases por semana). Avisar al cliente si los comparte impresos o por WhatsApp.
- [ ] **Formulario de contacto funcional** — actualmente muestra `alert()`. Conectar a Formspree o EmailJS.
- [ ] **Fotos del equipo** — Miguel sin apellido en `data.jsx`. Fotos de equipo desactualizadas.
- [ ] **Imágenes carrusel** — actualmente repite 2 imágenes + 1 video (6 items = 3 únicos duplicados).

### Baja prioridad
- [ ] **Migrar a Vite** — eliminar Babel en browser (mejora ~2s de carga inicial)
- [ ] **React production build** — actualmente usa `.development.js`
- [ ] **Favicon personalizado** — actualmente usa logo isotipo oscuro

---

## Notas de desarrollo
- **No hay npm/node_modules** — es intencional, el sitio carga sin build
- Para editar: abrir archivos `src/v2/*.jsx` directamente; cambios en `data.jsx` actualizan todo el contenido
- **Hash scroll**: app.jsx tiene retry loop para manejar el caso de llegar desde Quienes Somos con `index.html#seccion`
- **Cache-busting**: los íconos de contacto tienen `?v=2` — al reemplazar assets futuros, incrementar el número
- **QC SVG paths correctos** (corregidos mayo 2026): top-right = `M 100,88 A 88,88 0 0,1 12,0 L 48,0 A 52,52 0 0,0 100,52 Z`. El error original tenía los sweep-flags invertidos.
