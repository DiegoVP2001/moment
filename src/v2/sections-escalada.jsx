// ============ PÁGINAS NUEVAS — Clases de Escalada, Entrenamiento Funcional, Muro de Escalada, ============
// ============ Kinesiología y Nutrición (Sesión B del rediseño 2026)                             ============
// Componentes compartidos (PageHero, PriceRows, PriceSections, tabla de muro) + el contenido de
// cada una de las 5 páginas. Mismo patrón visual que el resto del sitio (SectionHeader/QC/Reveal/
// glow) — ver receta de "página nueva" en nuevo/sesiones/notas-sesion-a.md.

// --- Hero tipográfico (sin foto) + decoración QC — usado por las 5 páginas nuevas de esta sesión ---
function PageHero({ eyebrow, title, subtitle, accent = 'teal' }) {
  const ac = accent === 'pink' ? 'var(--pink)' : accent === 'blue' ? 'var(--blue)' : 'var(--teal)';
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--ink)', color: '#fff', padding: '168px 48px 100px' }}>
      <QC position="top-right" color={ac} size={220} style={{ opacity: .16 }}/>
      <QC position="bottom-left" color={ac} size={160} style={{ opacity: .12 }}/>
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          {eyebrow && <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: ac, marginBottom: 20 }}>{eyebrow}</div>}
          <h1 style={{ fontFamily: "'Archivo Black',sans-serif", fontWeight: 900, fontSize: 'clamp(42px, 7vw, 92px)', lineHeight: .98, letterSpacing: '-0.03em', margin: 0 }}>{title}</h1>
          {subtitle && <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,.72)', marginTop: 24, maxWidth: 620, textWrap: 'balance' }}>{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}

// --- Fila de precio clickeable → WhatsApp con el ítem precargado (mismo patrón que ServiceDetail) ---
function PriceRows({ items, serviceTitle, accentColor = 'var(--teal-dark)', isDark = false }) {
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(26,24,35,.08)';
  return (
    <div style={{ borderRadius: 16, border: `1px solid ${border}`, overflow: 'hidden', background: isDark ? '#1a1627' : '#fff' }}>
      {items.map((it, i) => (
        <a key={i} href={waLink(serviceTitle, it.k)} target="_blank" className="price-row"
          style={{ borderBottom: i < items.length - 1 ? `1px solid ${border}` : 'none' }}
          onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.03)' : 'var(--pink-50)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span className="price-row-num" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, opacity: .4 }}>{String(i + 1).padStart(2, '0')}</span>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 14 }}>
            {it.k}
            {it.note && <div style={{ fontSize: 12, color: isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)', marginTop: 2 }}>{it.note}</div>}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 15, color: accentColor }}>{it.v}</span>
          <span className="price-row-wa" style={{ fontSize: 10, fontFamily: "'Jost',sans-serif", color: '#25d366', fontWeight: 600 }}>WA →</span>
        </a>
      ))}
    </div>
  );
}

// --- Lista de precios agrupada por secciones (con notas arriba) — usada en Kinesiología ---
function PriceSections({ sections, notes, serviceTitle, accentColor = 'var(--teal-dark)' }) {
  return (
    <>
      {notes && notes.length > 0 && (
        <div style={{ background: 'var(--pink-50)', borderRadius: 14, padding: '14px 18px', marginBottom: 32 }}>
          {notes.map((n, i) => (
            <div key={i} style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, lineHeight: 1.5, color: 'var(--ink-60)', marginBottom: i < notes.length - 1 ? 6 : 0 }}>· {n}</div>
          ))}
        </div>
      )}
      {sections.map((sec, si) => (
        <div key={si} style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 17, letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: sec.subtitle ? 4 : 0 }}>{sec.title}</div>
            {sec.subtitle && <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: 'var(--ink-60)' }}>{sec.subtitle}</div>}
          </div>
          <PriceRows items={sec.items} serviceTitle={serviceTitle} accentColor={accentColor}/>
        </div>
      ))}
    </>
  );
}

