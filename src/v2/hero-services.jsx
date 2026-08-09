// ============ HERO (Video) ============

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
            <a href="#servicios" className="glow-teal" style={{ padding: '16px 28px', borderRadius: 999, background: 'var(--teal)', color: 'var(--ink)', fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Explorar servicios →</a>
            <a href="#instalaciones" className="glow-outline" style={{ padding: '16px 28px', borderRadius: 999, background: 'transparent', color: '#fff', fontFamily: "'Jost',sans-serif", fontWeight: 500, fontSize: 14, border: '1.5px solid rgba(255,255,255,.4)', textDecoration: 'none' }}>Conocer el centro</a>
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

Object.assign(window, { HeroVideo });
