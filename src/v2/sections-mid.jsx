// ============ CAROUSEL + TEAM + EN MEDIOS ============

// --- Carousel lightbox ---
function CarouselLightbox({ item, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(15,13,23,.92)',
      backdropFilter: 'blur(12px)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
    }}>
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: 960, width: '100%', borderRadius: 20, overflow: 'hidden', position: 'relative', background: '#000' }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 14, right: 14, zIndex: 2,
          width: 38, height: 38, borderRadius: '50%',
          background: 'rgba(0,0,0,.7)', color: '#fff', fontSize: 20, lineHeight: 1,
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>×</button>
        {item.type === 'image' ? (
          <img src={item.src} style={{ width: '100%', display: 'block', maxHeight: '85vh', objectFit: 'contain' }}/>
        ) : (
          <video src={item.src} controls autoPlay style={{ width: '100%', display: 'block', maxHeight: '85vh', background: '#000' }}/>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 20px 16px', background: 'linear-gradient(transparent, rgba(15,13,23,.8))' }}>
          <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: '#fff', fontWeight: 500 }}>{item.label}</div>
        </div>
      </div>
    </div>
  );
}

// --- Infinite carousel with rAF auto-scroll, hover pause, drag, lightbox ---
function CarouselSection({ theme }) {
  const isDark = theme === 'dark';
  const [lightbox, setLightbox] = useState(null);
  const trackRef = useRef(null);
  const hoverRef = useRef(false);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const rafRef = useRef(null);
  const posRef = useRef(0);

  const items = [...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS];

  useEffect(() => {
    const SPEED = 0.6;
    function step() {
      const t = trackRef.current;
      if (t && !hoverRef.current && !dragRef.current.active) {
        // Acumula el desplazamiento en un número JS normal en vez de leer/escribir
        // scrollLeft cada frame: con zoom de navegador < ~90%, Chrome redondea
        // incrementos sub-pixel de scrollLeft a 0 y el carrusel queda congelado.
        posRef.current += SPEED;
        if (posRef.current >= t.scrollWidth / 2) posRef.current = 0;
        t.scrollLeft = Math.round(posRef.current);
      }
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Resincroniza el acumulador del auto-scroll con la posición real tras un drag,
  // para que no "salte" de vuelta a donde iba antes de que el usuario arrastrara.
  const resyncPos = () => { if (trackRef.current) posRef.current = trackRef.current.scrollLeft; };

  const onMouseEnter = () => { hoverRef.current = true; };
  const onMouseLeave = () => { hoverRef.current = false; if (dragRef.current.active) resyncPos(); dragRef.current.active = false; };

  const onMouseDown = e => {
    dragRef.current = { active: true, startX: e.pageX, startScroll: trackRef.current.scrollLeft, moved: false };
    e.preventDefault();
  };
  const onMouseMove = e => {
    if (!dragRef.current.active) return;
    const dx = e.pageX - dragRef.current.startX;
    if (Math.abs(dx) > 4) dragRef.current.moved = true;
    trackRef.current.scrollLeft = dragRef.current.startScroll - dx;
  };
  const onMouseUp = () => { dragRef.current.active = false; resyncPos(); };

  const onTouchStart = e => {
    dragRef.current = { active: true, startX: e.touches[0].pageX, startScroll: trackRef.current.scrollLeft, moved: false };
  };
  const onTouchMove = e => {
    if (!dragRef.current.active) return;
    const dx = e.touches[0].pageX - dragRef.current.startX;
    if (Math.abs(dx) > 4) dragRef.current.moved = true;
    trackRef.current.scrollLeft = dragRef.current.startScroll - dx;
  };
  const onTouchEnd = () => { dragRef.current.active = false; resyncPos(); };

  const handleCardClick = item => {
    if (!dragRef.current.moved) setLightbox(item);
  };

  return (
    <section id="instalaciones" style={{ padding: '120px 0 100px', overflow: 'hidden', background: isDark ? '#0f0d17' : '#fff', position: 'relative' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px' }}>
        <Reveal>
          <SectionHeader eyebrow="/ instalaciones" title="Un centro pensado para cada etapa."
            subtitle="Un muro de escalada, zonas de entrenamiento funcional y especialistas deportivos — todo bajo un mismo techo en Isla de Maipo."
            theme={theme}/>
        </Reveal>
        <Reveal delay={.1}>
          <p style={{ marginTop: 16, fontFamily: "'Jost',sans-serif", fontSize: 15, color: isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)' }}>
            Pasa el cursor para pausar · Arrastra para navegar · Haz clic para ampliar
          </p>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          marginTop: 48, display: 'flex', gap: 20,
          overflowX: 'auto', scrollbarWidth: 'none',
          cursor: dragRef.current?.active ? 'grabbing' : 'grab',
          paddingLeft: 48, paddingRight: 48,
          userSelect: 'none', WebkitUserSelect: 'none'
        }}
      >
        {items.map((item, i) => (
          <CarouselCard key={i} item={item} onClick={() => handleCardClick(item)}/>
        ))}
      </div>

      {lightbox && <CarouselLightbox item={lightbox} onClose={() => setLightbox(null)}/>}
    </section>
  );
}

function CarouselCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ width: 'clamp(260px,80vw,380px)', height: 280, borderRadius: 20, overflow: 'hidden', flexShrink: 0, position: 'relative', background: 'var(--ink)', cursor: 'pointer' }}
    >
      {item.type === 'image' ? (
        <img src={item.src} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', transition: 'transform .3s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
        />
      ) : (
        <video src={item.src} muted loop autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}/>
      )}
      {/* Play icon overlay for videos */}
      {item.type === 'video' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,13,23,.25)' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="var(--ink)"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      )}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 20px 16px', background: 'linear-gradient(transparent, rgba(15,13,23,.75))' }}>
        <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: '#fff', fontWeight: 500 }}>{item.label}</div>
      </div>
    </div>
  );
}

