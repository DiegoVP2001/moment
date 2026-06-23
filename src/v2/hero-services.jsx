// ============ HERO (Video) + SERVICES (Tabs/Modal) ============

// --- Hero with fullscreen video (no QC — video is visually rich enough) ---
function HeroVideo({ theme }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', color: '#fff' }}>
      <video
        autoPlay muted loop playsInline
        onCanPlay={() => setLoaded(true)}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: loaded ? 1 : 0, transition: 'opacity 1s' }}
      >
        <source src="assets/gym_video.mp4" type="video/mp4"/>
      </video>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,13,23,.25) 0%, rgba(15,13,23,.8) 100%)' }}/>
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1400, margin: '0 auto', padding: '0 48px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 80 }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <img src="assets/logo-isotype-pink.png" style={{ width: 48, height: 48 }}/>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--pink)' }}>◉ Centro Deportivo · Isla de Maipo</div>
          </div>
        </Reveal>
        <Reveal delay={.1}>
          <h1 style={{
            fontFamily: "'Archivo Black',sans-serif", fontWeight: 900,
            fontSize: 'clamp(56px, 10vw, 160px)', lineHeight: .88, letterSpacing: '-0.045em', margin: 0
          }}>
            Piensa en tu<br/>
            <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--pink)' }}>bienestar</span><span style={{ color: 'var(--teal)' }}>.</span>
          </h1>
        </Reveal>
        <Reveal delay={.2}>
          <p style={{ marginTop: 28, fontSize: 20, lineHeight: 1.5, maxWidth: 580, color: 'rgba(255,255,255,.8)', fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>
            Un espacio donde kinesiología, psicología, entrenamiento y escalada conviven con un mismo propósito.
          </p>
        </Reveal>
        <Reveal delay={.3}>
          <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
            <a href="#servicios" style={{ padding: '16px 28px', borderRadius: 999, background: 'var(--teal)', color: 'var(--ink)', fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Explorar servicios →</a>
            <a href="#instalaciones" style={{ padding: '16px 28px', borderRadius: 999, background: 'transparent', color: '#fff', fontFamily: "'Jost',sans-serif", fontWeight: 500, fontSize: 14, border: '1.5px solid rgba(255,255,255,.4)', textDecoration: 'none' }}>Conocer el centro</a>
          </div>
        </Reveal>
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: .6 }}>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, transparent, var(--pink))' }}/>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase' }}>scroll</div>
        </div>
      </div>
    </section>
  );
}

// --- Services section ---
function ServicesSection({ theme }) {
  const isDark = theme === 'dark';
  const [active, setActive] = useState(null);
  const accentFor = s => s.accent === 'teal' ? 'var(--teal)' : s.accent === 'blue' ? 'var(--blue)' : s.accent === 'pink' ? 'var(--pink)' : 'var(--ink)';

  return (
    <section id="servicios" style={{ padding: '120px 48px 100px', position: 'relative', overflow: 'hidden', background: isDark ? '#0f0d17' : 'var(--cream)' }}>
      <QC position="top-right"    color="teal" size={160} style={{ opacity: .18 }}/>
      <QC position="bottom-left"  color="teal" size={160} style={{ opacity: .18 }}/>
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionHeader eyebrow="/ servicios" title="Todo lo que tu cuerpo y mente necesitan." subtitle="Haz click en un servicio para ver más información y valores." theme={theme}/>
        </Reveal>
        <Reveal delay={.1}>
          <div style={{ display: 'flex', gap: 12, marginTop: 48, flexWrap: 'wrap' }}>
            {SERVICES.map((s, i) => {
              const ac = accentFor(s);
              const isActive = active === i;
              return (
                <button key={s.id} onClick={() => setActive(isActive ? null : i)} style={{
                  padding: '16px 28px', borderRadius: 999,
                  background: isActive ? ac : 'transparent',
                  color: isActive ? (s.accent === 'ink' ? '#fff' : 'var(--ink)') : (isDark ? '#fff' : 'var(--ink)'),
                  border: `2px solid ${isActive ? ac : (isDark ? 'rgba(255,255,255,.2)' : 'rgba(26,24,35,.15)')}`,
                  fontFamily: "'Jost',sans-serif", fontSize: 15, fontWeight: 600,
                  transition: 'all .3s', cursor: 'pointer'
                }}>{s.title}</button>
              );
            })}
          </div>
        </Reveal>
        {active !== null && (
          <ServiceDetail service={SERVICES[active]} theme={theme} onClose={() => setActive(null)}/>
        )}
      </div>

      {/* Visual divider into instalaciones */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 6,
        background: 'linear-gradient(90deg, var(--teal) 0%, var(--pink) 50%, var(--teal) 100%)',
        opacity: .35
      }}/>
    </section>
  );
}