// --- Tabla de precios de Muro de Escalada (categoría × horario × 3 columnas de precio) ---
function MuroPricingTable({ rows, accentColor = 'var(--pink-300)' }) {
  const border = 'rgba(26,24,35,.08)';
  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: 28, border: `1px solid ${border}`, overflowX: 'auto' }}>
      <table style={{ width: '100%', minWidth: 560, borderCollapse: 'collapse', fontFamily: "'Jost',sans-serif", fontSize: 14 }}>
        <thead>
          <tr>
            {['Categoría', 'Horario', 'Entrada', '10 tickets', 'Mensualidad'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '6px 14px 10px 0', color: 'var(--ink-60)', fontWeight: 500, whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderTop: `1px solid ${border}` }}>
              <td style={{ padding: '14px 14px 14px 0', fontWeight: 600, whiteSpace: 'nowrap' }}>{r.category}</td>
              <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>{r.schedule}</td>
              <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>{r.entry}</td>
              <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>{r.tickets10}</td>
              <td style={{ padding: '14px', color: accentColor, fontWeight: 700, whiteSpace: 'nowrap' }}>{r.monthly}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Lista simple de condiciones/bullets ---
function BulletList({ items }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', gap: 10, fontFamily: "'Jost',sans-serif", fontSize: 14, lineHeight: 1.5, color: 'var(--ink-60)' }}>
          <span style={{ color: 'var(--teal-dark)', flexShrink: 0 }}>—</span>{it}
        </li>
      ))}
    </ul>
  );
}

// --- Botón WhatsApp genérico (mensaje preescrito referido al servicio) ---
function WaGeneralCta({ serviceTitle, label }) {
  return (
    <a href={waGeneralLink(serviceTitle)} target="_blank" className="glow-teal" style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '15px 28px', borderRadius: 999, background: '#25d366', color: '#fff',
      fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 14, textDecoration: 'none'
    }}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.2L2 22l4.9-1.3c1.5.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
      {label || `Consultar por ${serviceTitle} vía WhatsApp`}
    </a>
  );
}

const italicAccent = color => ({ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 400, color });
const eyebrowLabel = txt => (
  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-60)', marginBottom: 16 }}>{txt}</div>
);

