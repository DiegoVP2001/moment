// ============ CAROUSEL + TEAM + EN MEDIOS ============

// --- Infinite carousel ---
function CarouselSection({ theme }) {
  const isDark = theme === 'dark';
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const trackRef = useRef(null);
  const items = [...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS];

  const onDown = (e) => {
    setPaused(true); setDragging(true);
    setStartX((e.touches ? e.touches[0].pageX : e.pageX));
    setScrollLeft(trackRef.current.scrollLeft);
  };
  const onMove = (e) => {
    if (!dragging) return;
    const x = (e.touches ? e.touches[0].pageX : e.pageX);
    trackRef.current.scrollLeft = scrollLeft - (x - startX);
  };
  const onUp = () => { setDragging(false); };

  return (
    <section id="instalaciones" style={{ padding: '120px 0 100px', overflow: 'hidden', background: isDark ? '#0f0d17' : 'var(--cream)', position: 'relative' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px' }}>
        <Reveal>
          <SectionHeader eyebrow="/ instalaciones" title="Un centro pensado para cada etapa." theme={theme}/>
        </Reveal>
      </div>

      {/* Carousel: auto-scroll when not interacting, draggable */}
      <div style={{ marginTop: 56, position: 'relative' }}>
        {/* Auto-scrolling layer (hidden when paused, acts as visual) */}
        {!paused && (
          <div style={{
            display: 'flex', gap: 20, width: 'max-content',
            animation: 'carouselScroll 45s linear infinite',
            paddingLeft: 48
          }}>
            {items.map((item, i) => <CarouselCard key={'a'+i} item={item}/>)}
          </div>
        )}
        {/* Draggable layer (shown when paused) */}
        {paused && (
          <div
            ref={trackRef}
            onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={() => { onUp(); }}
            onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
            style={{
              display: 'flex', gap: 20, overflowX: 'auto', cursor: dragging ? 'grabbing' : 'grab',
              scrollbarWidth: 'none', paddingLeft: 48, paddingRight: 48
            }}
          >
            {items.map((item, i) => <CarouselCard key={'b'+i} item={item}/>)}
          </div>
        )}
        {/* Pause/resume overlay */}
        {!paused && (
          <div onClick={() => setPaused(true)} style={{ position: 'absolute', inset: 0, cursor: 'grab' }}/>
        )}
        {paused && (
          <button onClick={() => setPaused(false)} style={{
            position: 'absolute', top: 12, right: 60, padding: '8px 16px', borderRadius: 999,
            background: 'var(--ink)', color: 'var(--pink)', fontSize: 12, fontFamily: "'Jost',sans-serif", fontWeight: 600, zIndex: 2
          }}>▶ Reanudar</button>
        )}
        <style>{`@keyframes carouselScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        div::-webkit-scrollbar{display:none}`}</style>
      </div>
    </section>
  );
}

function CarouselCard({ item }) {
  return (
    <div style={{ width: 380, height: 280, borderRadius: 20, overflow: 'hidden', flexShrink: 0, position: 'relative', background: 'var(--ink)' }}>
      {item.type === 'image' ? (
        <img src={item.src} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} loading="lazy"/>
      ) : (
        <video src={item.src} muted loop autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}/>
      )}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 20px 16px', background: 'linear-gradient(transparent, rgba(15,13,23,.7))' }}>
        <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: '#fff', fontWeight: 500 }}>{item.label}</div>
      </div>
    </div>
  );
}

// --- Team with LinkedIn ---
function TeamSection({ theme }) {
  const isDark = theme === 'dark';
  return (
    <section id="equipo" style={{ padding: '120px 48px', background: isDark ? '#1a1627' : 'var(--ink)', color: 'var(--pink-100)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginBottom: 72, alignItems: 'end' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
          {TEAM.map((m, i) => (
            <Reveal key={i} delay={i * .1}>
              <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(230,198,199,.1)', borderRadius: 20, overflow: 'hidden', position: 'relative' }}>
                <QC position="top-right" color="var(--pink)" size={60} style={{ opacity: .3, zIndex: 2 }}/>
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
      </div>
    </section>
  );
}

// --- En medios (YouTube modals) ---
function EnMediosSection({ theme }) {
  const isDark = theme === 'dark';
  const [openVideo, setOpenVideo] = useState(null);
  return (
    <section id="medios" style={{ padding: '120px 48px', background: isDark ? '#0f0d17' : 'var(--cream)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Reveal>
          <SectionHeader eyebrow="/ en medios" title="Lo que dicen de nosotros." theme={theme}/>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 28, marginTop: 56 }}>
          {MEDIOS.map((m, i) => (
            <Reveal key={i} delay={i * .1}>
              <div
                onClick={() => setOpenVideo(m.youtubeId)}
                style={{
                  position: 'relative', borderRadius: 24, overflow: 'hidden', cursor: 'pointer',
                  aspectRatio: '16/9', background: '#000',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,.06)' : 'rgba(26,24,35,.06)'}`,
                  transition: 'transform .2s'
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
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 24px 20px', background: 'linear-gradient(transparent, rgba(15,13,23,.8))' }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 6 }}>{m.source}</div>
                  <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 24, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>{m.title}</h3>
                </div>
                <QC position="top-right" color="var(--pink)" size={50} style={{ opacity: .4 }}/>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <YouTubeModal videoId={openVideo} onClose={() => setOpenVideo(null)}/>
    </section>
  );
}

Object.assign(window, { CarouselSection, TeamSection, EnMediosSection });
