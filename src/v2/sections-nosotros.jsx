// ============ QUIÉNES SOMOS — Misión/Visión/Valores, Historia, Por qué Moment (Sesión C) ============
// Contenido migrado tal cual desde la vieja "Quienes Somos.html" (HTML/JS puro) al patrón
// React de este rediseño — mismo texto, solo cambia la implementación (ver PLAN-rediseno.md, 7.1).

// --- Misión / Visión / Valores ---
function MissionValuesSection({ theme }) {
  const isDark = theme === 'dark';
  const cardBg = isDark ? '#1a1627' : '#fff';
  const cardBorder = isDark ? 'rgba(255,255,255,.08)' : 'rgba(26,24,35,.06)';
  const bodyColor = isDark ? 'rgba(255,255,255,.65)' : 'var(--ink-60)';
  const cardStyle = { background: cardBg, borderRadius: 24, padding: 36, border: `1px solid ${cardBorder}`, position: 'relative', overflow: 'hidden', height: '100%', boxSizing: 'border-box' };
  const eyebrowStyle = { fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--teal-dark)', marginBottom: 16 };
  const titleStyle = { fontFamily: "'Archivo Black',sans-serif", fontSize: 26, margin: '0 0 14px', letterSpacing: '-0.01em' };
  return (
    <section id="mision-vision" style={{ padding: '120px 48px', background: isDark ? '#0f0d17' : 'var(--cream)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div className="mvv-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          <Reveal>
            <div className="glow-card" style={cardStyle}>
              <QC position="top-right" color="teal" size={70} style={{ opacity: .2 }}/>
              <div style={eyebrowStyle}>Misión</div>
              <h2 style={titleStyle}>{NOSOTROS_COPY.mission.title}</h2>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 1.6, color: bodyColor, margin: 0 }}>
                {NOSOTROS_COPY.mission.paragraph}
              </p>
            </div>
          </Reveal>
          <Reveal delay={.08}>
            <div className="glow-card" style={cardStyle}>
              <QC position="top-right" color="pink" size={70} style={{ opacity: .2 }}/>
              <div style={eyebrowStyle}>Visión</div>
              <h2 style={titleStyle}>{NOSOTROS_COPY.vision.title}</h2>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 1.6, color: bodyColor, margin: 0 }}>
                {NOSOTROS_COPY.vision.paragraph}
              </p>
            </div>
          </Reveal>
          <Reveal delay={.16}>
            <div className="glow-card" style={cardStyle}>
              <QC position="top-right" color="ink" size={70} style={{ opacity: .12 }}/>
              <div style={eyebrowStyle}>Valores</div>
              <h2 style={titleStyle}>{NOSOTROS_COPY.values.title}</h2>
              <ul style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 1.75, color: bodyColor, margin: 0, paddingLeft: 18 }}>
                {NOSOTROS_COPY.values.items.map((v, i) => (
                  <li key={i}><strong>{v.term}</strong>{' '}{v.rest}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:768px){.mvv-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// --- Historia (timeline visual) ---
function HistorySection() {
  return (
    <section id="historia" style={{ padding: '100px 48px 120px', background: 'var(--ink)', color: 'var(--pink-100)', position: 'relative', overflow: 'hidden' }}>
      <QC position="bottom-right" color="pink" size={200} style={{ opacity: .07 }}/>
      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 'clamp(36px,5vw,60px)', lineHeight: .95, letterSpacing: '-0.03em', margin: '0 0 16px', color: '#fff' }}>{NOSOTROS_COPY.history.title}</h2>
        </Reveal>
        <Reveal delay={.05}>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.6, color: 'rgba(230,198,199,.7)', margin: '0 0 64px', maxWidth: 640 }}>
            {NOSOTROS_COPY.history.subtitle}
          </p>
        </Reveal>

        <div className="historia-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72 }}>
          <Reveal delay={.1}>
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 16, lineHeight: 1.65, color: 'rgba(230,198,199,.75)' }}>
              <p style={{ margin: '0 0 20px' }}>
                {NOSOTROS_COPY.history.paragraph1}
              </p>
              <p style={{ margin: 0 }}>
                {NOSOTROS_COPY.history.paragraph2}
              </p>
            </div>
          </Reveal>

          <Reveal delay={.16}>
            <div className="timeline">
              {NOSOTROS_COPY.history.timeline.map((t, i) => (
                <div key={i} className={i === NOSOTROS_COPY.history.timeline.length - 1 ? 'timeline-item highlight' : 'timeline-item'}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.12em', color: i === NOSOTROS_COPY.history.timeline.length - 1 ? 'var(--pink)' : 'var(--teal)', marginBottom: 6 }}>{t.year}</div>
                  <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 20, margin: '0 0 8px', color: '#fff', letterSpacing: '-0.01em' }}>{t.title}</h3>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, lineHeight: 1.5, color: 'rgba(230,198,199,.65)', margin: 0 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`
        .timeline{position:relative;padding-left:40px}
        .timeline::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:2px;background:linear-gradient(180deg,var(--teal) 0%,var(--pink) 100%)}
        .timeline-item{position:relative;margin-bottom:40px}
        .timeline-item::before{content:'';position:absolute;left:-45px;top:8px;width:12px;height:12px;border-radius:50%;background:var(--teal);border:3px solid var(--cream);box-shadow:0 0 0 2px var(--teal)}
        .timeline-item:last-child{margin-bottom:0}
        .timeline-item.highlight::before{background:var(--pink);box-shadow:0 0 0 2px var(--pink)}
        @media(max-width:768px){.historia-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}

// --- Por qué Moment (estadísticas) ---
function WhyMomentSection({ theme }) {
  const isDark = theme === 'dark';
  const statCardStyle = { textAlign: 'center', padding: '36px 24px', background: isDark ? '#1a1627' : '#fff', borderRadius: 24, border: `1px solid ${isDark ? 'rgba(255,255,255,.08)' : 'rgba(26,24,35,.06)'}` };
  return (
    <section id="por-que-moment" style={{ padding: '100px 48px', background: isDark ? '#0f0d17' : 'var(--cream)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Reveal>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--teal-dark)', marginBottom: 18 }}>{NOSOTROS_COPY.whyMoment.eyebrow}</div>
        </Reveal>
        <Reveal delay={.05}>
          <h2 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 'clamp(32px,5vw,56px)', lineHeight: .95, letterSpacing: '-0.03em', margin: '0 0 56px' }}>{NOSOTROS_COPY.whyMoment.title}</h2>
        </Reveal>

        <div className="mvv-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {NOSOTROS_COPY.whyMoment.stats.map((s, i) => (
            <Reveal key={i} delay={.1 + i * .06}>
              <div style={statCardStyle}>
                <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 56, lineHeight: 1, letterSpacing: '-0.04em', color: i === 1 ? 'var(--pink-300)' : 'var(--teal)' }}>{s.number}</div>
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 16, fontWeight: 600, margin: '8px 0 6px' }}>{s.label}</div>
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'var(--ink-60)', lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={.28}>
          <div style={{ marginTop: 56, textAlign: 'center' }}>
            <a href="index.html#servicios" className="glow-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '17px 36px', borderRadius: 999, background: 'var(--ink)', color: 'var(--pink)', fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 15 }}>
              Ver servicios y valores →
            </a>
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:768px){.mvv-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

Object.assign(window, { MissionValuesSection, HistorySection, WhyMomentSection });