function ServiceDetail({ service: s, theme, onClose }) {
  const [showFull, setShowFull] = useState(false);
  const isDark = theme === 'dark';
  const ac = s.accent === 'teal' ? 'var(--teal)' : s.accent === 'blue' ? 'var(--blue)' : s.accent === 'pink' ? 'var(--pink)' : isDark ? '#fff' : 'var(--ink)';
  const cardBg = isDark ? '#1a1627' : '#fff';
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(26,24,35,.06)';

  return (
    <>
      <div style={{ marginTop: 32, background: cardBg, borderRadius: 28, border: `1px solid ${border}`, overflow: 'hidden', animation: 'fadeSlideUp .4s ease' }}>
        <style>{`
          @keyframes fadeSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
          @media(max-width:768px){.service-detail-grid{grid-template-columns:1fr!important;padding:24px 20px 0!important;gap:28px!important}}
          @media(max-width:480px){.service-price-row{grid-template-columns:24px 1fr auto!important;gap:8px!important;padding:14px 14px!important}.service-price-wa{display:none}}
        `}</style>
        <div className="service-detail-grid" style={{ padding: '40px 40px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, opacity: .5 }}>{s.n}</div>
              <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 'clamp(26px,6vw,36px)', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.title}</h3>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: isDark ? 'rgba(255,255,255,.7)' : 'var(--ink-60)', fontFamily: "'Jost',sans-serif", margin: '0 0 20px' }}>{s.desc}</p>
            <div style={{ background: isDark ? 'rgba(255,255,255,.04)' : 'var(--pink-50)', borderRadius: 16, padding: 20, marginBottom: 24 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)', marginBottom: 10 }}>Descripción del servicio</div>
              <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0, fontFamily: "'Jost',sans-serif" }}>{s.detail}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href={waGeneralLink(s.title)} target="_blank" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 26px', borderRadius: 999, background: '#25d366', color: '#fff',
                fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 14, textDecoration: 'none'
              }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.2L2 22l4.9-1.3c1.5.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
                Agenda tu hora
              </a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)', marginBottom: 16 }}>Valores principales</div>
            <div style={{ borderRadius: 16, border: `1px solid ${border}`, overflow: 'hidden' }}>
              {s.items.map((it, i) => (
                <a key={i} href={waLink(s.title, it.k)} target="_blank" className="service-price-row" style={{
                  display: 'grid', gridTemplateColumns: '28px 1fr auto auto', gap: 14, alignItems: 'center',
                  padding: '16px 18px',
                  borderBottom: i < s.items.length - 1 ? `1px solid ${border}` : 'none',
                  textDecoration: 'none', color: 'inherit', transition: 'background .15s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.03)' : 'var(--pink-50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, opacity: .4 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 14 }}>{it.k}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 15, color: ac }}>{it.v}</span>
                  <span className="service-price-wa" style={{ fontSize: 10, fontFamily: "'Jost',sans-serif", color: '#25d366', fontWeight: 600 }}>WA →</span>
                </a>
              ))}
            </div>
            {s.id === 'psico' ? (
              <a href="psicologia-deportiva.html" style={{
                display: 'block', marginTop: 14, width: '100%', padding: '12px', borderRadius: 12,
                border: `1px dashed ${isDark ? 'rgba(106,166,218,.4)' : 'rgba(106,166,218,.5)'}`,
                color: 'var(--blue)', textAlign: 'center',
                fontFamily: "'Jost',sans-serif", fontSize: 13, textDecoration: 'none', boxSizing: 'border-box'
              }}>Ver sección completa de Psicología Deportiva →</a>
            ) : (
              <button onClick={() => setShowFull(true)} style={{
                marginTop: 14, width: '100%', padding: '12px', borderRadius: 12,
                border: `1px dashed ${isDark ? 'rgba(255,255,255,.15)' : 'rgba(26,24,35,.15)'}`,
                color: isDark ? 'rgba(255,255,255,.55)' : 'var(--ink-60)',
                fontFamily: "'Jost',sans-serif", fontSize: 13, cursor: 'pointer', background: 'transparent'
              }}>Ver detalle completo de planes →</button>
            )}
          </div>
        </div>
        <div style={{ padding: '16px 40px 20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ fontSize: 13, fontFamily: "'Jost',sans-serif", color: isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)' }}>Cerrar ×</button>
        </div>
      </div>

      {showFull && <ServiceFullModal service={s} theme={theme} onClose={() => setShowFull(false)}/>}
    </>
  );
}

