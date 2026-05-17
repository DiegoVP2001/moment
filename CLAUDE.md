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
    sections-bottom.jsx ← CalendarSection + ShopSection + JobsSection + ContactSection
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

### CalendarSection
Actualmente usa datos estáticos desde `EVENTS` en `data.jsx`.
**Pendiente**: conectar a Google Calendar vía Google Apps Script JSON endpoint.

---

## Datos editables (data.jsx)
Todo el contenido editable está en `src/v2/data.jsx`:
- `BRAND` — nombre, teléfono, email, dirección, horarios, Instagram
- `SERVICES` — 4 servicios con precios, descripciones y `fullDetail` completo
- `TEAM` — 3 profesionales con foto, rol, bio y LinkedIn
- `CAROUSEL_ITEMS` — imágenes y videos del carrusel
- `MEDIOS` — videos de YouTube (youtubeId)
- `SHOP` — 6 productos de la tienda
- `EVENTS` — eventos próximos (hasta conectar Google Calendar)
- `JOBS` — vacantes

---

## Contacto / WhatsApp
- Número: `56998928078`
- Modal interceptor en `index.html` y `Quienes Somos.html`: captura clicks en links de WhatsApp y ofrece abrir en app, web, o copiar

---

## Deploy actual
- **GitHub Pages**: https://diegovp2001.github.io/moment/ (branch `main`, root)
- **Repo**: https://github.com/DiegoVP2001/moment

---

## Deploy pendiente — HostGator
- **Hosting**: HostGator Chile (cuenta momentcentrodeportivo@gmail.com)
- **Método recomendado**: subir archivos vía cPanel File Manager o FTP a `public_html/`
- **Dominio**: pendiente de confirmar nombre de dominio activo en la cuenta
- El sitio es 100% estático — no requiere PHP, Node.js ni base de datos
- Los `.mp4` son pesados (~varios MB); si el plan tiene límite de almacenamiento, considerar servir desde CDN externo

---

## Tareas pendientes

### Alta prioridad
- [ ] **Deploy en HostGator** — subir archivos a `public_html/`, verificar dominio
- [ ] **Google Calendar → Eventos** — Google Apps Script como JSON endpoint; la página hace `fetch()` al cargar y reemplaza `EVENTS` estáticos

### Media prioridad
- [ ] **Fotos del equipo actualizadas** — Miguel solo tiene nombre, sin apellido en `data.jsx`
- [ ] **Formulario de contacto funcional** — conectar a email real (Formspree, EmailJS o similar) en lugar del `alert()` actual
- [ ] **Fotos de productos en Tienda** — actualmente muestra placeholder "▢ Foto producto"
- [ ] **Imágenes carrusel adicionales** — actualmente repite 2 imágenes + 1 video (6 items = 3 únicos duplicados)

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