// ============ 5.1 — Clases de Escalada ============
function ClasesEscaladaContent() {
  const d = PAGE_CLASES_ESCALADA;
  return (
    <>
      <PageHero
        eyebrow="/ clases de escalada · moment"
        title={<>Sube de nivel,<br/><span style={italicAccent('var(--teal)')}>clase a clase.</span></>}
        subtitle="Clases grupales con instructor y arnés incluido — aprende técnica de escalada desde el primer día, sin importar tu nivel."
        accent="teal"
      />
      <section style={{ padding: '96px 48px 120px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <Reveal>
            {eyebrowLabel('Planes mensuales')}
            <PriceRows items={d.items} serviceTitle={d.title} accentColor="var(--teal-dark)"/>
          </Reveal>
          <Reveal delay={.1}>
            <div style={{ marginTop: 24, background: 'var(--pink-50)', borderRadius: 16, padding: '18px 22px', fontFamily: "'Jost',sans-serif", fontSize: 14, lineHeight: 1.6, color: 'var(--ink-60)' }}>
              {d.benefit}
            </div>
          </Reveal>
          <Reveal delay={.18}>
            <div style={{ marginTop: 36 }}><WaGeneralCta serviceTitle={d.title}/></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

// ============ 5.2 — Entrenamiento Funcional ============
function EntrenamientoFuncionalContent() {
  const d = PAGE_ENTRENAMIENTO_FUNCIONAL;
  return (
    <>
      <PageHero
        eyebrow="/ entrenamiento funcional · moment"
        title={<>Más fuerza,<br/><span style={italicAccent('var(--teal)')}>mejor escalada.</span></>}
        subtitle="Entrenamientos funcionales orientados a mejorar en la escalada, con horarios propios dentro del centro."
        accent="teal"
      />
      <section style={{ padding: '96px 48px 120px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <Reveal>
            {eyebrowLabel('Planes mensuales')}
            <PriceRows items={d.items} serviceTitle={d.title} accentColor="var(--teal-dark)"/>
          </Reveal>
          <Reveal delay={.1}>
            <div style={{ marginTop: 36 }}><WaGeneralCta serviceTitle={d.title}/></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

// ============ 5.3 — Muro de Escalada ============
function MuroEscaladaContent() {
  const d = PAGE_MURO_ESCALADA;
  return (
    <>
      <PageHero
        eyebrow="/ muro de escalada · moment"
        title={<>Escala a tu<br/><span style={italicAccent('var(--pink)')}>propio ritmo.</span></>}
        subtitle="Pases, tickets y mensualidades para nuestro muro indoor, con rutas de boulder renovadas periódicamente."
        accent="pink"
      />
      <section style={{ padding: '96px 48px 120px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <Reveal>
            {eyebrowLabel('Precios')}
            <MuroPricingTable rows={d.pricing}/>
          </Reveal>
          <Reveal delay={.1}>
            <div style={{ marginTop: 40 }}>
              {eyebrowLabel('Condiciones')}
              <BulletList items={d.conditions}/>
            </div>
          </Reveal>
          <Reveal delay={.18}>
            <div style={{ marginTop: 36 }}><WaGeneralCta serviceTitle={d.title}/></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

// ============ 6.1 — Kinesiología (primera vez con página/URL propia) ============
function KinesiologiaContent() {
  const d = PAGE_KINESIOLOGIA;
  return (
    <>
      <PageHero
        eyebrow="/ kinesiología deportiva · moment"
        title={<>Cuida el cuerpo<br/><span style={italicAccent('var(--teal)')}>que te sostiene.</span></>}
        subtitle="Evaluación, rehabilitación y optimización del movimiento para deportistas y personas activas."
        accent="teal"
      />
      <section style={{ padding: '96px 48px 120px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <PriceSections sections={d.sections} notes={d.notes} serviceTitle={d.title} accentColor="var(--teal-dark)"/>
          </Reveal>
          <Reveal delay={.1}>
            <div style={{ marginTop: 12 }}><WaGeneralCta serviceTitle={d.title}/></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

// ============ 6.3 — Nutrición (placeholder — sin precios todavía) ============
function NutricionContent() {
  const miguel = TEAM.find(t => t.name === 'Miguel');
  return (
    <>
      <PageHero
        eyebrow="/ nutrición deportiva · moment"
        title={<>Alimenta tu<br/><span style={italicAccent('var(--teal)')}>rendimiento.</span></>}
        subtitle="Planes alimenticios pensados para complementar tu entrenamiento y tu progreso en la escalada."
        accent="teal"
      />
      <section style={{ padding: '96px 48px 120px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <Reveal>
            <div style={{ border: '2px dashed rgba(26,24,35,.25)', borderRadius: 20, padding: '28px 26px', background: 'rgba(255,255,255,.5)' }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-60)', marginBottom: 10 }}>⏳ Contenido pendiente</div>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 1.6, color: 'var(--ink-60)', margin: 0 }}>
                Todavía no tenemos precios ni planes definidos para Nutrición Deportiva — esta página se
                completará más adelante. Mientras tanto, escríbenos por WhatsApp y te contamos los valores
                directamente.
              </p>
            </div>
          </Reveal>

          {miguel && (
            <Reveal delay={.1}>
              <div style={{ marginTop: 32, display: 'flex', gap: 20, alignItems: 'center', background: '#fff', borderRadius: 20, padding: 24, border: '1px solid rgba(26,24,35,.08)', flexWrap: 'wrap' }}>
                <img src={miguel.photo} style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}/>
                <div>
                  <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 18, letterSpacing: '-0.01em' }}>{miguel.name}</div>
                  <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: 'var(--teal-dark)', fontWeight: 600, margin: '4px 0 8px' }}>{miguel.role}</div>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, lineHeight: 1.5, color: 'var(--ink-60)', margin: 0 }}>{miguel.bio}</p>
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={.18}>
            <div style={{ marginTop: 36 }}><WaGeneralCta serviceTitle="Nutrición Deportiva" label="Consultar valores por WhatsApp"/></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

Object.assign(window, {
  PageHero, PriceRows, PriceSections, MuroPricingTable, BulletList, WaGeneralCta,
  ClasesEscaladaContent, EntrenamientoFuncionalContent, MuroEscaladaContent, KinesiologiaContent, NutricionContent
});
