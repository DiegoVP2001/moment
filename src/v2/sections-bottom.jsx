// ============ SHOP + JOBS + CONTACT ============

// --- Tienda ---
const SHOP_CATEGORY_ORDER = ['Magnesios','Magnesera','Cepillos','Tape deportivo','Entrenamiento','Recuperación'];

function ProductCard({ p, idx, isDark, imgIdx, slideDir, onPrev, onNext }) {
  const hasMultiple = p.images && p.images.length > 1;
  const slideAnim = slideDir === 'right' ? 'shopSlideRight .22s ease'
                  : slideDir === 'left'  ? 'shopSlideLeft .22s ease'
                  : 'none';
  return (
    <div style={{
      background: isDark ? '#1a1627' : '#fff', borderRadius: 20, overflow: 'hidden',
      border: `1px solid ${isDark ? 'rgba(255,255,255,.06)' : 'rgba(26,24,35,.06)'}`,
      boxShadow: isDark ? 'none' : '0 4px 24px rgba(26,24,35,.05)',
      transition: 'transform .2s, box-shadow .2s', display: 'flex', flexDirection: 'column'
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = isDark ? 'none' : '0 12px 36px rgba(26,24,35,.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = isDark ? 'none' : '0 4px 24px rgba(26,24,35,.05)'; }}
    >
      <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden', background: isDark ? '#0f0d17' : 'var(--pink-50)' }}>
        {p.images && p.images.length > 0 ? (
          <img
            key={`${idx}-${imgIdx}`}
            src={p.images[imgIdx || 0]}
            alt={p.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: slideAnim }}
            loading="lazy"
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, opacity: .4, textTransform: 'uppercase', letterSpacing: '.1em' }}>▢ Foto</span>
          </div>
        )}
        {hasMultiple && (
          <>
            <button onClick={(e) => { e.stopPropagation(); onPrev(idx); }} style={{
              position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,.45)', border: 'none', borderRadius: '50%',
              width: 30, height: 30, cursor: 'pointer', color: '#fff', fontSize: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
              transition: 'background .15s'
            }} onMouseEnter={e => e.currentTarget.style.background='rgba(0,0,0,.7)'}
               onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,.45)'}
               aria-label="Imagen anterior">‹</button>
            <button onClick={(e) => { e.stopPropagation(); onNext(idx); }} style={{
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,.45)', border: 'none', borderRadius: '50%',
              width: 30, height: 30, cursor: 'pointer', color: '#fff', fontSize: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
              transition: 'background .15s'
            }} onMouseEnter={e => e.currentTarget.style.background='rgba(0,0,0,.7)'}
               onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,.45)'}
               aria-label="Imagen siguiente">›</button>
            <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4 }}>
              {p.images.map((_, di) => (
                <div key={di} style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: di === (imgIdx || 0) ? '#fff' : 'rgba(255,255,255,.4)',
                  transition: 'background .15s'
                }}/>
              ))}
            </div>
          </>
        )}
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 17, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.2, color: isDark ? '#fff' : 'var(--ink)' }}>{p.name}</h3>
        <p style={{ fontSize: 13, lineHeight: 1.45, color: isDark ? 'rgba(255,255,255,.55)' : 'var(--ink-60)', margin: 0, fontFamily: "'Jost',sans-serif", flex: 1 }}>{p.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 17, color: isDark ? '#fff' : 'var(--ink)' }}>{p.price}</span>
          <a href={waBuyLink(p.name)} target="_blank" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 16px', borderRadius: 999, background: '#25d366', color: '#fff',
            fontSize: 12, fontFamily: "'Jost',sans-serif", fontWeight: 600, textDecoration: 'none',
            transition: 'opacity .15s', whiteSpace: 'nowrap'
          }} onMouseEnter={e => e.currentTarget.style.opacity='.85'} onMouseLeave={e => e.currentTarget.style.opacity='1'}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M5.337 22l1.535-5.537A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.962 9.962 0 01-5.33-1.54L2 22l3.337.002z"/></svg>
            Consultar
          </a>
        </div>
      </div>
    </div>
  );
}