// --- Team section ---
function TeamSection({ theme }) {
  const isDark = theme === 'dark';
  return (
    <section id="equipo" style={{ padding: '120px 48px', background: isDark ? '#1a1627' : 'var(--ink)', color: 'var(--pink-100)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Reveal>
          <div className="team-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginBottom: 72, alignItems: 'end' }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 18 }}>/ equipo</div>
              <h2 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 'clamp(40px,5vw,72px)', lineHeight: .95, letterSpacing: '-0.03em', margin: 0, color: '#fff' }}>
                Profesionales que <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--pink)' }}>escuchan</span> antes de tratar.
              </h2>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(230,198,199,.7)', margin: 0, fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>
              Cada miembro tiene formación específica y trabaja en coordinación con las otras áreas.
            </p>
          </div>
        </Reveal>

        <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
          {TEAM.map((m, i) => (
            <Reveal key={i} delay={i * .1}>
              <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(230,198,199,.1)', borderRadius: 20, overflow: 'hidden', position: 'relative' }}>
                <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
                  <img src={m.photo} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(.1) contrast(1.02)' }}/>
                </div>
                <div style={{ padding: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--teal)' }}>0{i + 1}</div>
                    {m.linkedin ? (
                      <a href={m.linkedin} target="_blank" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: 'rgba(230,198,199,.1)', transition: 'background .2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#0a66c2'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(230,198,199,.1)'}
                      >
                        <LinkedInIcon size={18} color="#fff"/>
                      </a>
                    ) : (
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(230,198,199,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: .4 }}>
                        <LinkedInIcon size={18} color="rgba(255,255,255,.5)"/>
                      </div>
                    )}
                  </div>
                  <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 26, margin: '0 0 6px', color: '#fff', letterSpacing: '-0.01em' }}>{m.name}</h3>
                  <div style={{ fontSize: 13, color: 'var(--pink)', fontFamily: "'Jost',sans-serif", fontWeight: 500, letterSpacing: '.02em', marginBottom: 14 }}>{m.role}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(230,198,199,.7)', margin: 0 }}>{m.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* "Conoce más de nosotros" link */}
        <Reveal delay={.35}>
          <div style={{ textAlign: 'center', marginTop: 64 }}>
            <a href="Quienes Somos.html" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '17px 36px', borderRadius: 999,
              background: 'rgba(255,255,255,.05)',
              border: '1.5px solid rgba(230,198,199,.25)',
              color: 'var(--pink-100)', fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 15,
              textDecoration: 'none', transition: 'background .2s, border-color .2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(230,198,199,.1)'; e.currentTarget.style.borderColor = 'rgba(230,198,199,.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.borderColor = 'rgba(230,198,199,.25)'; }}
            >
              Conoce más de nosotros →
            </a>
          </div>
        </Reveal>

        <style>{`
          @media(max-width:768px){.team-grid{grid-template-columns:1fr!important}.team-header-grid{grid-template-columns:1fr!important;gap:24px!important}}
        `}</style>
      </div>
    </section>
  );
}

// --- En medios ---
function EnMediosSection({ theme }) {
  const isDark = theme === 'dark';
  const [openVideo, setOpenVideo] = useState(null);
  return (
    <section id="medios" style={{ padding: '120px 48px', background: isDark ? '#0f0d17' : 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      <QC position="top-right" color="teal" size={160} style={{ opacity: .18 }}/>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Reveal>
          <SectionHeader eyebrow="/ en medios" title="Lo que dicen de nosotros." theme={theme}/>
        </Reveal>
        <div className="medios-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 28, marginTop: 56 }}>
          {MEDIOS.map((m, i) => (
            <Reveal key={i} delay={i * .1}>
              <div
                onClick={() => setOpenVideo(m.youtubeId)}
                style={{
                  position: 'relative', borderRadius: 24, overflow: 'hidden', cursor: 'pointer',
                  aspectRatio: '16/9', background: '#000',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,.06)' : 'rgba(26,24,35,.06)'}`,
                  transition: 'transform .25s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <img src={m.thumb} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: .85 }}/>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,13,23,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 32px rgba(0,0,0,.3)' }}>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="var(--ink)"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                {/* QC strategic: top-right, subtle teal */}
                <QC position="top-right" color="var(--teal)" size={50} style={{ opacity: .25 }}/>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 24px 20px', background: 'linear-gradient(transparent, rgba(15,13,23,.8))' }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 6 }}>{m.source}</div>
                  <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 24, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>{m.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.medios-grid{grid-template-columns:1fr!important}}`}</style>
      <YouTubeModal videoId={openVideo} onClose={() => setOpenVideo(null)}/>
    </section>
  );
}

Object.assign(window, { CarouselSection, CarouselCard, CarouselLightbox, TeamSection, EnMediosSection });
