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
            <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 17, letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: sec.subtitle || sec.note ? 4 : 0 }}>{sec.title}</div>
            {sec.subtitle && <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: 'var(--ink-60)' }}>{sec.subtitle}</div>}
            {sec.note && <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: 'var(--ink-60)', marginTop: 3 }}>· {sec.note}</div>}
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
    <div style={{ background: '#fff', borderRadius: 20, padding: 28, border: `1px solid ${border}` }}>
      <ScrollHintCard bg="#fff">
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
      </ScrollHintCard>
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
      <svg viewBox="0 0 32 32" width="18" height="18" fill="#fff"><path d="M16 3C9 3 3 9 3 16c0 2.5.7 4.9 2 7L3 29l6.3-2c2 1 4.3 1.6 6.7 1.6 7 0 13-6 13-13S23 3 16 3zm7.5 18.3c-.3.9-1.6 1.7-2.3 1.8-.6.1-1.3.1-2.1-.1-.5-.2-1.1-.3-1.9-.7-3.3-1.4-5.5-4.7-5.7-5-.2-.2-1.4-1.9-1.4-3.6 0-1.7.9-2.6 1.2-2.9.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .8.6.3.7 1 2.4 1.1 2.6.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.4-.5.6-.2.2-.4.4-.2.7.2.3.9 1.5 2 2.5 1.4 1.3 2.7 1.7 3 1.8.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.3.7-.2.3.1 1.9.9 2.2 1.1.3.2.5.2.6.3.1.2.1.9-.2 1.8z"/></svg>
      {label || `Consultar por ${serviceTitle} vía WhatsApp`}
    </a>
  );
}

// --- Ícono redondo de contacto (WhatsApp/Instagram/correo) — usado por ProCard cuando el
// profesional tiene canales propios distintos de los de Moment ---
function ContactIcon({ type, href }) {
  const cls = type === 'whatsapp' ? 'wa-pill' : type === 'instagram' ? 'ig-pill' : 'mail-pill';
  const label = type === 'whatsapp' ? 'WhatsApp' : type === 'instagram' ? 'Instagram' : 'Correo';
  return (
    <a href={href} target="_blank" className={cls} aria-label={label}>
      {type === 'whatsapp' && (
        <svg viewBox="0 0 32 32" width="20" height="20" fill="#fff"><path d="M16 3C9 3 3 9 3 16c0 2.5.7 4.9 2 7L3 29l6.3-2c2 1 4.3 1.6 6.7 1.6 7 0 13-6 13-13S23 3 16 3zm7.5 18.3c-.3.9-1.6 1.7-2.3 1.8-.6.1-1.3.1-2.1-.1-.5-.2-1.1-.3-1.9-.7-3.3-1.4-5.5-4.7-5.7-5-.2-.2-1.4-1.9-1.4-3.6 0-1.7.9-2.6 1.2-2.9.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .8.6.3.7 1 2.4 1.1 2.6.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.4-.5.6-.2.2-.4.4-.2.7.2.3.9 1.5 2 2.5 1.4 1.3 2.7 1.7 3 1.8.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.3.7-.2.3.1 1.9.9 2.2 1.1.3.2.5.2.6.3.1.2.1.9-.2 1.8z"/></svg>
      )}
      {type === 'instagram' && (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2 0 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c0-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1zm0 2.1c-3.1 0-3.5 0-4.7.1-1.1 0-1.7.2-2.1.3-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.1.4-.3 1-.3 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 1.1.2 1.7.3 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.1 1 .3 2.1.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1 0 1.7-.2 2.1-.3.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.1-.4.3-1 .3-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1.1-.2-1.7-.3-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.1-1-.3-2.1-.3-1.2-.1-1.6-.1-4.7-.1zm0 3.5a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4zm0 6.9a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4zm5.3-7.1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
      )}
      {type === 'email' && (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 12l8-5.99V6H4zm16 12V8.24l-7.35 5.51a1 1 0 0 1-1.2 0L4 8.24V18h16z"/></svg>
      )}
    </a>
  );
}

