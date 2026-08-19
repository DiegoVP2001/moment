// ============ PÁGINA — Psicología Deportiva (migración a React, agosto 2026) ============
// Migra psicologia-deportiva.html (antes HTML/CSS/JS puro, la única página fuera del patrón
// data.jsx) al mismo patrón que el resto del sitio, para que entre al panel de cliente. Archivo
// propio (no sumado a sections-escalada.jsx) por el tamaño: 12 secciones, ~90 campos editables.
// Ver panel-cliente/sesiones/notas-sesion-psicologia-react.md para el detalle de decisiones.

const PSICOLOGIA_CSS = `
.problem-grid,.area-grid,.audience-grid,.sports-grid,.fitness-grid,.tools-grid,.service-cards,.program-grid{min-width:0}
.problem-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.problem-card{background:#fff;border-radius:16px;padding:20px 22px;border:1px solid rgba(26,24,35,.07);cursor:pointer;transition:transform .15s,box-shadow .15s,border-color .15s;min-width:0;overflow-wrap:break-word}
.problem-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(106,166,218,.18);border-color:var(--blue)}
.area-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.psic-card{background:#fff;border-radius:20px;padding:28px;border:1px solid rgba(26,24,35,.06);transition:transform .2s,box-shadow .2s;min-width:0;overflow-wrap:break-word}
.psic-card:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(26,24,35,.09)}
.audience-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.sports-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.sport-item{padding:18px 14px;text-align:center;background:rgba(255,255,255,.06);border-radius:14px;border:1px solid rgba(255,255,255,.08);cursor:pointer;transition:transform .15s,background .15s,border-color .15s;font-family:'Jost',sans-serif;font-size:14px;font-weight:500;color:#fff;min-width:0}
.sport-item:hover{background:var(--blue-light);border-color:var(--blue);transform:translateY(-2px)}
.fitness-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
.fitness-grid>*{min-width:0}
.tools-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.service-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.program-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:start}
.program-highlight{background:var(--ink);color:#fff}
.program-highlight h3{color:#fff}
.program-highlight li{color:rgba(255,255,255,.7)}
.psic-modal-overlay{position:fixed;inset:0;background:rgba(15,13,23,.8);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px}
.psic-modal-box{background:#fff;border-radius:24px;max-width:520px;width:100%;padding:36px;position:relative;box-shadow:0 40px 100px rgba(0,0,0,.3)}
@media(max-width:900px){
  .program-grid,.service-cards,.audience-grid,.sports-grid,.area-grid{grid-template-columns:repeat(2,1fr)!important}
}
@media(max-width:768px){
  .problem-grid,.area-grid,.tools-grid{grid-template-columns:1fr 1fr!important}
  .fitness-grid{grid-template-columns:1fr!important;gap:32px!important}
}
@media(max-width:520px){
  .problem-grid,.sports-grid{grid-template-columns:1fr 1fr!important}
  .service-cards,.audience-grid,.program-grid{grid-template-columns:1fr!important}
}
`;

// Fijo en JSX: los 9 emojis de "¿Qué necesitas trabajar?" — son estructura visual, no copy.
const PROBLEM_ICONS = ['🎯', '⚡', '💪', '🧊', '😰', '🔥', '🩹', '🤝', '👨‍👩‍👧'];

// Fijo en JSX: mensaje WA por herramienta — 1:1 con el índice de PAGE_PSICOLOGIA.tools.items.
const TOOLS_WA_TEXT = [
  'Hola, quiero información sobre evaluación psicológica deportiva.',
  'Hola, quiero información sobre biorretroalimentación.',
  'Hola, quiero información sobre Coaching Deportivo.',
  'Hola, quiero información sobre PNL aplicada al deporte.',
];

// Fijo en JSX: href/mensaje por tarjeta de audiencia — 1:1 con el índice de .audience.items.
const AUDIENCE_LINKS = [
  { type: 'anchor', href: '#servicios' },
  { type: 'wa', text: 'Hola, soy entrenador/a y quiero información sobre Psicología Deportiva.' },
  { type: 'wa', text: 'Hola, soy padre/madre y busco orientación para acompañar a mi hijo/a deportista.' },
  { type: 'wa', text: 'Hola, represento un equipo/organización y quiero información.' },
];

// Fijo en JSX: mensaje WA por servicio individual — 1:1 con el índice de .services.items.
const SERVICES_WA_TEXT = [
  'Hola, quiero más información sobre la Evaluación Inicial de Psicología Deportiva.',
  'Hola, quiero información sobre una Sesión Individual de Psicología Deportiva.',
];

