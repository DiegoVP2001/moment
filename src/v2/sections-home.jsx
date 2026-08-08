// ============ INFORMACION + UBICACION + SERVICIOS (grid) — secciones nuevas del home ============

const DAY_COLS = [
  ['mon', 'Lun'], ['tue', 'Mar'], ['wed', 'Mié'], ['thu', 'Jue'], ['fri', 'Vie'],
];

// --- #informacion: horarios de apertura + horarios de clases + 3 accesos rápidos ---
function InfoSection({ theme }) {
  const isDark = theme === 'dark';
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(26,24,35,.08)';
  const cardBg = isDark ? '#0f0d17' : '#fff';
  const btnStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '14px 26px', borderRadius: 999, background: 'var(--teal)', color: 'var(--ink)',
    fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 14, textDecoration: 'none',
  };
  return (
    <section id="informacion" style={{ padding: '120px 48px', background: isDark ? '#1a1627' : 'var(--pink-50)', position: 'relative', overflow: 'hidden' }}>
      <QC position="top-right" color={isDark ? 'rgba(230,198,199,.06)' : 'var(--pink-200)'} size={160}/>
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionHeader eyebrow="/ información" title="Horarios y funcionamiento." theme={theme}/>
        </Reveal>

        <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 28, marginTop: 48, alignItems: 'start' }}>
          <Reveal delay={.08}>
            <div style={{ background: cardBg, borderRadius: 20, padding: 28, border: `1px solid ${border}`, overflowX: 'auto' }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)', marginBottom: 16 }}>Horario de apertura</div>
              <table style={{ width: '100%', minWidth: 300, borderCollapse: 'collapse', fontFamily: "'Jost',sans-serif", fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '6px 10px 10px 0', color: isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)', fontWeight: 500 }}>Día</th>
                    <th style={{ textAlign: 'left', padding: '6px 10px 10px', color: isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)', fontWeight: 500 }}>Horario</th>
                    <th style={{ textAlign: 'left', padding: '6px 0 10px', color: isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)', fontWeight: 500 }}>Bloque alto</th>
                  </tr>
                </thead>
                <tbody>
                  {OPENING_HOURS_FULL.map((row, i) => (
                    <tr key={i} style={{ borderTop: `1px solid ${border}` }}>
                      <td style={{ padding: '12px 10px 12px 0', fontWeight: 600, whiteSpace: 'nowrap' }}>{row[0]}</td>
                      <td style={{ padding: '12px 10px', whiteSpace: 'nowrap' }}>{row[1]}</td>
                      <td style={{ padding: '12px 0', color: 'var(--teal-dark)', fontWeight: 600, whiteSpace: 'nowrap' }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={.14}>
            <div style={{ background: cardBg, borderRadius: 20, padding: 28, border: `1px solid ${border}`, overflowX: 'auto' }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)', marginBottom: 16 }}>Horario de clases y entrenamientos</div>
              <table style={{ width: '100%', minWidth: 520, borderCollapse: 'collapse', fontFamily: "'Jost',sans-serif", fontSize: 13 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '6px 10px 10px 0', color: isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)', fontWeight: 500 }}>Horario</th>
                    {DAY_COLS.map(([, label]) => (
                      <th key={label} style={{ textAlign: 'left', padding: '6px 10px 10px', color: isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)', fontWeight: 500 }}>{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CLASS_SCHEDULE.map((row, i) => (
                    <tr key={i} style={{ borderTop: `1px solid ${border}` }}>
                      <td style={{ padding: '10px 10px 10px 0', whiteSpace: 'nowrap', fontWeight: 600 }}>{row.time}</td>
                      {DAY_COLS.map(([key]) => (
                        <td key={key} style={{ padding: '10px', color: row[key] ? 'inherit' : (isDark ? 'rgba(255,255,255,.25)' : 'rgba(26,24,35,.25)') }}>
                          {row[key] || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        <Reveal delay={.2}>
          <div style={{ display: 'flex', gap: 14, marginTop: 40, flexWrap: 'wrap' }}>
            <a href="clases-escalada.html" className="glow-teal" style={btnStyle}>Clases de Escalada →</a>
            <a href="entrenamiento-funcional.html" className="glow-teal" style={btnStyle}>Entrenamientos Funcionales →</a>
            <a href="muro-escalada.html" className="glow-teal" style={btnStyle}>Muro de Escalada →</a>
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:900px){.info-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// --- #ubicacion: título + bajada (mismo patrón que el resto del sitio) + mapa como tarjeta ---
function LocationSection({ theme }) {
  const isDark = theme === 'dark';
  return (
    <section id="ubicacion" style={{ padding: '120px 48px', background: isDark ? '#0f0d17' : 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      <QC position="top-right" color={isDark ? 'rgba(230,198,199,.06)' : 'var(--pink-200)'} size={160} style={{ opacity: .5 }}/>
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionHeader eyebrow="/ ubicación" title="Gimnasio de escalada"
            subtitle={`Estamos ubicados en ${BRAND.address} — a pasos de la plaza de Armas. Contamos con bicicleteros al interior del recinto.`}
            theme={theme}/>
        </Reveal>

        <Reveal delay={.12}>
          <div style={{ marginTop: 48, height: 420, position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 60px rgba(26,24,35,.12)' }}>
            <iframe src="https://www.google.com/maps?q=-33.753589,-70.902940&hl=es&z=16&output=embed" style={{ width: '100%', height: '100%', border: 0, display: 'block' }} loading="lazy" allowFullScreen title="Ubicación Moment"/>
            <a href="https://maps.app.goo.gl/9SdguuCr2wLYyhTT6" target="_blank" className="glow-pink" style={{ position: 'absolute', bottom: 20, right: 20, background: 'var(--pink)', padding: '12px 20px', borderRadius: 999, fontFamily: "'Jost',sans-serif", fontSize: 13, fontWeight: 600, textDecoration: 'none', color: 'var(--ink)' }}>Cómo llegar →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// --- Íconos inline para las categorías del grid sin PNG propio todavía ---
function BadgeIcon({ children, size = 88 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <circle cx="50" cy="50" r="50" fill="var(--ink)"/>
      {children}
    </svg>
  );
}
function SpecialtiesIcon({ size = 88 }) {
  return (
    <BadgeIcon size={size}>
      <path d="M50 26c-8 0-14 6-14 14 0 5 2.5 9 6.5 11.5L38 66h24l-4.5-14.5C61.5 49 64 45 64 40c0-8-6-14-14-14z" fill="none" stroke="var(--pink)" strokeWidth="4" strokeLinejoin="round"/>
      <path d="M42 40h16M50 32v16" stroke="var(--pink)" strokeWidth="4" strokeLinecap="round"/>
    </BadgeIcon>
  );
}
function ShopIcon({ size = 88 }) {
  return (
    <BadgeIcon size={size}>
      <path d="M32 40h36l-3 30a4 4 0 01-4 3.6H39a4 4 0 01-4-3.6z" fill="none" stroke="var(--pink)" strokeWidth="4" strokeLinejoin="round"/>
      <path d="M39 40v-4a11 11 0 0122 0v4" fill="none" stroke="var(--pink)" strokeWidth="4" strokeLinecap="round"/>
    </BadgeIcon>
  );
}
function TrainingBoardIcon({ size = 88 }) {
  return (
    <BadgeIcon size={size}>
      <rect x="26" y="34" width="48" height="28" rx="6" fill="none" stroke="var(--pink)" strokeWidth="4"/>
      <circle cx="37" cy="48" r="4" fill="var(--pink)"/>
      <circle cx="50" cy="48" r="4" fill="var(--pink)"/>
      <circle cx="63" cy="48" r="4" fill="var(--pink)"/>
      <path d="M40 62v7M60 62v7" stroke="var(--pink)" strokeWidth="4" strokeLinecap="round"/>
    </BadgeIcon>
  );
}

// PNG existentes (icon-climbing, icon-training) traen su propio fondo cuadrado —
// se recortan a círculo para que solo se vea el badge negro con la figura dentro.
function CircleCroppedIcon({ src, size = 88 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', background: 'var(--ink)' }}>
      <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }}/>
    </div>
  );
}

// --- #servicios: grid de 5 íconos (3 arriba, 2 abajo), reemplaza el viejo grid de tabs ---
function ServicesGridSection({ theme }) {
  const isDark = theme === 'dark';
  return (
    <section id="servicios" style={{ padding: '120px 48px', position: 'relative', overflow: 'hidden', background: isDark ? '#0f0d17' : '#fff' }}>
      <QC position="top-right" color="teal" size={160} style={{ opacity: .18 }}/>
      <QC position="bottom-left" color="teal" size={160} style={{ opacity: .18 }}/>
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionHeader eyebrow="/ servicios" title="Un centro pensado para acompañarte." theme={theme}/>
        </Reveal>
        <div className="services-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 28, marginTop: 56 }}>
          {SERVICES_GRID.map((item, i) => (
            <Reveal key={item.id} delay={i * .08} className="services-grid-item" style={{ flex: '0 0 calc((100% - 56px) / 3)' }}>
              <ServiceGridCard item={item} isDark={isDark}/>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){.services-grid-item{flex-basis:calc((100% - 28px) / 2)!important}}
        @media(max-width:560px){.services-grid-item{flex-basis:100%!important}}
      `}</style>
    </section>
  );
}

function ServiceGridCard({ item, isDark }) {
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(26,24,35,.08)';
  const cardStyle = {
    display: 'block', height: '100%', boxSizing: 'border-box',
    background: isDark ? 'rgba(255,255,255,.03)' : 'var(--cream)',
    border: `1px solid ${border}`, borderRadius: 24, padding: '36px 28px',
    textAlign: 'center', textDecoration: 'none', color: 'inherit',
  };
  const icon = item.icon
    ? <CircleCroppedIcon src={item.icon}/>
    : item.id === 'especialidades' ? <SpecialtiesIcon/>
    : item.id === 'tienda' ? <ShopIcon/>
    : <TrainingBoardIcon/>;

  const body = (
    <>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 20, margin: item.desc ? '0 0 10px' : 0, letterSpacing: '-0.01em' }}>{item.title}</h3>
      {item.desc && <p style={{ fontSize: 14, lineHeight: 1.5, color: isDark ? 'rgba(255,255,255,.6)' : 'var(--ink-60)', margin: 0, fontFamily: "'Jost',sans-serif" }}>{item.desc}</p>}
    </>
  );

  if (item.subitems) {
    return (
      <div style={cardStyle}>
        {body}
        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
          {item.subitems.map(si => (
            <a key={si.href} href={si.href} className="glow-teal" style={{
              padding: '10px 18px', borderRadius: 999, background: 'var(--teal)', color: 'var(--ink)',
              fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap',
            }}>{si.label}</a>
          ))}
        </div>
      </div>
    );
  }

  if (!item.href) {
    return <div style={{ ...cardStyle, opacity: .75 }}>{body}</div>;
  }

  return (
    <a href={item.href} className="glow-card" style={cardStyle}>
      {body}
    </a>
  );
}

Object.assign(window, { InfoSection, LocationSection, ServicesGridSection });
