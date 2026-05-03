// ============ SHARED COMPONENTS ============
const { useState, useEffect, useRef } = React;

// --- Decorative half-circles (brand element) ---
function Decor({ variant = 'default', show = true, theme = 'light' }) {
  if (!show) return null;
  const pinkFill = 'var(--pink)';
  const inkFill  = theme === 'dark' ? '#0f0d17' : 'var(--ink)';
  if (variant === 'corner') {
    return (
      <svg className="decor decor-corner" viewBox="0 0 400 400" aria-hidden>
        <path d="M 0,0 A 400,400 0 0 1 400,400 L 0,400 Z" fill={pinkFill} opacity=".9"/>
        <circle cx="340" cy="60" r="36" fill={inkFill}/>
      </svg>
    );
  }
  if (variant === 'right-strip') {
    return (
      <svg className="decor decor-right-strip" viewBox="0 0 200 600" aria-hidden>
        <path d="M 200,0 A 200,300 0 0 0 200,600 Z" fill={pinkFill}/>
        <path d="M 200,40 A 120,180 0 0 0 200,400 Z" fill={inkFill} opacity=".85"/>
      </svg>
    );
  }
  if (variant === 'marquee-dots') {
    return (
      <div className="decor decor-dots" aria-hidden>
        {Array.from({length: 40}).map((_,i)=>(
          <span key={i} style={{background: i%3===0 ? inkFill : pinkFill}}/>
        ))}
      </div>
    );
  }
  return null;
}

// --- Photo placeholder (subtle stripes + mono caption) ---
function PhotoPlaceholder({ label = 'imagen', ratio = '4/3', tone = 'pink', small = false }) {
  const bg = tone === 'pink' ? 'var(--pink-100)' : tone === 'ink' ? 'var(--ink)' : 'var(--pink-50)';
  const fg = tone === 'ink' ? 'var(--pink-100)' : 'var(--ink)';
  return (
    <div className="ph" style={{aspectRatio: ratio, background: bg, color: fg, fontSize: small ? 11 : 12}}>
      <div className="ph-stripes" aria-hidden/>
      <div className="ph-label">▢ {label}</div>
    </div>
  );
}

// --- Isotype logo SVG (scalable, always crisp) ---
function MomentIsotype({ color = 'currentColor', size = 28 }) {
  // simplified "MM" like the brand isotype — used small
  return (
    <img
      src="assets/logo-isotype-dark.png"
      alt="Moment isotipo"
      style={{width:size, height:size, objectFit:'contain', filter: color==='pink' ? 'none' : (color==='light' ? 'invert(1) brightness(2)' : 'none')}}
    />
  );
}

// --- Moment wordmark (custom, bespoke feel) ---
function MomentWord({ theme='ink', style={} }) {
  const color = theme === 'ink' ? 'var(--ink)' : theme === 'pink' ? 'var(--pink)' : '#fff';
  return (
    <span style={{
      fontFamily: "'Playfair Display', serif",
      fontWeight: 500,
      fontStyle: 'italic',
      letterSpacing: '-0.02em',
      color,
      ...style
    }}>moment</span>
  );
}

// --- Top navigation (shared across all directions) ---
function Nav({ theme = 'light', onReserve }) {
  const isDark = theme === 'dark';
  const bg   = isDark ? 'rgba(15,13,23,.6)' : 'rgba(250,245,242,.7)';
  const fg   = isDark ? '#fff' : 'var(--ink)';
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(26,24,35,.08)';
  return (
    <nav style={{
      position:'sticky', top:0, zIndex:50,
      backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)',
      background:bg, color:fg,
      borderBottom:`1px solid ${border}`,
      padding:'14px 36px', display:'flex', alignItems:'center', gap:32
    }}>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <img src={isDark ? 'assets/logo-isotype-pink.png' : 'assets/logo-isotype-dark.png'} style={{width:34,height:34,objectFit:'contain'}}/>
        <MomentWord theme={isDark ? 'pink' : 'ink'} style={{fontSize:24}}/>
      </div>
      <div style={{display:'flex',gap:28,marginLeft:40,fontFamily:"'Jost',sans-serif",fontSize:14,letterSpacing:'.02em'}}>
        <a href="#servicios">Servicios</a>
        <a href="#precios">Precios</a>
        <a href="#instalaciones">Instalaciones</a>
        <a href="#equipo">Equipo</a>
        <a href="#blog">Blog</a>
        <a href="#contacto">Contacto</a>
      </div>
      <div style={{marginLeft:'auto', display:'flex', gap:12, alignItems:'center'}}>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,opacity:.7}}>Isla de Maipo · RM</span>
        <button onClick={onReserve} style={{
          padding:'10px 20px', borderRadius:999,
          background:'var(--teal)', color:'var(--ink)',
          fontWeight:600, fontSize:13, letterSpacing:'.02em',
          fontFamily:"'Jost',sans-serif"
        }}>Reservar</button>
      </div>
    </nav>
  );
}