// --- Full detail modal with all pricing sections ---
function ServiceFullModal({ service: s, theme, onClose }) {
  const isDark = theme === 'dark';
  const ac = s.accent === 'teal' ? 'var(--teal)' : s.accent === 'blue' ? 'var(--blue)' : s.accent === 'pink' ? 'var(--pink)' : 'var(--teal)';
  const fd = s.fullDetail;
  const border = 'rgba(26,24,35,.08)';

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, []);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(15,13,23,.82)',
      backdropFilter: 'blur(10px)', zIndex: 300,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 28, width: '100%', maxWidth: 720,
        maxHeight: '88vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 100px rgba(0,0,0,.35)', overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ padding: '28px 32px 20px', borderBottom: `1px solid ${border}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: ac, marginBottom: 8 }}>{s.n} · Detalle completo</div>
              <h2 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 28, margin: 0, letterSpacing: '-0.02em', color: 'var(--ink)' }}>{s.title}</h2>
            </div>
            <button onClick={onClose} style={{
              width: 36, height: 36, borderRadius: '50%', background: 'var(--pink-50)',
              border: 'none', fontSize: 18, cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)'
            }}>×</button>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: 'auto', padding: '24px 32px 8px', flex: 1 }}>
          {/* Notes */}
          {fd.notes && fd.notes.length > 0 && (
            <div style={{ background: 'var(--pink-50)', borderRadius: 14, padding: '14px 18px', marginBottom: 28 }}>
              {fd.notes.map((n, i) => (
                <div key={i} style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, lineHeight: 1.5, color: 'var(--ink-60)', marginBottom: i < fd.notes.length - 1 ? 6 : 0 }}>
                  · {n}
                </div>
              ))}
            </div>
          )}

          {/* Sections */}
          {fd.sections.map((sec, si) => (
            <div key={si} style={{ marginBottom: 28 }}>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 16, letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: sec.subtitle ? 4 : 0 }}>{sec.title}</div>
                {sec.subtitle && <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: 'var(--ink-60)' }}>{sec.subtitle}</div>}
              </div>
              <div style={{ borderRadius: 14, border: `1px solid ${border}`, overflow: 'hidden' }}>
                {sec.items.map((it, ii) => (
                  <a key={ii} href={waLink(s.title, it.k)} target="_blank" style={{
                    display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center',
                    padding: '13px 18px',
                    borderBottom: ii < sec.items.length - 1 ? `1px solid ${border}` : 'none',
                    textDecoration: 'none', color: 'inherit', transition: 'background .12s'
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--pink-50)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div>
                      <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'var(--ink)' }}>{it.k}</div>
                      {it.note && <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: 'var(--ink-60)', marginTop: 2 }}>{it.note}</div>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 14, color: ac }}>{it.v}</span>
                      <span style={{ fontSize: 10, color: '#25d366', fontWeight: 600, fontFamily: "'Jost',sans-serif" }}>WA →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{ padding: '16px 32px 24px', borderTop: `1px solid ${border}`, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {s.id === 'psico' && (
            <a href="psicologia-deportiva.html" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '13px', borderRadius: 999,
              background: 'transparent', color: 'var(--blue)',
              border: '1.5px solid var(--blue)',
              fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 14, textDecoration: 'none',
              transition: 'background .15s'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(106,166,218,.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              Ver sección completa de Psicología Deportiva →
            </a>
          )}
          <a href={waGeneralLink(s.title)} target="_blank" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            padding: '15px', borderRadius: 999, background: '#25d366', color: '#fff',
            fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 15, textDecoration: 'none'
          }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.2L2 22l4.9-1.3c1.5.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
            Consultar por {s.title} vía WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroVideo, ServicesSection, ServiceDetail, ServiceFullModal });