// Fijo en JSX: mensaje WA por programa — 1:1 con el índice de .programs.items.
const PROGRAMS_WA_TEXT = [
  'Hola, me interesa el programa Evaluación y Bases de Psicología Deportiva.',
  'Hola, me interesa el programa Desarrollo Psicológico en Moment.',
  'Hola, me interesa el programa Intervención en Competencia.',
];

const italicAccent = color => ({ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 400, color });

function waWithText(text) {
  return `https://wa.me/${WA_NUM}?text=${encodeURIComponent(text)}`;
}

function Eyebrow({ children, color, style = {} }) {
  return <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color, marginBottom: 14, ...style }}>{children}</div>;
}

function SectionTitle({ children, marginBottom = 36, size = 'clamp(28px,4.5vw,52px)' }) {
  return <h2 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: size, lineHeight: .95, letterSpacing: '-0.03em', margin: `0 0 ${marginBottom}px` }}>{children}</h2>;
}

function WaIcon({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M5.337 22l1.535-5.537A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.962 9.962 0 01-5.33-1.54L2 22l3.337.002z"/>
    </svg>
  );
}

// ============ 1. Hero ============
function PsicologiaHero({ d }) {
  const [heroBtn, setHeroBtn] = useState(false);
  const [outlineBtn, setOutlineBtn] = useState(false);
  return (
    <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#111' }}>
      <img src="assets/hero-psicologia.jpg" alt="Psicología Deportiva" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .42 }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(15,13,23,.88) 0%,rgba(15,13,23,.58) 60%,rgba(15,13,23,.36) 100%)' }}/>
      <QC position="top-right" color="var(--blue)" size={260} style={{ opacity: .12 }}/>
      <div style={{ position: 'relative', zIndex: 1, padding: '100px 48px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Reveal><Eyebrow color="var(--blue)">{d.hero.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={.06}>
          <h1 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 'clamp(44px,8vw,100px)', lineHeight: .9, letterSpacing: '-0.04em', margin: 0, color: '#fff' }}>
            {d.hero.titleLine1}<br/><span style={italicAccent('var(--blue)')}>{d.hero.titleHighlight}</span><br/>{d.hero.titleLine3}
          </h1>
        </Reveal>
        <Reveal delay={.12}>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,.72)', marginTop: 24, maxWidth: 540 }}>{d.hero.subtitle}</p>
        </Reveal>
        <Reveal delay={.18}>
          <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={waWithText('Hola, quiero agendar una hora en Psicología Deportiva.')} target="_blank"
              onMouseEnter={() => setHeroBtn(true)} onMouseLeave={() => setHeroBtn(false)}
              style={{ padding: '15px 30px', borderRadius: 999, background: 'var(--blue)', color: '#fff', fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 15, transition: 'opacity .2s', opacity: heroBtn ? .85 : 1 }}>
              Agenda tu hora
            </a>
            <a href="#programas"
              onMouseEnter={() => setOutlineBtn(true)} onMouseLeave={() => setOutlineBtn(false)}
              style={{ padding: '15px 30px', borderRadius: 999, background: 'transparent', color: '#fff', border: `1.5px solid ${outlineBtn ? 'rgba(255,255,255,.75)' : 'rgba(255,255,255,.35)'}`, fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 15, transition: 'border-color .2s' }}>
              Ver programas →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============ 2. ¿Qué necesitas trabajar? + modal ============
function ProblemModal({ problem, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, []);
  return (
    <div className="psic-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="psic-modal-box">
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, width: 34, height: 34, borderRadius: '50%', background: 'var(--pink-50)', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        <div style={{ fontSize: 30, marginBottom: 12 }}>{problem.icon}</div>
        <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 22, margin: '0 0 10px', letterSpacing: '-0.02em' }}>{problem.title}</h3>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, lineHeight: 1.6, color: 'var(--ink-60)', margin: '0 0 20px' }}>{problem.modalDesc}</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href={waWithText('Hola, quiero saber más sobre: ' + problem.title)} target="_blank" className="glow-teal"
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 13, borderRadius: 999, background: '#25d366', color: '#fff', fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 14 }}>
            <WaIcon/> Agenda tu hora
          </a>
        </div>
      </div>
    </div>
  );
}