// --- Floating WhatsApp + Instagram buttons ---
function FloatingContacts() {
  return (
    <div style={{position:'fixed',right:22,bottom:22,display:'flex',flexDirection:'column',gap:12,zIndex:80}}>
      <a href="https://www.instagram.com/moment.csd/" target="_blank" className="ig-float" aria-label="Instagram">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff" aria-hidden>
          <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2 0 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c0-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1zm0 2.1c-3.1 0-3.5 0-4.7.1-1.1 0-1.7.2-2.1.3-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.1.4-.3 1-.3 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 1.1.2 1.7.3 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.1 1 .3 2.1.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1 0 1.7-.2 2.1-.3.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.1-.4.3-1 .3-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1.1-.2-1.7-.3-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.1-1-.3-2.1-.3-1.2-.1-1.6-.1-4.7-.1zm0 3.5a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4zm0 6.9a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4zm5.3-7.1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>
      </a>
      <a href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent('¡Hola! Me gustaría más información sobre Moment.')}`} target="_blank" className="wa-float" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" width="26" height="26" fill="#fff" aria-hidden>
          <path d="M16 3C9 3 3 9 3 16c0 2.5.7 4.9 2 7L3 29l6.3-2c2 1 4.3 1.6 6.7 1.6 7 0 13-6 13-13S23 3 16 3zm7.5 18.3c-.3.9-1.6 1.7-2.3 1.8-.6.1-1.3.1-2.1-.1-.5-.2-1.1-.3-1.9-.7-3.3-1.4-5.5-4.7-5.7-5-.2-.2-1.4-1.9-1.4-3.6 0-1.7.9-2.6 1.2-2.9.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .8.6.3.7 1 2.4 1.1 2.6.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.4-.5.6-.2.2-.4.4-.2.7.2.3.9 1.5 2 2.5 1.4 1.3 2.7 1.7 3 1.8.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.3.7-.2.3.1 1.9.9 2.2 1.1.3.2.5.2.6.3.1.2.1.9-.2 1.8z"/>
        </svg>
      </a>
    </div>
  );
}
const WhatsAppFloat = FloatingContacts;

// --- Utility: section header ---
function SectionHeader({ eyebrow, title, subtitle, align='left', theme='light', headingFont='archivo' }) {
  const inkC = theme === 'dark' ? '#fff' : 'var(--ink)';
  const mutedC = theme === 'dark' ? 'rgba(255,255,255,.65)' : 'var(--ink-60)';
  const fontStack = headingFont==='archivo' ? "'Archivo Black',sans-serif"
                  : headingFont==='playfair' ? "'Playfair Display',serif"
                  : headingFont==='jost' ? "'Jost',sans-serif"
                  : "'Space Grotesk',sans-serif";
  return (
    <div style={{textAlign:align, maxWidth:align==='center'?800:null, margin: align==='center'?'0 auto':null}}>
      {eyebrow && <div style={{
        fontFamily:"'JetBrains Mono',ui-monospace,monospace", fontSize:12,
        letterSpacing:'.18em', textTransform:'uppercase', color:'var(--teal-dark)',
        marginBottom:14
      }}>{eyebrow}</div>}
      <h2 style={{
        fontFamily: fontStack,
        fontWeight: headingFont==='archivo'?900:700,
        fontSize: 'clamp(40px, 5.2vw, 76px)',
        lineHeight:.95,
        letterSpacing: headingFont==='archivo'?'-0.03em':'-0.02em',
        color: inkC, margin:0
      }}>{title}</h2>
      {subtitle && <p style={{
        fontFamily:"'Inter',sans-serif", fontSize:18, lineHeight:1.5,
        color:mutedC, marginTop:20, maxWidth:640
      }}>{subtitle}</p>}
    </div>
  );
}

// --- Footer ---
function Footer({ theme='light' }) {
  const isDark = theme==='dark';
  const bg = isDark ? '#0f0d17' : 'var(--ink)';
  return (
    <footer style={{background:bg, color:'var(--pink-100)', padding:'80px 36px 32px'}}>
      <div style={{maxWidth:1320, margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr 1fr', gap:48, paddingBottom:56, borderBottom:'1px solid rgba(230,198,199,.15)'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
              <img src="assets/logo-isotype-pink.png" style={{width:42,height:42}}/>
              <MomentWord theme="pink" style={{fontSize:32}}/>
            </div>
            <p style={{fontSize:14,lineHeight:1.6,color:'rgba(230,198,199,.7)',maxWidth:300}}>
              Centro deportivo integral. Kinesiología, psicología, entrenamiento, recovery y escalada bajo un mismo techo.
            </p>
          </div>
          <div>
            <h4 style={{fontFamily:"'Jost',sans-serif",fontSize:13,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--pink)',marginBottom:18}}>Servicios</h4>
            <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10,fontSize:14}}>
              <li>Kinesiología</li><li>Psicología</li><li>Entrenamiento</li><li>Escalada</li>
            </ul>
          </div>
          <div>
            <h4 style={{fontFamily:"'Jost',sans-serif",fontSize:13,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--pink)',marginBottom:18}}>Contacto</h4>
            <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10,fontSize:14,lineHeight:1.5}}>
              <li>{BRAND.address}</li>
              <li>{BRAND.region}</li>
              <li>{BRAND.phone}</li>
              <li>{BRAND.email}</li>
            </ul>
          </div>
          <div>
            <h4 style={{fontFamily:"'Jost',sans-serif",fontSize:13,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--pink)',marginBottom:18}}>Síguenos</h4>
            <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10,fontSize:14}}>
              <li>@{BRAND.instagram}</li>
              <li>WhatsApp</li>
              <li>Newsletter</li>
            </ul>
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:28,fontSize:12,color:'rgba(230,198,199,.5)',fontFamily:"'JetBrains Mono',monospace"}}>
          <span>© 2026 Moment · Centro Deportivo</span>
          <span>Isla de Maipo · Chile</span>
        </div>
      </div>
    </footer>
  );
}

// --- Global styles used by shared components ---
const SHARED_CSS = `
.decor{position:absolute;pointer-events:none;z-index:0}
.decor-corner{top:-80px;right:-80px;width:380px;height:380px}
.decor-right-strip{top:0;right:0;width:180px;height:100%}
.decor-dots{position:absolute;left:0;right:0;display:flex;gap:14px;padding:0 40px;overflow:hidden}
.decor-dots span{width:8px;height:8px;border-radius:50%;flex-shrink:0}

.ph{position:relative;overflow:hidden;border-radius:4px;display:flex;align-items:flex-end;padding:14px;font-family:'JetBrains Mono',ui-monospace,monospace}
.ph-stripes{position:absolute;inset:0;background-image:repeating-linear-gradient(135deg, transparent 0 14px, rgba(26,24,35,.05) 14px 15px);}
.ph-label{position:relative;z-index:1;font-size:inherit;opacity:.65}

.wa-float,.ig-float{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:transform .2s}
.wa-float{background:#25d366;box-shadow:0 10px 30px rgba(37,211,102,.35)}
.ig-float{background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);box-shadow:0 10px 30px rgba(220,39,67,.35)}
.wa-float:hover,.ig-float:hover{transform:scale(1.08)}

html{scroll-behavior:smooth}

/* button hover */
button{transition:transform .15s, opacity .15s}
button:hover{opacity:.92}
`;

Object.assign(window, {
  Decor, PhotoPlaceholder, MomentIsotype, MomentWord,
  Nav, WhatsAppFloat, FloatingContacts, SectionHeader, Footer, SHARED_CSS
});
