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
              <h2 style={titleStyle}>Cuidar al deportista completo</h2>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 1.6, color: bodyColor, margin: 0 }}>
                Ofrecer un servicio deportivo integral donde cada persona encuentre evaluación, rehabilitación, entrenamiento y acompañamiento psicológico en un solo lugar, con un equipo que trabaja de forma coordinada.
              </p>
            </div>
          </Reveal>
          <Reveal delay={.08}>
            <div className="glow-card" style={cardStyle}>
              <QC position="top-right" color="pink" size={70} style={{ opacity: .2 }}/>
              <div style={eyebrowStyle}>Visión</div>
              <h2 style={titleStyle}>Referente regional en bienestar deportivo</h2>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 1.6, color: bodyColor, margin: 0 }}>
                Ser el centro deportivo de referencia en la Región Metropolitana sur, reconocido por la calidad de su atención, la innovación de sus programas y el impacto real en la comunidad activa de Isla de Maipo y alrededores.
              </p>
            </div>
          </Reveal>
          <Reveal delay={.16}>
            <div className="glow-card" style={cardStyle}>
              <QC position="top-right" color="ink" size={70} style={{ opacity: .12 }}/>
              <div style={eyebrowStyle}>Valores</div>
              <h2 style={titleStyle}>Lo que nos mueve</h2>
              <ul style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 1.75, color: bodyColor, margin: 0, paddingLeft: 18 }}>
                <li><strong>Integralidad</strong> — cuerpo y mente, siempre juntos.</li>
                <li><strong>Cercanía</strong> — conocemos a cada persona por su nombre.</li>
                <li><strong>Evidencia</strong> — decisiones basadas en evaluación, no en supuestos.</li>
                <li><strong>Comunidad</strong> — el centro es de quienes lo usan.</li>
                <li><strong>Movimiento</strong> — todo empieza cuando decides moverte.</li>
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
          <h2 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 'clamp(36px,5vw,60px)', lineHeight: .95, letterSpacing: '-0.03em', margin: '0 0 16px', color: '#fff' }}>De una idea a un centro real.</h2>
        </Reveal>
        <Reveal delay={.05}>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.6, color: 'rgba(230,198,199,.7)', margin: '0 0 64px', maxWidth: 640 }}>
            Moment nació con una convicción: que kinesiología, psicología, entrenamiento y escalada deberían compartir el mismo techo. No como servicios separados, sino como un sistema que trabaja en conjunto por el bienestar de cada persona.
          </p>
        </Reveal>

        <div className="historia-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72 }}>
          <Reveal delay={.1}>
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 16, lineHeight: 1.65, color: 'rgba(230,198,199,.75)' }}>
              <p style={{ margin: '0 0 20px' }}>
                En 2026 abrimos las puertas en Calle Cortes 41, Isla de Maipo, con las cuatro áreas ya funcionando desde el primer día. Kinesiología, psicología deportiva, entrenamiento & recovery y escalada — todo integrado, todo en un mismo espacio.
              </p>
              <p style={{ margin: 0 }}>
                Somos un equipo multidisciplinario que cree que el rendimiento y el bienestar no se dividen: se construyen juntos.
              </p>
            </div>
          </Reveal>

          <Reveal delay={.16}>
            <div className="timeline">
              <div className="timeline-item">
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.12em', color: 'var(--teal)', marginBottom: 6 }}>2026</div>
                <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 20, margin: '0 0 8px', color: '#fff', letterSpacing: '-0.01em' }}>Apertura del centro</h3>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, lineHeight: 1.5, color: 'rgba(230,198,199,.65)', margin: 0 }}>Cuatro áreas integradas desde el día uno: kinesiología, psicología, entrenamiento y escalada indoor.</p>
              </div>
              <div className="timeline-item highlight">
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.12em', color: 'var(--pink)', marginBottom: 6 }}>Hoy</div>
                <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 20, margin: '0 0 8px', color: '#fff', letterSpacing: '-0.01em' }}>Comunidad en crecimiento</h3>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, lineHeight: 1.5, color: 'rgba(230,198,199,.65)', margin: 0 }}>Tienda, eventos, atenciones semanales y una comunidad activa que ya es parte del centro.</p>
              </div>
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
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--teal-dark)', marginBottom: 18 }}>/ por qué Moment</div>
        </Reveal>
        <Reveal delay={.05}>
          <h2 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 'clamp(32px,5vw,56px)', lineHeight: .95, letterSpacing: '-0.03em', margin: '0 0 56px' }}>Todo en un mismo lugar.</h2>
        </Reveal>

        <div className="mvv-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          <Reveal delay={.1}>
            <div style={statCardStyle}>
              <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 56, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--teal)' }}>4</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 16, fontWeight: 600, margin: '8px 0 6px' }}>Áreas especializadas</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'var(--ink-60)', lineHeight: 1.4 }}>Kinesiología, psicología, entrenamiento y escalada bajo un mismo techo.</div>
            </div>
          </Reveal>
          <Reveal delay={.16}>
            <div style={statCardStyle}>
              <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 56, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--pink-300)' }}>2026</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 16, fontWeight: 600, margin: '8px 0 6px' }}>Año de apertura</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'var(--ink-60)', lineHeight: 1.4 }}>Abrimos con las 4 áreas integradas desde el primer día, en Isla de Maipo.</div>
            </div>
          </Reveal>
          <Reveal delay={.22}>
            <div style={statCardStyle}>
              <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 56, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--teal)' }}>100%</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 16, fontWeight: 600, margin: '8px 0 6px' }}>Enfoque integral</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'var(--ink-60)', lineHeight: 1.4 }}>Cada área trabaja coordinada con las demás por tu bienestar completo.</div>
            </div>
          </Reveal>
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
