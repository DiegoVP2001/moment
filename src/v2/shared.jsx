// ============ SHARED V2 ============
const { useState, useEffect, useRef, useCallback } = React;

// --- Scroll animation observer ---
function useScrollReveal(ref, opts = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = opts;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold, rootMargin });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}
function Reveal({ children, delay = 0, direction = 'up', style = {}, className = '' }) {
  const ref = useRef(null);
  const vis = useScrollReveal(ref);
  const tx = direction === 'up' ? '0,32px' : direction === 'down' ? '0,-32px' : direction === 'left' ? '40px,0' : '-40px,0';
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translate(0,0)' : `translate(${tx})`,
      transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

// --- Quarter circle brand element (SVG, filled ring sector like the brand asset) ---
// Placed at a corner, shows the opposite quadrant curving inward.
// For top-right corner: shows the bottom-left quadrant of a circle.
// color defaults to var(--teal) to match the page palette.
function QC({ position = 'top-right', color = 'teal', size = 120, style = {} }) {
  const c = color === 'ink' ? 'var(--ink)'
    : color === 'pink' ? 'var(--pink)'
    : color === 'pink-light' ? 'var(--pink-100)'
    : color === 'teal' ? 'var(--teal)'
    : color;

  const posStyle = position === 'top-right'    ? { top: 0, right: 0 }
    : position === 'top-left'    ? { top: 0, left: 0 }
    : position === 'bottom-right' ? { bottom: 0, right: 0 }
    : { bottom: 0, left: 0 };

  // Filled ring sector (annulus quarter) — outer r=88, inner r=52, viewBox 100×100
  // Center is at the corner. Sweep flags corrected: short (90°) interior arc in each case.
  const paths = {
    'top-right':    'M 100,88 A 88,88 0 0,1 12,0 L 48,0 A 52,52 0 0,0 100,52 Z',
    'top-left':     'M 0,88 A 88,88 0 0,0 88,0 L 52,0 A 52,52 0 0,1 0,52 Z',
    'bottom-right': 'M 100,12 A 88,88 0 0,0 12,100 L 48,100 A 52,52 0 0,1 100,48 Z',
    'bottom-left':  'M 0,12 A 88,88 0 0,1 88,100 L 52,100 A 52,52 0 0,0 0,48 Z',
  };

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden style={{
      position: 'absolute', ...posStyle, zIndex: 0, pointerEvents: 'none', ...style
    }}>
      <path d={paths[position]} fill={c}/>
    </svg>
  );
}

// --- Moment wordmark ---
function MomentWord({ theme = 'ink', style = {} }) {
  const color = theme === 'ink' ? 'var(--ink)' : theme === 'pink' ? 'var(--pink)' : '#fff';
  return <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500, fontStyle: 'italic', letterSpacing: '-0.02em', color, ...style }}>moment</span>;
}

// --- Section header ---
function SectionHeader({ eyebrow, title, subtitle, align = 'left', theme = 'light' }) {
  const ink = theme === 'dark' ? '#fff' : 'var(--ink)';
  const muted = theme === 'dark' ? 'rgba(255,255,255,.65)' : 'var(--ink-60)';
  return (
    <div style={{ textAlign: align, maxWidth: align === 'center' ? 800 : null, margin: align === 'center' ? '0 auto' : null }}>
      {eyebrow && <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--teal-dark)', marginBottom: 14 }}>{eyebrow}</div>}
      <h2 style={{ fontFamily: "'Archivo Black',sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: .95, letterSpacing: '-0.03em', color: ink, margin: 0 }}>{title}</h2>
      {subtitle && <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 18, lineHeight: 1.5, color: muted, marginTop: 20, maxWidth: 640 }}>{subtitle}</p>}
    </div>
  );
}

// --- LinkedIn icon ---
function LinkedInIcon({ size = 20, color = '#fff' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
    </svg>
  );
}

