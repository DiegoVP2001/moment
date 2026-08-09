# Moment Centro Deportivo — Landing Page

## Resumen
Sitio estático multi-página para **Moment Centro Deportivo** (Isla de Maipo, Chile),
gimnasio de escalada. Servicio principal: escalada (muro, clases, entrenamiento
funcional). Kinesiología, psicología y nutrición deportiva se ofrecen como
"Especialidades Deportivas" complementarias.

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
index.html                    ← Entry point principal (GitHub Pages / HostGator)
Quienes Somos.html            ← Sesión C — mini-app React (Equipo + En medios + Misión/Visión/Historia)
tienda.html                   ← Sesión C — mini-app React (reusa ShopSection tal cual)
contacto.html                 ← Sesión C — mini-app React (banner 3 íconos + JobsSection)
psicologia-deportiva.html     ← Subpágina HTML/JS puro (no React), ver sección propia abajo
clases-escalada.html          ← Sesión B — mini-app React
entrenamiento-funcional.html  ← Sesión B — mini-app React
muro-escalada.html            ← Sesión B — mini-app React
kinesiologia.html             ← Sesión B — mini-app React (antes era tab+modal dentro de #servicios)
nutricion.html                ← Sesión B — mini-app React, placeholder sin precios
Moment Landing.html           ← Versión legacy v1 (no usar)
assets/                       ← Imágenes, íconos, videos, PDFs
src/
  v2/
    data.jsx            ← Constantes de marca, datos de servicios, precios, equipo, horarios
    shared.jsx          ← Componentes reutilizables (Nav, Footer, QC, Reveal, InfoCard, ClassScheduleTable, OpeningHoursTable…)
    hero-services.jsx   ← Hero video (HeroVideo) — único export desde agosto 2026, ver nota abajo
    sections-mid.jsx    ← CarouselSection + TeamSection + EnMediosSection
    sections-bottom.jsx ← ShopSection + JobsSection + ContactBannerSection (Sesión C)
    sections-home.jsx   ← InfoSection + LocationSection + ServicesGridSection (secciones nuevas del home: #informacion, #ubicacion, #servicios)
    sections-escalada.jsx ← Sesión B: PageHero/PriceRows/PriceSections/MuroPricingTable/ProCard (compartidos) + contenido de las 5 páginas nuevas de Clases/Entrenamiento/Muro/Kinesiología/Nutrición
    sections-nosotros.jsx ← Sesión C: MissionValuesSection + HistorySection + WhyMomentSection (contenido migrado tal cual de la vieja Quienes Somos.html, ver PLAN-rediseno.md 7.1)
    app.jsx             ← Root component + hash scroll handler
  (raíz src/)           ← Legacy v1, ignorar
```

**Rediseño 2026 (Sesiones A/B/C completas, mergeadas a `main` y publicadas en
GitHub Pages — https://diegovp2001.github.io/moment/ — el 2026-08-08 para que
Diego se lo mostrara a sus clientes. `production` /centrodeportivomoment.cl
NO se ha tocado; el merge `main` → `production` sigue pendiente de una
aprobación explícita y separada de Diego)**: el sitio pasó de una
sola página a multi-página (nav/footer con rutas completas, no anchors
pelados). `index.html` hoy monta solo Hero → `#instalaciones` →
`#informacion` → `#ubicacion` → `#servicios` (grid) → Footer. `TeamSection` y
`EnMediosSection` se montan en `Quienes Somos.html`, `ShopSection` en
`tienda.html` y `JobsSection` en `contacto.html` (todas Sesión C) — ninguna
vive ya en `app.jsx`. El viejo `ContactSection` (formulario + mapa) fue
reemplazado por `ContactBannerSection` (3 íconos: correo/teléfono/dirección)
en `contacto.html` — el formulario de contacto fue **eliminado a propósito**,
no quedó pendiente de arreglar (ver "Tareas pendientes" más abajo).

**Código muerto eliminado (agosto 2026)**: `ServicesSection`/`ServiceDetail`/
`ServiceFullModal` (en `hero-services.jsx`, quedó solo `HeroVideo`), el array
`SERVICES` en `data.jsx`, y `ContactSection` (en `sections-bottom.jsx`) — nunca
se montaban en ninguna página tras el rediseño y sus precios estaban obsoletos.
El plan original de Sesión A asumía que `ServicesSection` se reutilizaría en
las páginas nuevas, pero no calzaba (es un selector de 4 tabs, no una página
de un solo servicio) — las páginas de Sesión B/C usan datos y componentes
propios en `sections-escalada.jsx`/`sections-nosotros.jsx`/`sections-bottom.jsx`
en su lugar.

Detalle completo del plan en `nuevo/PLAN-rediseno.md` y decisiones de cada
sesión en `nuevo/sesiones/notas-sesion-*.md`.

---

## Componentes clave

### QC (Quarter Circle)
SVG de sector de anillo relleno. Parámetros: `position`, `color`, `size`, `style`.
- Posiciones: `top-right`, `top-left`, `bottom-right`, `bottom-left`
- Color default: `teal`. Otros: `pink`, `pink-light`, `ink`, o cualquier CSS color
- Los sweep-flags del SVG fueron corregidos: arco interior de 90° (no el de 270°)

### ClassScheduleTable / OpeningHoursTable (agosto 2026)
- `shared.jsx`: tablas de horario reusadas por `#información` del home Y por las páginas
  de Clases/Entrenamiento/Muro (`sections-escalada.jsx`), para que nunca se desincronicen.
  Ambas leen `CLASS_SCHEDULE`/`OPENING_HOURS_FULL` de `data.jsx` como única fuente de verdad.
- `ClassScheduleTable({ keyword, isDark, cardBg })`: sin `keyword` muestra la tabla semanal
  completa (home); con `keyword` (ej. `"escalada"`, `"entrenamiento"`) filtra filas/celdas
  cuyo texto lo incluye y descarta filas sin ninguna coincidencia.
- `OpeningHoursTable({ isDark, cardBg })`: tabla Día/Horario/Bloque alto, tal cual.

### ProCard (agosto 2026)
- `sections-escalada.jsx`: tarjeta de profesional (foto + rol + bio desde `TEAM` en
  `data.jsx`). Usada al final de `kinesiologia.html` (Karinna) y `nutricion.html` (Miguel).

### CarouselSection
- Auto-scroll con `requestAnimationFrame` (0.6px/frame)
- Pausa en hover, drag manual en ambas direcciones
- Click en card → lightbox (imagen full o video con sonido)
- **Gotcha de zoom**: la posición se acumula en un `useRef` de JS (`posRef`), no se lee/escribe `scrollLeft` directamente cada frame — con zoom de navegador < ~90% Chrome redondea los incrementos sub-píxel a 0 y el auto-scroll queda congelado. Si se copia este patrón de rAF+scroll a otro componente, replicar el acumulador.

### SectionHeader
- `subtitle` usa `text-wrap: balance` — evita que el párrafo deje una última línea corta y desbalanceada ("rag" feo). Aplica a cualquier sección que use `subtitle`, no hace falta repetirlo.

### ScrollHintCard (agosto 2026)
- `shared.jsx`: wrapper para cualquier tabla/elemento ancho que necesite scroll horizontal en mobile. Props: `children`, `bg` (color de fondo de la tarjeta contenedora, para que el degradé de borde calce), `style`.
- Muestra un pill teal con flecha, centrado verticalmente, solo cuando `scrollWidth - scrollLeft - clientWidth > 8` (o sea, cuando de verdad queda contenido oculto a la derecha) — desaparece solo al llegar al final del scroll.
- Usado en las tablas de horario/precio del sitio: `#información` (`sections-home.jsx`), `MuroPricingTable`, y `ClassScheduleTable`/`OpeningHoursTable` en las páginas de Clases/Entrenamiento/Muro (`sections-escalada.jsx`).
- **Requiere que el ancestro inmediato no sea un grid/flex item sin `min-width:0`** — ver gotcha de "grid blowout" en Notas de desarrollo. El componente por sí solo no sirve de nada si el contenedor padre se estira en vez de encoger.

---

## Datos editables (data.jsx)
Todo el contenido editable está en `src/v2/data.jsx`:
- `BRAND` — nombre, teléfono, email, dirección, horarios, Instagram
- `CLASS_SCHEDULE` / `OPENING_HOURS_FULL` — horarios semanales, fuente única para el home y las páginas de Clases/Entrenamiento/Muro
- `PAGE_CLASES_ESCALADA` / `PAGE_ENTRENAMIENTO_FUNCIONAL` / `PAGE_MURO_ESCALADA` / `PAGE_KINESIOLOGIA` — precios de cada página nueva
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
- Nav y footer son HTML/JS propios (no comparten `shared.jsx`) pero replican la misma estructura que el resto del sitio — incluido el dropdown "Especialidades" — para que no se desalineen. Si cambia el Nav o el Footer de React, replicar el cambio a mano aquí (ver "Notas de desarrollo").

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

### Hover "glow" (agosto 2026, rediseño)
- `SHARED_CSS` define 5 clases reusables — `glow-teal`, `glow-pink`, `glow-outline`, `glow-card`, `glow-round` — cada una con `transform` + `box-shadow` coloreado a juego con el fondo del elemento. Úsalas en cualquier botón/tarjeta/pill clickeable nuevo (páginas de sesión B/C incluidas) en vez de escribir hover handlers a mano.
- No aplicar glow a elementos no-clickeables (ej. tarjeta "Training Boards", sin `href`) — sería engañoso.
- Links de texto plano del Nav (Quienes somos / Tienda / Contacto / labels de dropdown) usan la clase `.nav-link` (cambia a `var(--teal-dark)` al hover) — mismo criterio, reusar en vez de reinventar.

### Nav scroll-inteligente
- `shared.jsx` Nav: `useEffect` con scroll listener — `transform: translateY(-110%)` al bajar, `translateY(0)` al subir. Threshold: 80px.
- `Quienes Somos.html` y `psicologia-deportiva.html`: mismo comportamiento en JS vanilla. El `<nav>` tiene `transition: transform .3s` en CSS.

### BackToTop (↑)
- `shared.jsx`: componente `BackToTop` exportado vía `window`. Usa `opacity` (no `display`) para mostrar/ocultar con fade. `bottom: 165px, right: 24px, z-index: 90`.
- `app.jsx`: `<BackToTop/>` montado al final del render (después de FloatingContacts).
- HTML pages: botón con `opacity:0` inicial, JS cambia `opacity` y `pointerEvents`.
- **CRÍTICO**: z-index del BTT debe ser > 80 (float-bar). Position `bottom: 165px` para quedar sobre el float-bar (WA + IG ocupan ~22px–138px). No usar `bottom < 145px` o queda tapado.

---

## Panel de cliente (futuro, en planificación — no implementado)

Hay un plan (sin ejecutar todavía) para que Moment (el cliente) edite todo el
**texto** del sitio por su cuenta vía Google Sheets, sin depender de Diego —
detalle completo en `../panel-cliente/PLAN-panel-cliente.md` y el inventario
de campos en `../panel-cliente/CAMPOS.md`.

**Regla para cualquier sesión que trabaje en este repo**: si agregas una
página nueva, un componente con texto de cara al cliente, o cambias la forma
de un dato existente en `data.jsx`, actualiza `../panel-cliente/CAMPOS.md`
como parte del mismo trabajo (no lo dejes pendiente) — de lo contrario el
inventario de ese plan queda desincronizado del sitio real y el panel de
cliente, cuando se construya, va a fallar o va a mostrar campos que ya no
existen.

## Tareas pendientes

### Media prioridad
- [ ] **PDFs de planes desactualizados** — `assets/planes moment.pdf` y `assets/detalle_planes.pdf` tienen los precios antiguos (pre julio 2026: aún incluyen plan anual, plan dúo y clases por semana). Con el rediseño 2026 el modelo de precios cambió completo, así que ahora están aún más desactualizados. Avisar al cliente si los comparte impresos o por WhatsApp.
- [ ] **Fotos del equipo** — Miguel sin apellido en `data.jsx`. Fotos de equipo desactualizadas.
- [ ] **Copy "4 áreas" desactualizado** — el Hero de `index.html` (`hero-services.jsx`) y ahora también `Quienes Somos.html` (`sections-nosotros.jsx`, Historia y "Por qué Moment") siguen describiendo "kinesiología, psicología, entrenamiento & recovery y escalada" como 4 áreas iguales. Contradice el nuevo posicionamiento 100% escalada (kinesiología/psicología/nutrición pasaron a "Especialidades Deportivas" complementarias). En Sesión C el contenido de Quienes Somos se migró literal a propósito (no se reescribió) — pendiente una decisión de Diego sobre si actualizar el copy.
- [ ] **Flotante de WhatsApp/Instagram tapa CTAs de WhatsApp en mobile al hacer scroll** — `FloatingContacts` (`shared.jsx`, fixed, z-index 80) puede solaparse con filas de precio ("WA →"), el pill "Cómo llegar →" o el botón "Consultar" de un producto en `tienda.html`, dependiendo de dónde quede el scroll — confirmado con QA de Sesión C en 375px. Un tap en esa zona activa el flotante genérico en vez del link específico. No es nuevo de Sesión C (componente compartido, afecta cualquier página con esos elementos), pero conviene decidir un ajuste (reposicionar, reducir tamaño, o subir el z-index de los CTAs) antes de que un cliente lo reporte.
- [x] **Tablas de horarios/precios no se veían completas en mobile** — resuelto 2026-08-08. No era solo cosmético: `.info-grid` (`#información` en `index.html`) es un CSS grid cuyos items no tenían `min-width:0`, así que en mobile la tarjeta se estiraba para acomodar el ancho de la tabla en vez de encogerse — la sección entera se desbordaba del viewport y, como `body{overflow-x:hidden}`, las columnas de más ("Bloque alto", Jue/Vie) quedaban invisibles y **sin ninguna forma de hacerles scroll**. Se agregó `min-width:0` a los items del grid y el componente `ScrollHintCard` (ver Componentes clave) con indicador visual de scroll, aplicado a esa tabla y a `MuroPricingTable`.
- [x] **Imágenes carrusel** — resuelto en sesión A del rediseño 2026: se agregaron 3 fotos nuevas (`img_carrusel_instalacion_muro`, `img_carrusel_comunidad_1/2`) y se sacaron los 3 duplicados. 6 items, todos únicos.
- [x] **Formulario de contacto** — no se arregló, se **eliminó a propósito** en Sesión C del rediseño 2026 (decisión del plan, sección 7.3): `contacto.html` ya no tiene formulario ni mapa, solo banner de contacto directo + vacantes. El viejo `ContactSection` con el `alert()` quedó como código muerto sin montar.

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
- **Dropdowns con `onMouseLeave` en un wrapper `position:relative`**: si el menú desplegado tiene `marginTop` para separarse visualmente del botón, ese hueco debe ir como `paddingTop` en el contenedor absoluto (no como `marginTop` en la tarjeta visible) — si no, el hueco queda fuera del área que escucha el hover y el menú se cierra solo al cruzarlo. Ver `NavDropdown` en `shared.jsx`.
- **"Grid blowout" con tablas/contenido ancho dentro de un CSS grid** (agosto 2026): un `overflow-x:auto` en un div no sirve de nada si algún ancestro es un item de grid o flex sin `min-width:0` — por default el item se niega a encogerse por debajo del ancho mínimo de su contenido (la tabla), así que en vez de scrollear internamente, TODA la sección se desborda del viewport. Con `body{overflow-x:hidden}` (global en todas las páginas) eso deja contenido invisible y sin scroll posible, no solo "feo". Si se agrega una tabla/tarjeta ancha dentro de un `display:grid` o `display:flex`, siempre sumar `min-width:0` al item del grid/flex, y envolver el contenido scrolleable con `ScrollHintCard` (`shared.jsx`) para que además quede visualmente claro que hay más para el lado. Ver fix completo en el commit `13e841a`.
- **Nav de 5 links de escritorio (agosto 2026)**: con el dropdown "Especialidades" agregado junto a "Clases, Entrenamiento y Muro", el nav de escritorio pasa al menú hamburguesa en `max-width:1080px` (no `768px` como el resto del layout) — ver el bloque `@media(max-width:1080px)` en `SHARED_CSS`. Si se agrega o saca un ítem del nav, revisar si ese breakpoint sigue siendo el correcto.
- **`psicologia-deportiva.html` no comparte Nav/Footer de React**: es la única página con nav y footer escritos a mano (HTML/CSS/JS puro, ver sección propia arriba). Cualquier cambio a la estructura del `Nav` o `Footer` de `shared.jsx` (agregar/sacar un link, un dropdown, una columna) hay que replicarlo a mano en esta página o queda desalineada — ya pasó una vez (menú y footer quedaron con contenido de mayo 2026 hasta la corrección de agosto 2026).
