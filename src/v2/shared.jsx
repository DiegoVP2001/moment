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
      {subtitle && <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 18, lineHeight: 1.5, color: muted, marginTop: 20, maxWidth: 820, textWrap: 'balance' }}>{subtitle}</p>}
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

// --- Nav dropdown (reused for "Información" and "Clases, Entrenamiento y Muro") ---
function NavDropdown({ label, items, isDark, border, fg }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }} onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen(o => !o)} className="nav-link" style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, letterSpacing: '.02em', color: fg, display: 'flex', alignItems: 'center', gap: 4 }}>
        {label} <span style={{ fontSize: 10, transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>
      {open && (
        // Padding-top (en vez de marginTop en la tarjeta) para que el "hueco" entre el botón
        // y el menú siga siendo parte del área hover — si no, el mouse lo cruza y el dropdown
        // se cierra solo antes de llegar a los links (muy sensible a la dirección del mouse).
        <div style={{ position: 'absolute', top: '100%', left: 0, paddingTop: 8, zIndex: 60 }}>
          <div style={{
            background: isDark ? '#1a1627' : '#fff', borderRadius: 14, padding: 8,
            boxShadow: '0 16px 40px rgba(0,0,0,.18)', border: `1px solid ${border}`,
            minWidth: 220,
          }}>
            {items.map(([h, l]) => (
              <a key={h} href={h} style={{ display: 'block', padding: '10px 16px', borderRadius: 8, fontSize: 13, fontFamily: "'Jost',sans-serif", transition: 'background .15s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.06)' : 'var(--pink-50)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >{l}</a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Nav V2 (with mobile hamburger + scroll-hide) ---
// Estructura final del rediseño 2026 — sitio multi-página, todos los links son rutas completas
// (nunca "#seccion" pelado: index.html deja de ser la única página del sitio).
function Nav({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const bg = isDark ? 'rgba(15,13,23,.7)' : 'rgba(250,245,242,.8)';
  const fg = isDark ? '#fff' : 'var(--ink)';
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(26,24,35,.08)';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const curr = window.scrollY;
      setHidden(curr > last && curr > 80);
      last = curr;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const infoLinks = [
    ['index.html#instalaciones', 'Instalaciones'],
    ['index.html#informacion', 'Horarios'],
    ['index.html#ubicacion', 'Ubicación'],
    ['index.html#servicios', 'Servicios'],
  ];
  const classLinks = [
    ['clases-escalada.html', 'Clases de Escalada'],
    ['entrenamiento-funcional.html', 'Entrenamientos Funcionales'],
    ['muro-escalada.html', 'Muro de Escalada'],
  ];
  const specialtyLinks = [
    ['kinesiologia.html', 'Kinesiología Deportiva'],
    ['psicologia-deportiva.html', 'Psicología Deportiva'],
    ['nutricion.html', 'Nutrición Deportiva'],
  ];
  const mobileLinks = [
    ...infoLinks,
    ['Quienes Somos.html', 'Quiénes somos'],
    ...classLinks,
    ...specialtyLinks,
    ['tienda.html', 'Tienda'],
    ['contacto.html', 'Contacto'],
  ];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      background: bg, color: fg, borderBottom: `1px solid ${border}`,
      transform: hidden ? 'translateY(-110%)' : 'translateY(0)',
      transition: 'transform .3s cubic-bezier(.4,0,.2,1)',
    }}>
      <div style={{ padding: '12px 36px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <a href="index.html" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <img src={isDark ? 'assets/logo-isotype-pink.png' : 'assets/logo-isotype-dark.png'} style={{ width: 32, height: 32, objectFit: 'contain' }}/>
          <MomentWord theme={isDark ? 'pink' : 'ink'} style={{ fontSize: 22 }}/>
        </a>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: 'flex', gap: 22, marginLeft: 28, fontFamily: "'Jost',sans-serif", fontSize: 13, letterSpacing: '.02em', alignItems: 'center' }}>
          <NavDropdown label="Información" items={infoLinks} isDark={isDark} border={border} fg={fg}/>
          <a href="Quienes Somos.html" className="nav-link">Quienes somos</a>
          <NavDropdown label="Clases, Entrenamiento y Muro" items={classLinks} isDark={isDark} border={border} fg={fg}/>
          <NavDropdown label="Especialidades" items={specialtyLinks} isDark={isDark} border={border} fg={fg}/>
          <a href="tienda.html" className="nav-link">Tienda</a>
          <a href="contacto.html" className="nav-link">Contacto</a>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href={waReservarLink()} target="_blank" className="nav-cta glow-teal" style={{ padding: '9px 18px', borderRadius: 999, background: 'var(--teal)', color: 'var(--ink)', fontWeight: 600, fontSize: 12, fontFamily: "'Jost',sans-serif" }}>Reservar</a>
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
          {mobileLinks.map(([h, l]) => (
            <a key={h} href={h} onClick={() => setMobileOpen(false)} className="nav-link"
              style={{ padding: '12px 8px', fontSize: 15, fontFamily: "'Jost',sans-serif", color: fg, borderBottom: `1px solid ${border}` }}>{l}</a>
          ))}
          <a href={waReservarLink()} target="_blank" onClick={() => setMobileOpen(false)} className="glow-teal"
            style={{ marginTop: 8, padding: '12px 8px', borderRadius: 999, background: 'var(--teal)', color: 'var(--ink)', fontWeight: 600, fontSize: 14, fontFamily: "'Jost',sans-serif", textAlign: 'center' }}>Reservar</a>
        </div>
      )}
    </nav>
  );
}

// --- Back to top button ---
function BackToTop() {
  const [show, setShow] = useState(window.scrollY > 150);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 150);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver al inicio"
      className="glow-round"
      style={{
        position: 'fixed', bottom: 165, right: 24, zIndex: 90,
        width: 44, height: 44, borderRadius: '50%',
        background: 'var(--ink)', color: 'var(--pink)',
        border: '1px solid rgba(230,198,199,.25)',
        boxShadow: '0 4px 20px rgba(0,0,0,.3)',
        fontSize: 18, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        transition: 'opacity .25s, transform .2s cubic-bezier(.4,0,.2,1), box-shadow .2s cubic-bezier(.4,0,.2,1)',
      }}
    >↑</button>
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
  const h4Style = { fontFamily: "'Jost',sans-serif", fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: 18 };
  const ulStyle = { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 };
  return (
    <footer style={{ background: isDark ? '#0f0d17' : 'var(--ink)', color: 'var(--pink-100)', padding: '80px 36px 32px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr 1fr', gap: 40, paddingBottom: 56, borderBottom: '1px solid rgba(230,198,199,.15)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <img src="assets/logo-isotype-pink.png" style={{ width: 42, height: 42 }}/>
              <MomentWord theme="pink" style={{ fontSize: 32 }}/>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(230,198,199,.7)', maxWidth: 300 }}>Centro de escalada en Isla de Maipo. Muro, entrenamiento funcional y especialidades deportivas para acompañar tu progreso.</p>
          </div>
          <div>
            <h4 style={h4Style}>Información</h4>
            <ul style={ulStyle}>
              <li><a href="index.html#instalaciones">Instalaciones</a></li>
              <li><a href="index.html#informacion">Horarios</a></li>
              <li><a href="index.html#ubicacion">Ubicación</a></li>
              <li><a href="index.html#servicios">Servicios</a></li>
            </ul>
          </div>
          <div>
            <h4 style={h4Style}>Clases y Muro</h4>
            <ul style={ulStyle}>
              <li><a href="clases-escalada.html">Clases de Escalada</a></li>
              <li><a href="entrenamiento-funcional.html">Entrenamientos Funcionales</a></li>
              <li><a href="muro-escalada.html">Muro de Escalada</a></li>
            </ul>
          </div>
          <div>
            <h4 style={h4Style}>Especialidades</h4>
            <ul style={ulStyle}>
              <li><a href="kinesiologia.html">Kinesiología Deportiva</a></li>
              <li><a href="psicologia-deportiva.html">Psicología Deportiva</a></li>
              <li><a href="nutricion.html">Nutrición Deportiva</a></li>
            </ul>
          </div>
          <div>
            <h4 style={h4Style}>Centro</h4>
            <ul style={ulStyle}>
              <li><a href="Quienes Somos.html">Quiénes somos</a></li>
              <li><a href="tienda.html">Tienda</a></li>
              <li><a href="contacto.html">Contacto</a></li>
              <li><a href="contacto.html#trabaja">Trabaja con nosotros</a></li>
            </ul>
          </div>
          <div>
            <h4 style={h4Style}>Contacto</h4>
            <ul style={{ ...ulStyle, lineHeight: 1.5 }}>
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

// --- Wraps a wide table/element that needs horizontal scroll on mobile. Only the element
// itself scrolls (not surrounding labels/headers), and a fade + arrow hint appears on the
// scrollable edge whenever there's more content off-screen — disappears once fully scrolled.
function ScrollHintCard({ children, bg = '#fff', style = {} }) {
  const ref = useRef(null);
  const [canScroll, setCanScroll] = useState(false);
  const check = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanScroll(el.scrollWidth - el.scrollLeft - el.clientWidth > 8);
  }, []);
  useEffect(() => {
    check();
    const el = ref.current;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(check) : null;
    if (ro && el) ro.observe(el);
    window.addEventListener('resize', check);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', check); };
  }, [check]);
  return (
    <div style={{ position: 'relative' }}>
      <div ref={ref} onScroll={check} style={{ overflowX: 'auto', ...style }}>
        {children}
      </div>
      {canScroll && (
        <div className="scroll-hint-fade" style={{ background: `linear-gradient(to right, transparent, ${bg} 70%)` }} aria-hidden="true">
          <span className="scroll-hint-arrow">→</span>
        </div>
      )}
    </div>
  );
}

// --- Horarios: tabla semanal de clases/entrenamientos y tabla de apertura, ambas leyendo
// CLASS_SCHEDULE/OPENING_HOURS_FULL (data.jsx) como única fuente de verdad — usadas en
// #informacion del home Y en las páginas de Clases/Entrenamiento/Muro, para que nunca se
// desincronicen entre sí.
const DAY_COLS = [
  ['mon', 'Lun'], ['tue', 'Mar'], ['wed', 'Mié'], ['thu', 'Jue'], ['fri', 'Vie'],
];

// Deja solo las filas/celdas de CLASS_SCHEDULE cuyo texto incluye `keyword` (ej. "escalada"
// o "entrenamiento") — filas sin ninguna coincidencia se descartan del todo. Sin `keyword`,
// devuelve la tabla completa tal cual (uso en #informacion del home).
function filterClassSchedule(keyword) {
  if (!keyword) return CLASS_SCHEDULE;
  const kw = keyword.toLowerCase();
  return CLASS_SCHEDULE
    .map(row => {
      const filtered = { time: row.time };
      let hasAny = false;
      DAY_COLS.forEach(([key]) => {
        const val = row[key];
        if (val && val.toLowerCase().includes(kw)) { filtered[key] = val; hasAny = true; }
        else filtered[key] = null;
      });
      return hasAny ? filtered : null;
    })
    .filter(Boolean);
}

function ClassScheduleTable({ keyword, isDark = false, cardBg = '#fff' }) {
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(26,24,35,.08)';
  const muted = isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)';
  const rows = filterClassSchedule(keyword);
  return (
    <ScrollHintCard bg={cardBg}>
      <table style={{ width: '100%', minWidth: 520, borderCollapse: 'collapse', fontFamily: "'Jost',sans-serif", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '6px 10px 10px 0', color: muted, fontWeight: 500 }}>Horario</th>
            {DAY_COLS.map(([, label]) => (
              <th key={label} style={{ textAlign: 'left', padding: '6px 10px 10px', color: muted, fontWeight: 500 }}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
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
    </ScrollHintCard>
  );
}

function OpeningHoursTable({ isDark = false, cardBg = '#fff' }) {
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(26,24,35,.08)';
  const muted = isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)';
  return (
    <ScrollHintCard bg={cardBg}>
      <table style={{ width: '100%', minWidth: 300, borderCollapse: 'collapse', fontFamily: "'Jost',sans-serif", fontSize: 14 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '6px 10px 10px 0', color: muted, fontWeight: 500 }}>Día</th>
            <th style={{ textAlign: 'left', padding: '6px 10px 10px', color: muted, fontWeight: 500 }}>Horario</th>
            <th style={{ textAlign: 'left', padding: '6px 0 10px', color: muted, fontWeight: 500 }}>Bloque alto</th>
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
    </ScrollHintCard>
  );
}

const SHARED_CSS = `
.wa-float,.ig-float{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s}
.wa-float{background:#25d366;box-shadow:0 8px 24px rgba(37,211,102,.35)}
.ig-float{background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);box-shadow:0 8px 24px rgba(220,39,67,.3)}
.wa-float:hover{transform:scale(1.08);box-shadow:0 10px 30px rgba(37,211,102,.55)}
.ig-float:hover{transform:scale(1.08);box-shadow:0 10px 30px rgba(220,39,67,.5)}
html{scroll-behavior:smooth}
button{transition:transform .15s,opacity .15s}
button:hover{opacity:.92}
div::-webkit-scrollbar{display:none}

/* Links de texto del header — cambian de color al pasar el cursor para que el nav se sienta interactivo */
.nav-link{transition:color .2s ease}
.nav-link:hover{color:var(--teal-dark)!important}

/* Glow al pasar el cursor — mismo lenguaje visual en botones, pills y tarjetas de todo el sitio */
.glow-teal,.glow-pink,.glow-outline,.glow-card,.glow-round{transition:transform .2s cubic-bezier(.4,0,.2,1),box-shadow .2s cubic-bezier(.4,0,.2,1)}
.glow-teal:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(123,191,191,.55)}
.glow-pink:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(230,198,199,.6)}
.glow-outline:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(255,255,255,.22)}
.glow-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(26,24,35,.12)}
.glow-round:hover{transform:scale(1.08);box-shadow:0 10px 26px rgba(123,191,191,.5)}

/* Con el dropdown "Especialidades" el nav de escritorio suma ~1010px y choca con el botón
   Reservar bajo ~1050px — este breakpoint es más ancho que el del resto del layout (768px)
   a propósito, para pasar al menú móvil antes de que el nav se apriete. */
@media(max-width:1080px){
  .nav-links{display:none!important}
  .hamburger{display:flex!important}
  .nav-cta{display:none!important}
}
@media(max-width:768px){
  .footer-grid{grid-template-columns:1fr 1fr!important;gap:32px!important}
  section{padding-top:80px!important;padding-bottom:64px!important}
  section:not(#instalaciones){padding-left:20px!important;padding-right:20px!important}
}
@media(max-width:480px){
  .footer-grid{grid-template-columns:1fr!important}
}

/* Aviso de scroll horizontal para tablas anchas en mobile (ScrollHintCard) — flecha con
   pulso sutil para que se note que hay más columnas a la derecha */
.scroll-hint-fade{position:absolute;top:0;right:0;bottom:0;width:44px;pointer-events:none;display:flex;align-items:center;justify-content:center;border-radius:0 20px 20px 0}
.scroll-hint-arrow{display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--teal);color:var(--ink);font-size:12px;font-weight:700;box-shadow:0 4px 12px rgba(123,191,191,.5);animation:scrollHintPulse 1.4s ease-in-out infinite}
@keyframes scrollHintPulse{0%,100%{transform:translateX(0);opacity:.8}50%{transform:translateX(5px);opacity:1}}

/* Fila de precio clickeable (link a WhatsApp con el ítem precargado) — usada en el
   detalle de servicios del home y en las páginas nuevas de precios (sesión B/C) */
.price-row{display:grid;grid-template-columns:28px 1fr auto auto;gap:14px;align-items:center;padding:16px 18px;text-decoration:none;color:inherit;transition:background .15s}
@media(max-width:480px){
  .price-row{grid-template-columns:1fr auto!important;gap:8px!important;padding:14px 16px!important}
  .price-row-num,.price-row-wa{display:none!important}
}
`;

Object.assign(window, {
  useScrollReveal, Reveal, QC, MomentWord, SectionHeader, LinkedInIcon,
  Nav, BackToTop, FloatingContacts, Footer, YouTubeModal, InfoCard, ScrollHintCard,
  DAY_COLS, ClassScheduleTable, OpeningHoursTable, SHARED_CSS
});