// --- Nav V2 (with mobile hamburger) ---
function Nav({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const bg = isDark ? 'rgba(15,13,23,.7)' : 'rgba(250,245,242,.8)';
  const fg = isDark ? '#fff' : 'var(--ink)';
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(26,24,35,.08)';
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const mainLinks = [
    ['#servicios', 'Servicios'],
    ['#instalaciones', 'Instalaciones'],
    ['#equipo', 'Equipo'],
    ['#medios', 'En medios'],
    ['#tienda', 'Tienda'],
    ['#contacto', 'Contacto'],
  ];
  const moreLinks = [
    ['Quienes Somos.html', 'Quiénes somos'],
    ['#calendario', 'Eventos'],
    ['#trabaja', 'Trabaja con nosotros'],
  ];
  const allLinks = [...mainLinks, ...moreLinks];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      background: bg, color: fg, borderBottom: `1px solid ${border}`,
    }}>
      <div style={{ padding: '12px 36px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <img src={isDark ? 'assets/logo-isotype-pink.png' : 'assets/logo-isotype-dark.png'} style={{ width: 32, height: 32, objectFit: 'contain' }}/>
          <MomentWord theme={isDark ? 'pink' : 'ink'} style={{ fontSize: 22 }}/>
        </a>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: 'flex', gap: 22, marginLeft: 28, fontFamily: "'Jost',sans-serif", fontSize: 13, letterSpacing: '.02em', alignItems: 'center' }}>
          {mainLinks.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setMoreOpen(!moreOpen)} style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, letterSpacing: '.02em', color: fg, display: 'flex', alignItems: 'center', gap: 4 }}>
              Más <span style={{ fontSize: 10, transition: 'transform .2s', transform: moreOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
            </button>
            {moreOpen && (
              <div style={{
                position: 'absolute', top: '100%', right: 0, marginTop: 8,
                background: isDark ? '#1a1627' : '#fff', borderRadius: 14, padding: 8,
                boxShadow: '0 16px 40px rgba(0,0,0,.18)', border: `1px solid ${border}`,
                minWidth: 200, zIndex: 60
              }} onMouseLeave={() => setMoreOpen(false)}>
                {moreLinks.map(([h, l]) => (
                  <a key={h} href={h} style={{ display: 'block', padding: '10px 16px', borderRadius: 8, fontSize: 13, fontFamily: "'Jost',sans-serif", transition: 'background .15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.06)' : 'var(--pink-50)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >{l}</a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="#servicios" className="nav-cta" style={{ padding: '9px 18px', borderRadius: 999, background: 'var(--teal)', color: 'var(--ink)', fontWeight: 600, fontSize: 12, fontFamily: "'Jost',sans-serif" }}>Reservar</a>
          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 6, background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Menú">
            <span style={{ width: 22, height: 2, background: fg, display: 'block', transition: 'all .2s', transform: mobileOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }}/>
            <span style={{ width: 22, height: 2, background: fg, display: 'block', opacity: mobileOpen ? 0 : 1, transition: 'opacity .2s' }}/>
            <span style={{ width: 22, height: 2, background: fg, display: 'block', transition: 'all .2s', transform: mobileOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }}/>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ padding: '8px 24px 20px', background: bg, borderTop: `1px solid ${border}`, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {allLinks.map(([h, l]) => (
            <a key={h} href={h} onClick={() => setMobileOpen(false)}
              style={{ padding: '12px 8px', fontSize: 15, fontFamily: "'Jost',sans-serif", color: fg, borderBottom: `1px solid ${border}` }}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// --- Floating contacts ---
function FloatingContacts() {
  return (
    <div style={{ position: 'fixed', right: 22, bottom: 22, display: 'flex', flexDirection: 'column', gap: 12, zIndex: 80 }}>
      <a href={BRAND.instagramUrl} target="_blank" className="ig-float" aria-label="Instagram">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2 0 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c0-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1zm0 2.1c-3.1 0-3.5 0-4.7.1-1.1 0-1.7.2-2.1.3-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.1.4-.3 1-.3 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 1.1.2 1.7.3 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.1 1 .3 2.1.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1 0 1.7-.2 2.1-.3.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.1-.4.3-1 .3-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1.1-.2-1.7-.3-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.1-1-.3-2.1-.3-1.2-.1-1.6-.1-4.7-.1zm0 3.5a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4zm0 6.9a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4zm5.3-7.1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
      </a>
      <a href={`https://wa.me/${WA_NUM}`} target="_blank" className="wa-float" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" width="24" height="24" fill="#fff"><path d="M16 3C9 3 3 9 3 16c0 2.5.7 4.9 2 7L3 29l6.3-2c2 1 4.3 1.6 6.7 1.6 7 0 13-6 13-13S23 3 16 3zm7.5 18.3c-.3.9-1.6 1.7-2.3 1.8-.6.1-1.3.1-2.1-.1-.5-.2-1.1-.3-1.9-.7-3.3-1.4-5.5-4.7-5.7-5-.2-.2-1.4-1.9-1.4-3.6 0-1.7.9-2.6 1.2-2.9.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .8.6.3.7 1 2.4 1.1 2.6.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.4-.5.6-.2.2-.4.4-.2.7.2.3.9 1.5 2 2.5 1.4 1.3 2.7 1.7 3 1.8.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.3.7-.2.3.1 1.9.9 2.2 1.1.3.2.5.2.6.3.1.2.1.9-.2 1.8z"/></svg>
      </a>
    </div>
  );
}

// --- Deploy date hook (reads last production commit from GitHub API) ---
function useDeployDate() {
  const [date, setDate] = useState('');
  useEffect(() => {
    fetch('https://api.github.com/repos/DiegoVP2001/moment/commits/production')
      .then(r => r.json())
      .then(d => {
        const dt = new Date(d.commit.author.date);
        const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
        setDate(`${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`);
      })
      .catch(() => {});
  }, []);
  return date;
}

// --- Footer ---
function Footer({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const deployDate = useDeployDate();
  return (
    <footer style={{ background: isDark ? '#0f0d17' : 'var(--ink)', color: 'var(--pink-100)', padding: '80px 36px 32px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: 48, paddingBottom: 56, borderBottom: '1px solid rgba(230,198,199,.15)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <img src="assets/logo-isotype-pink.png" style={{ width: 42, height: 42 }}/>
              <MomentWord theme="pink" style={{ fontSize: 32 }}/>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(230,198,199,.7)', maxWidth: 300 }}>Centro deportivo integral en Isla de Maipo. Kinesiología, psicología, entrenamiento, recovery y escalada.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: 18 }}>Servicios</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              {SERVICES.map(s => <li key={s.id}><a href="#servicios">{s.title}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: 18 }}>Centro</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <li><a href="Quienes Somos.html">Quiénes somos</a></li>
              <li><a href="#calendario">Eventos</a></li>
              <li><a href="#tienda">Tienda</a></li>
              <li><a href="#trabaja">Trabaja con nosotros</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: 18 }}>Contacto</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, lineHeight: 1.5 }}>
              <li>{BRAND.address}</li>
              <li>{BRAND.phone}</li>
              <li>{BRAND.email}</li>
              <li>@{BRAND.instagram}</li>
            </ul>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 28, fontSize: 12, color: 'rgba(230,198,199,.5)', fontFamily: "'JetBrains Mono',monospace", flexWrap: 'wrap', gap: 8 }}>
          <span>
            © 2026 Moment · Centro Deportivo
            {deployDate && <span> · Última actualización ({deployDate})</span>}
          </span>
          <span>Isla de Maipo · Chile</span>
        </div>
      </div>
    </footer>
  );
}

// --- YouTube Modal ---
function YouTubeModal({ videoId, onClose }) {
  if (!videoId) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,13,23,.85)', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 900, aspectRatio: '16/9', borderRadius: 20, overflow: 'hidden', position: 'relative', background: '#000' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,.6)', color: '#fff', fontSize: 18, zIndex: 2 }}>×</button>
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} style={{ width: '100%', height: '100%', border: 0 }} allow="autoplay;encrypted-media" allowFullScreen/>
      </div>
    </div>
  );
}

// --- Info card ---
function InfoCard({ icon, label, lines }) {
  return (
    <div style={{ background: 'rgba(255,255,255,.5)', backdropFilter: 'blur(10px)', borderRadius: 20, padding: 24, display: 'flex', gap: 20, alignItems: 'flex-start', border: '1px solid rgba(26,24,35,.08)' }}>
      <img src={icon} style={{ width: 56, height: 56, objectFit: 'contain', flexShrink: 0 }}/>
      <div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-60)', marginBottom: 8 }}>{label}</div>
        {lines.map((l, i) => <div key={i} style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 1.4, marginBottom: 2 }}>{l}</div>)}
      </div>
    </div>
  );
}

const SHARED_CSS = `
.wa-float,.ig-float{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:transform .2s}
.wa-float{background:#25d366;box-shadow:0 8px 24px rgba(37,211,102,.35)}
.ig-float{background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);box-shadow:0 8px 24px rgba(220,39,67,.3)}
.wa-float:hover,.ig-float:hover{transform:scale(1.08)}
html{scroll-behavior:smooth}
button{transition:transform .15s,opacity .15s}
button:hover{opacity:.92}
div::-webkit-scrollbar{display:none}

@media(max-width:768px){
  .nav-links{display:none!important}
  .hamburger{display:flex!important}
  .nav-cta{display:none!important}
  .footer-grid{grid-template-columns:1fr 1fr!important;gap:32px!important}
}
@media(max-width:480px){
  .footer-grid{grid-template-columns:1fr!important}
}
`;

Object.assign(window, {
  useScrollReveal, Reveal, QC, MomentWord, SectionHeader, LinkedInIcon,
  Nav, FloatingContacts, Footer, YouTubeModal, InfoCard, SHARED_CSS
});