function ProblemsSection({ d }) {
  const [openIdx, setOpenIdx] = useState(null);
  const open = openIdx !== null ? { ...d.problems.items[openIdx], icon: PROBLEM_ICONS[openIdx] } : null;
  return (
    <section style={{ padding: '72px 48px', background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      <QC position="top-right" color="var(--teal)" size={180} style={{ opacity: .12 }}/>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal><Eyebrow color="var(--blue-dark)">{d.problems.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={.06}><SectionTitle>{d.problems.title}</SectionTitle></Reveal>
        <Reveal delay={.1}>
          <div className="problem-grid">
            {d.problems.items.map((p, i) => (
              <div key={i} className="problem-card" onClick={() => setOpenIdx(i)}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>{PROBLEM_ICONS[i]}</div>
                <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 15, letterSpacing: '-0.01em', marginBottom: 4 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-60)' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      {open && <ProblemModal problem={open} onClose={() => setOpenIdx(null)}/>}
    </section>
  );
}

// ============ 3. Áreas de trabajo ============
function AreasSection({ d }) {
  return (
    <section style={{ padding: '72px 48px', background: 'var(--ink)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <QC position="bottom-right" color="var(--pink)" size={200} style={{ opacity: .08 }}/>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal><Eyebrow color="var(--blue)">{d.areas.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={.06}><SectionTitle>{d.areas.title}</SectionTitle></Reveal>
        <div className="area-grid">
          {d.areas.items.map((a, i) => (
            <Reveal key={i} delay={.04 + i * .03} className="psic-card" style={{ background: '#1a1627', borderColor: 'rgba(255,255,255,.07)' }}>
              <div style={{ width: 32, height: 3, background: 'var(--blue)', borderRadius: 2, marginBottom: 14 }}/>
              <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 16, margin: '0 0 6px', color: '#fff', letterSpacing: '-0.01em' }}>{a.title}</h3>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, lineHeight: 1.45, color: 'rgba(255,255,255,.5)', margin: 0 }}>{a.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ 4. ¿Para quién? ============
function AudienceSection({ d }) {
  return (
    <section style={{ padding: '72px 48px', background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      <QC position="top-right" color="var(--teal)" size={180} style={{ opacity: .14 }}/>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal><Eyebrow color="var(--blue-dark)">{d.audience.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={.06}><SectionTitle>{d.audience.title}</SectionTitle></Reveal>
        <div className="audience-grid">
          {d.audience.items.map((a, i) => {
            const link = AUDIENCE_LINKS[i];
            const solid = i === 0;
            const href = link.type === 'anchor' ? link.href : waWithText(link.text);
            const target = link.type === 'anchor' ? undefined : '_blank';
            return (
              <Reveal key={i} delay={.06 + i * .03} className="psic-card">
                <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 20, margin: '0 0 8px', letterSpacing: '-0.01em' }}>{a.title}</h3>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, lineHeight: 1.55, color: 'var(--ink-60)', margin: '0 0 18px' }}>{a.desc}</p>
                <a href={href} target={target} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 999,
                  background: solid ? 'var(--blue)' : 'transparent',
                  color: solid ? '#fff' : 'var(--blue)',
                  border: solid ? 'none' : '1.5px solid var(--blue)',
                  fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 13,
                }}>{a.cta}</a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============ 5. Especialidades por deporte ============
function SportsSection({ d }) {
  return (
    <section style={{ padding: '72px 48px', background: 'var(--ink)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <QC position="bottom-left" color="var(--teal)" size={160} style={{ opacity: .08 }}/>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal><Eyebrow color="var(--blue)">{d.sports.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={.06}><SectionTitle marginBottom={10}>{d.sports.title}</SectionTitle></Reveal>
        <Reveal delay={.09}><p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, color: 'rgba(255,255,255,.5)', margin: '0 0 32px', maxWidth: 560, textWrap: 'balance' }}>{d.sports.subtitle}</p></Reveal>
        <Reveal delay={.12}>
          <div className="sports-grid">
            {d.sports.items.map((sport, i) => (
              <a key={i} href={waPsicologiaSportLink(sport)} target="_blank" className="sport-item">{sport}</a>
            ))}
            <a href={waWithText('Hola, quiero información sobre Psicología Deportiva en Moment.')} target="_blank" className="sport-item"
              style={{ color: 'rgba(255,255,255,.45)', background: 'rgba(255,255,255,.03)', borderColor: 'rgba(255,255,255,.05)', fontStyle: 'italic' }}>
              {d.sports.otherLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============ 6. Centros Fitness ============
function FitnessSection({ d }) {
  return (
    <section style={{ padding: '72px 48px', background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      <div className="fitness-grid" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div>
          <Reveal><Eyebrow color="var(--blue-dark)">{d.fitness.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={.06}><SectionTitle marginBottom={16} size="clamp(24px,3.5vw,40px)">{d.fitness.title}</SectionTitle></Reveal>
          <Reveal delay={.1}><p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 1.6, color: 'var(--ink-60)', margin: '0 0 24px' }}>{d.fitness.paragraph}</p></Reveal>
          <Reveal delay={.14}>
            <a href={waWithText('Hola, represento un gimnasio y quiero información sobre Psicología Deportiva.')} target="_blank"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 999, background: 'var(--ink)', color: 'var(--pink)', fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 14 }}>
              Solicitar información →
            </a>
          </Reveal>
        </div>
        <Reveal delay={.1}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {d.fitness.bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: '#fff', borderRadius: 12, border: '1px solid rgba(26,24,35,.07)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }}/>
                <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'var(--ink-60)' }}>{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

// ============ 7. Herramientas y Metodología ============
function ToolsSection({ d }) {
  return (
    <section style={{ padding: '72px 48px', background: 'var(--pink-50)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal><Eyebrow color="var(--blue-dark)">{d.tools.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={.06}><SectionTitle>{d.tools.title}</SectionTitle></Reveal>
        <div className="tools-grid">
          {d.tools.items.map((t, i) => (
            <Reveal key={i} delay={.06 + i * .03} className="psic-card">
              <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 18, margin: '0 0 8px', letterSpacing: '-0.01em' }}>{t.title}</h3>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, lineHeight: 1.5, color: 'var(--ink-60)', margin: '0 0 14px' }}>{t.desc}</p>
              <a href={waWithText(TOOLS_WA_TEXT[i])} target="_blank" style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: 'var(--blue-dark)', fontWeight: 600 }}>Consultar →</a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ 8. Servicios para deportistas individuales ============
function ServicesSection({ d }) {
  return (
    <section id="servicios" style={{ padding: '72px 48px', background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      <QC position="top-right" color="var(--blue)" size={170} style={{ opacity: .1 }}/>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal><Eyebrow color="var(--blue-dark)">{d.services.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={.06}><SectionTitle marginBottom={10}>{d.services.title}</SectionTitle></Reveal>
        <Reveal delay={.1}><p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, color: 'var(--ink-60)', margin: '0 0 36px', maxWidth: 580, textWrap: 'balance' }}>{d.services.subtitle}</p></Reveal>
        <div className="service-cards">
          {d.services.items.map((s, i) => (
            <Reveal key={i} delay={.1 + i * .05} className="psic-card">
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--blue-dark)', marginBottom: 18 }}>{s.label}</div>
              <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 24, margin: '0 0 14px', letterSpacing: '-0.02em' }}>{s.title}</h3>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 16 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--ink-60)' }}>{s.duration}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--ink-60)' }}>{s.mode}</span>
              </div>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, lineHeight: 1.55, color: 'var(--ink-60)', margin: '0 0 14px' }}>{s.desc}</p>
              <ul style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, lineHeight: 1.65, color: 'var(--ink-60)', margin: '0 0 20px', paddingLeft: 16 }}>
                {s.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
              </ul>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, paddingTop: 18, borderTop: '1px solid rgba(26,24,35,.07)' }}>
                <span style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 26, color: 'var(--blue-dark)' }}>{s.price}</span>
                <a href={waWithText(SERVICES_WA_TEXT[i])} target="_blank" className="glow-teal"
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 999, background: '#25d366', color: '#fff', fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 13 }}>
                  <WaIcon size={14}/> Agenda tu hora
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ 9. Programas de acompañamiento ============
function ProgramsSection({ d }) {
  return (
    <section id="programas" style={{ padding: '72px 48px', background: 'var(--pink-50)', position: 'relative', overflow: 'hidden' }}>
      <QC position="bottom-left" color="ink" size={180} style={{ opacity: .1 }}/>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal><Eyebrow color="var(--blue-dark)">{d.programs.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={.06}><SectionTitle marginBottom={10}>{d.programs.title}</SectionTitle></Reveal>
        <Reveal delay={.1}><p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, color: 'var(--ink-60)', margin: '0 0 36px', maxWidth: 580, textWrap: 'balance' }}>{d.programs.subtitle}</p></Reveal>
        <div className="program-grid">
          {d.programs.items.map((p, i) => {
            const hi = !!p.highlighted;
            return (
              <Reveal key={i} delay={.08 + i * .04} className={`psic-card${hi ? ' program-highlight' : ''}`} style={hi ? { border: 'none' } : {}}>
                {hi ? (
                  <div style={{ display: 'inline-block', fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', background: 'var(--blue)', color: '#fff', padding: '4px 10px', borderRadius: 6, marginBottom: 14 }}>{p.label}</div>
                ) : (
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-60)', marginBottom: 14 }}>{p.label}</div>
                )}
                <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 22, margin: '0 0 8px', letterSpacing: '-0.02em' }}>{p.title}</h3>
                <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 28, color: hi ? 'var(--blue)' : 'var(--blue-dark)', marginBottom: 18 }}>
                  {p.price}<span style={{ fontSize: 14, fontFamily: "'Jost',sans-serif", fontWeight: 400, color: hi ? 'rgba(255,255,255,.55)' : 'var(--ink-60)' }}>/mes</span>
                </div>
                <ul style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, lineHeight: 1.65, color: hi ? 'rgba(255,255,255,.7)' : 'var(--ink-60)', margin: '0 0 24px', paddingLeft: 16 }}>
                  {p.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>
                <a href={waWithText(PROGRAMS_WA_TEXT[i])} target="_blank" style={{
                  display: 'block', textAlign: 'center', padding: 12, borderRadius: 999,
                  background: hi ? 'var(--blue)' : 'transparent',
                  color: hi ? '#fff' : 'var(--blue)',
                  border: hi ? 'none' : '1.5px solid var(--blue)',
                  fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 13,
                }}>Solicitar información</a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============ 10. CTA final + tarjeta de Jairo ============
function FinalCtaSection({ d }) {
  const [btn, setBtn] = useState(false);
  const jairo = TEAM.find(t => t.name === 'Jairo Pinto');
  return (
    <section style={{ padding: '80px 48px', background: 'var(--ink)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <QC position="bottom-right" color="var(--blue)" size={240} style={{ opacity: .08 }}/>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal><Eyebrow color="var(--blue)">{d.cta.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={.06}><SectionTitle marginBottom={40} size="clamp(30px,5vw,60px)">{d.cta.title}</SectionTitle></Reveal>
        {jairo && (
          <Reveal delay={.1}>
            <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: 28, display: 'flex', gap: 20, alignItems: 'center', marginBottom: 36, maxWidth: 680 }}>
              <img src={jairo.photo} alt={jairo.name} style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid var(--blue)' }}/>
              <div>
                <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 17, color: '#fff', marginBottom: 3 }}>{jairo.name}</div>
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: 'rgba(255,255,255,.5)', marginBottom: 6 }}>{d.cta.proRoleLabel}</div>
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: 'rgba(255,255,255,.4)' }}>{d.cta.proTagline}</div>
              </div>
            </div>
          </Reveal>
        )}
        <Reveal delay={.14}>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href={waWithText('Hola, me interesa la Psicología Deportiva en Moment. ¿Cuáles son los próximos horarios?')} target="_blank"
              onMouseEnter={() => setBtn(true)} onMouseLeave={() => setBtn(false)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '15px 28px', borderRadius: 999, background: 'var(--blue)', color: '#fff', fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 15, transition: 'opacity .2s', opacity: btn ? .85 : 1 }}>
              <WaIcon/> Agenda tu hora
            </a>
          </div>
        </Reveal>
        <Reveal delay={.18}><p style={{ marginTop: 18, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'rgba(255,255,255,.28)' }}>{d.cta.caption}</p></Reveal>
      </div>
    </section>
  );
}

// ============ Root ============
function PsicologiaContent() {
  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = PSICOLOGIA_CSS;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
  const d = PAGE_PSICOLOGIA;
  return (
    <>
      <PsicologiaHero d={d}/>
      <ProblemsSection d={d}/>
      <AreasSection d={d}/>
      <AudienceSection d={d}/>
      <SportsSection d={d}/>
      <FitnessSection d={d}/>
      <ToolsSection d={d}/>
      <ServicesSection d={d}/>
      <ProgramsSection d={d}/>
      <FinalCtaSection d={d}/>
    </>
  );
}

Object.assign(window, { PsicologiaContent });