function ShopSection({ theme }) {
  const isDark = theme === 'dark';
  const [imgIdxs, setImgIdxs] = React.useState({});
  const [slideDirs, setSlideDirs] = React.useState({});
  const [activeCategory, setActiveCategory] = React.useState(SHOP_CATEGORY_ORDER[0]);

  // Precargar imágenes de la categoría activa para que el slide no lag en el primer swipe
  React.useEffect(() => {
    SHOP.filter(p => p.category === activeCategory)
      .forEach(p => (p.images || []).forEach(src => { new Image().src = src; }));
  }, [activeCategory]);

  const move = (shopIdx, dir) => {
    const len = SHOP[shopIdx].images.length;
    setSlideDirs(prev => ({ ...prev, [shopIdx]: dir > 0 ? 'right' : 'left' }));
    setImgIdxs(prev => ({ ...prev, [shopIdx]: ((prev[shopIdx] || 0) + dir + len) % len }));
  };

  const visibleProducts = SHOP
    .map((p, i) => ({ ...p, shopIdx: i }))
    .filter(p => p.category === activeCategory);

  const SLIDE_CSS = `
    @keyframes shopSlideRight { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes shopSlideLeft  { from { transform: translateX(-60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  `;

  return (
    <section id="tienda" style={{ padding: '120px 48px', background: isDark ? '#0f0d17' : 'var(--cream)', position: 'relative' }}>
      <style>{SLIDE_CSS}{`@media(max-width:768px){.shop-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:480px){.shop-grid{grid-template-columns:1fr!important}}`}</style>
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionHeader
            eyebrow="/ tienda"
            title="Equípate en Moment."
            subtitle="Productos disponibles en el centro. Consulta disponibilidad y retira en Moment."
            theme={theme}
          />
        </Reveal>

        {/* Category tabs */}
        <Reveal delay={.08}>
          <div style={{ display: 'flex', gap: 8, marginTop: 40, flexWrap: 'wrap' }}>
            {SHOP_CATEGORY_ORDER.filter(cat => SHOP.some(p => p.category === cat)).map(cat => {
              const isActive = cat === activeCategory;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  padding: '10px 20px', borderRadius: 999, cursor: 'pointer',
                  background: isActive ? 'var(--ink)' : 'transparent',
                  color: isActive ? 'var(--pink)' : (isDark ? 'rgba(255,255,255,.6)' : 'var(--ink-60)'),
                  border: `1.5px solid ${isActive ? 'var(--ink)' : (isDark ? 'rgba(255,255,255,.15)' : 'rgba(26,24,35,.15)')}`,
                  fontFamily: "'Jost',sans-serif", fontSize: 13, fontWeight: isActive ? 600 : 400,
                  transition: 'all .2s'
                }}>{cat}</button>
              );
            })}
          </div>
        </Reveal>

        {/* Products grid */}
        <div className="shop-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 32 }}>
          {visibleProducts.map((p, j) => (
            <Reveal key={p.shopIdx} delay={j * .06}>
              <ProductCard
                p={p}
                idx={p.shopIdx}
                isDark={isDark}
                imgIdx={imgIdxs[p.shopIdx] || 0}
                slideDir={slideDirs[p.shopIdx]}
                onPrev={(i) => move(i, -1)}
                onNext={(i) => move(i, 1)}
              />
            </Reveal>
          ))}
        </div>

        {visibleProducts.length > 3 && (
          <Reveal delay={.1}>
            <p style={{ marginTop: 16, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: isDark ? 'rgba(255,255,255,.35)' : 'var(--ink-60)', textAlign: 'center', letterSpacing: '.06em' }}>
              Desliza para ver más →
            </p>
          </Reveal>
        )}

        <Reveal delay={.15}>
          <p style={{
            marginTop: 32, textAlign: 'center',
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
            color: isDark ? 'rgba(255,255,255,.35)' : 'var(--ink-60)',
            letterSpacing: '.04em'
          }}>
            Productos disponibles en Moment · Consulta stock y retiro
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// --- Trabaja con nosotros ---
function JobsSection({ theme }) {
  const isDark = theme === 'dark';
  return (
    <section id="trabaja" style={{ padding: '120px 48px', background: isDark ? '#1a1627' : 'var(--pink-50)', position: 'relative', overflow: 'hidden' }}>
      <QC position="top-right" color={isDark ? 'rgba(230,198,199,.06)' : 'var(--pink-200)'} size={160}/>
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal><SectionHeader eyebrow="/ trabaja con nosotros" title="Sé parte del equipo." theme={theme}/></Reveal>
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Reveal><div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 24, letterSpacing: '-0.01em', marginBottom: 8 }}>Vacantes disponibles</div></Reveal>
          {JOBS.map((j, i) => (
            <Reveal key={i} delay={i * .1}>
              <div className="job-card-grid" style={{
                background: isDark ? '#0f0d17' : '#fff', borderRadius: 20, padding: 28,
                border: `1px solid ${isDark ? 'rgba(255,255,255,.06)' : 'rgba(26,24,35,.06)'}`,
                display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center'
              }}>
                <div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                    <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 22, margin: 0, letterSpacing: '-0.01em' }}>{j.title}</h3>
                    <span style={{ padding: '3px 10px', borderRadius: 999, background: 'var(--teal)', color: 'var(--ink)', fontSize: 11, fontFamily: "'Jost',sans-serif", fontWeight: 600 }}>{j.type}</span>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.5, color: isDark ? 'rgba(255,255,255,.6)' : 'var(--ink-60)', margin: 0, fontFamily: "'Jost',sans-serif" }}>{j.desc}</p>
                </div>
                <a className="job-card-cta" href={`mailto:${BRAND.email}?subject=Postulación: ${j.title}&body=Adjunto mi CV para el cargo de ${j.title}.`} style={{
                  padding: '14px 24px', borderRadius: 999, background: 'var(--ink)', color: 'var(--pink)',
                  fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap', textAlign: 'center'
                }}>Enviar CV →</a>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={.2}>
          <div style={{
            marginTop: 40, background: isDark ? '#0f0d17' : '#fff', borderRadius: 24, padding: 36,
            border: `1px solid ${isDark ? 'rgba(255,255,255,.06)' : 'rgba(26,24,35,.06)'}`, textAlign: 'center'
          }}>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: isDark ? 'rgba(255,255,255,.7)' : 'var(--ink-60)', fontFamily: "'Jost',sans-serif", maxWidth: 640, margin: '0 auto 24px' }}>
              Si no contamos con vacantes de tu interés pero quieres ser parte del equipo, déjanos tu postulación y CV. Lo tendremos en cuenta para futuras oportunidades.
            </p>
            <a href={`mailto:${BRAND.email}?subject=Postulación espontánea&body=Me gustaría formar parte de Moment. Adjunto mi CV.`} style={{
              display: 'inline-block', padding: '16px 32px', borderRadius: 999,
              background: 'var(--pink)', color: 'var(--ink)', fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 15, textDecoration: 'none'
            }}>Enviar postulación espontánea →</a>
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:768px){.job-card-grid{grid-template-columns:1fr!important}.job-card-cta{width:100%}}`}</style>
    </section>
  );
}

// --- Banner de contacto (3 íconos) — usado en contacto.html (sesión C) ---
function ContactBannerSection({ theme }) {
  const isDark = theme === 'dark';
  const cardStyle = { display: 'block', textAlign: 'center', background: '#fff', borderRadius: 24, padding: '40px 28px', border: '1px solid rgba(26,24,35,.06)', textDecoration: 'none', color: 'inherit' };
  const labelStyle = { fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-60)', marginBottom: 8 };
  const valueStyle = { fontFamily: "'Jost',sans-serif", fontSize: 16, fontWeight: 600 };
  return (
    <section id="contacto" style={{ padding: '160px 48px 120px', background: isDark ? '#1a1627' : 'var(--pink-50)', position: 'relative', overflow: 'hidden' }}>
      <QC position="top-right" color={isDark ? 'rgba(230,198,199,.06)' : 'var(--pink-200)'} size={180}/>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionHeader eyebrow="/ contacto" title="Hablemos." subtitle="Escríbenos por cualquiera de estos medios y te respondemos a la brevedad." align="center" theme={theme}/>
        </Reveal>
        <div className="contact-banner-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 56 }}>
          <Reveal delay={.08}>
            <a href={`mailto:${BRAND.email}`} className="glow-card" style={cardStyle}>
              <img src="assets/icon-support.png?v=2" style={{ width: 56, height: 56, objectFit: 'contain', margin: '0 auto 20px' }}/>
              <div style={labelStyle}>Correo electrónico</div>
              <div style={valueStyle}>{BRAND.email}</div>
            </a>
          </Reveal>
          <Reveal delay={.14}>
            <a href={`tel:+${WA_NUM}`} className="glow-card" style={cardStyle}>
              <img src="assets/icon-phone.png?v=2" style={{ width: 56, height: 56, objectFit: 'contain', margin: '0 auto 20px' }}/>
              <div style={labelStyle}>Teléfono</div>
              <div style={valueStyle}>{BRAND.phone}</div>
            </a>
          </Reveal>
          <Reveal delay={.2}>
            <a href="https://maps.app.goo.gl/9SdguuCr2wLYyhTT6" target="_blank" className="glow-card" style={cardStyle}>
              <img src="assets/icon-location.png?v=2" style={{ width: 56, height: 56, objectFit: 'contain', margin: '0 auto 20px' }}/>
              <div style={labelStyle}>Dirección</div>
              <div style={valueStyle}>{BRAND.address}</div>
            </a>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:768px){.contact-banner-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

Object.assign(window, { ShopSection, JobsSection, ContactBannerSection });