// --- Tarjeta de profesional (foto + rol + bio, desde TEAM en data.jsx) — usada al final de
// Kinesiología y Nutrición para poner cara al servicio. `contactsTitle`/`contacts` son opcionales
// — solo Nutrición los usa, para los canales propios de Miguel (distintos de los de Moment) ---
function ProCard({ member, contactsTitle, contacts, style = {} }) {
  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid rgba(26,24,35,.08)', ...style }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <img src={member.photo} style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}/>
        <div>
          <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 18, letterSpacing: '-0.01em' }}>{member.name}</div>
          <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: 'var(--teal-dark)', fontWeight: 600, margin: '4px 0 8px' }}>{member.role}</div>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, lineHeight: 1.5, color: 'var(--ink-60)', margin: 0 }}>{member.bio}</p>
        </div>
      </div>
      {contactsTitle && contacts && (
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(26,24,35,.08)' }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-60)', marginBottom: 12 }}>{contactsTitle}</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {contacts.whatsapp && <ContactIcon type="whatsapp" href={`https://wa.me/${contacts.whatsapp.replace(/\D/g, '')}`}/>}
            {contacts.instagram && <ContactIcon type="instagram" href={`https://www.instagram.com/${contacts.instagram}/`}/>}
            {contacts.email && <ContactIcon type="email" href={`mailto:${contacts.email}`}/>}
          </div>
        </div>
      )}
    </div>
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
        eyebrow={d.eyebrow}
        title={<>{d.titleLine1}<br/><span style={italicAccent('var(--teal)')}>{d.titleLine2}</span></>}
        subtitle={d.subtitle}
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
          <Reveal delay={.16}>
            <div style={{ marginTop: 40 }}>
              {eyebrowLabel('Horarios')}
              <ClassScheduleTable keyword="escalada"/>
            </div>
          </Reveal>
          <Reveal delay={.22}>
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
        eyebrow={d.eyebrow}
        title={<>{d.titleLine1}<br/><span style={italicAccent('var(--teal)')}>{d.titleLine2}</span></>}
        subtitle={d.subtitle}
        accent="teal"
      />
      <section style={{ padding: '96px 48px 120px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <Reveal>
            {eyebrowLabel('Planes mensuales')}
            <PriceRows items={d.items} serviceTitle={d.title} accentColor="var(--teal-dark)"/>
          </Reveal>
          <Reveal delay={.1}>
            <div style={{ marginTop: 40 }}>
              {eyebrowLabel('Horarios')}
              <ClassScheduleTable keyword="entrenamiento"/>
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

// ============ 5.3 — Muro de Escalada ============
function MuroEscaladaContent() {
  const d = PAGE_MURO_ESCALADA;
  return (
    <>
      <PageHero
        eyebrow={d.eyebrow}
        title={<>{d.titleLine1}<br/><span style={italicAccent('var(--pink)')}>{d.titleLine2}</span></>}
        subtitle={d.subtitle}
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
              {eyebrowLabel('Horarios')}
              <OpeningHoursTable/>
              <p style={{ marginTop: 14, fontFamily: "'Jost',sans-serif", fontSize: 13, lineHeight: 1.5, color: 'var(--ink-60)' }}>
                {d.blockExplanation}
              </p>
            </div>
          </Reveal>
          <Reveal delay={.16}>
            <div style={{ marginTop: 40 }}>
              {eyebrowLabel('Condiciones')}
              <BulletList items={d.conditions}/>
            </div>
          </Reveal>
          <Reveal delay={.22}>
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
  const karinna = TEAM.find(t => t.name === 'Karinna Araneda');
  return (
    <>
      <PageHero
        eyebrow={d.eyebrow}
        title={<>{d.titleLine1}<br/><span style={italicAccent('var(--teal)')}>{d.titleLine2}</span></>}
        subtitle={d.subtitle}
        accent="teal"
      />
      <section style={{ padding: '96px 48px 120px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <PriceSections sections={d.sections} notes={d.notes} serviceTitle={d.title} accentColor="var(--teal-dark)"/>
          </Reveal>
          {karinna && (
            <Reveal delay={.1}>
              <ProCard member={karinna} style={{ marginTop: 32 }}/>
            </Reveal>
          )}
          <Reveal delay={.16}>
            <div style={{ marginTop: 24 }}><WaGeneralCta serviceTitle={d.title}/></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

// ============ 6.3 — Nutrición ============
function NutricionContent() {
  const d = PAGE_NUTRICION;
  const miguel = TEAM.find(t => t.name.startsWith('Miguel'));
  return (
    <>
      <PageHero
        eyebrow={d.eyebrow}
        title={<>{d.titleLine1}<br/><span style={italicAccent('var(--teal)')}>{d.titleLine2}</span></>}
        subtitle={d.subtitle}
        accent="teal"
      />
      <section style={{ padding: '96px 48px 120px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <PriceSections sections={d.sections} notes={d.notes} serviceTitle={d.title} accentColor="var(--teal-dark)"/>
          </Reveal>

          {miguel && (
            <Reveal delay={.1}>
              <ProCard member={miguel} contactsTitle={d.proContactTitle} contacts={d.proContact} style={{ marginTop: 32 }}/>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

Object.assign(window, {
  PageHero, PriceRows, PriceSections, MuroPricingTable, BulletList, WaGeneralCta, ProCard,
  ClasesEscaladaContent, EntrenamientoFuncionalContent, MuroEscaladaContent, KinesiologiaContent, NutricionContent
});
