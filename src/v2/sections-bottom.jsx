// ============ CALENDAR + SHOP + JOBS + CONTACT ============

// --- Calendar: horizontal scrollable capsules ---
function CalendarSection({ theme }) {
  const isDark = theme === 'dark';
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const formatDate = d => {
    const dt = new Date(d + 'T12:00');
    return { day: dt.getDate(), month: months[dt.getMonth()] };
  };

  const tagColors = {
    'Escalada':   { bg: 'var(--teal)',    fg: 'var(--ink)' },
    'Psicología': { bg: 'var(--blue)',    fg: '#fff' },
    'Entreno':    { bg: 'var(--ink)',     fg: 'var(--pink)' },
  };

  return (
    <section id="calendario" style={{ padding: '120px 0 120px', background: isDark ? '#1a1627' : 'var(--pink-50)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative QC — strategic, bottom-right only */}
      <QC position="bottom-right" color={isDark ? 'rgba(230,198,199,.06)' : 'var(--pink-200)'} size={180}/>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionHeader
            eyebrow="/ próximos eventos"
            title="Qué se viene en Moment."
            subtitle="Actividades especiales, clases abiertas y competencias."
            theme={theme}
          />
        </Reveal>
      </div>

      {/* Horizontal scroll strip */}
      <div style={{
        marginTop: 48, display: 'flex', gap: 20, overflowX: 'auto',
        paddingLeft: 48, paddingRight: 48, paddingBottom: 8,
        scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch'
      }}>
        {EVENTS.map((ev, i) => {
          const { day, month } = formatDate(ev.date);
          const tc = tagColors[ev.tag] || { bg: 'var(--teal)', fg: 'var(--ink)' };
          return (
            <Reveal key={i} delay={i * .08} style={{ flexShrink: 0 }}>
              <div style={{
                width: 240, borderRadius: 28, padding: 28,
                background: isDark ? '#0f0d17' : '#fff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,.08)' : 'rgba(26,24,35,.08)'}`,
                display: 'flex', flexDirection: 'column', gap: 14,
                boxShadow: isDark ? 'none' : '0 4px 24px rgba(26,24,35,.06)',
                transition: 'transform .2s, box-shadow .2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(26,24,35,.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = isDark ? 'none' : '0 4px 24px rgba(26,24,35,.06)'; }}
              >
                {/* Date */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 44, lineHeight: 1, color: isDark ? '#fff' : 'var(--ink)', letterSpacing: '-0.03em' }}>{day}</span>
                  <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, textTransform: 'uppercase', letterSpacing: '.08em', color: isDark ? 'rgba(255,255,255,.5)' : 'var(--ink-60)', fontWeight: 500 }}>{month}</span>
                </div>

                {/* Tag + time */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ padding: '4px 12px', borderRadius: 999, background: tc.bg, color: tc.fg, fontSize: 11, fontFamily: "'Jost',sans-serif", fontWeight: 700, letterSpacing: '.04em' }}>{ev.tag}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: isDark ? 'rgba(255,255,255,.45)' : 'var(--ink-60)' }}>{ev.time}h</span>
                </div>

                {/* Title */}
                <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 18, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.15, color: isDark ? '#fff' : 'var(--ink)' }}>{ev.title}</h3>

                {/* Description */}
                <p style={{ fontSize: 13, lineHeight: 1.5, color: isDark ? 'rgba(255,255,255,.55)' : 'var(--ink-60)', margin: 0, fontFamily: "'Jost',sans-serif', fontWeight: 400" }}>{ev.desc}</p>

                {/* CTA */}
                <a href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent(`¡Hola! Me interesa el evento "${ev.title}". ¿Cómo me inscribo?`)}`} target="_blank" style={{
                  marginTop: 'auto', display: 'block', textAlign: 'center',
                  padding: '12px 16px', borderRadius: 999,
                  background: isDark ? 'rgba(255,255,255,.07)' : 'var(--ink)',
                  border: isDark ? '1px solid rgba(255,255,255,.12)' : 'none',
                  fontFamily: "'Jost',sans-serif", fontSize: 13, fontWeight: 600,
                  textDecoration: 'none', color: isDark ? '#fff' : 'var(--pink)'
                }}>Inscribirme →</a>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div style={{ padding: '0 48px', marginTop: 20, position: 'relative', zIndex: 1 }}>
        <Reveal delay={.3}>
          <p style={{ fontSize: 13, color: isDark ? 'rgba(255,255,255,.4)' : 'var(--ink-60)', fontFamily: "'JetBrains Mono',monospace" }}>
            Desliza para ver más · Eventos se actualizan con Google Calendar
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// --- Tienda ---
function ShopSection({ theme }) {
  const isDark = theme === 'dark';
  return (
    <section id="tienda" style={{ padding: '120px 48px', background: isDark ? '#0f0d17' : 'var(--cream)', position: 'relative' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal><SectionHeader eyebrow="/ tienda" title="Equípate en Moment." subtitle="Productos disponibles en el centro. Consulta stock por WhatsApp." theme={theme}/></Reveal>
        <div className="shop-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 56 }}>
          {SHOP.map((p, i) => (
            <Reveal key={i} delay={i * .07}>
              <div style={{
                background: isDark ? '#1a1627' : '#fff', borderRadius: 20, overflow: 'hidden',
                border: `1px solid ${isDark ? 'rgba(255,255,255,.06)' : 'rgba(26,24,35,.06)'}`,
                transition: 'transform .2s'
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <div style={{ aspectRatio: '4/3', background: isDark ? '#0f0d17' : 'var(--pink-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, opacity: .5, textTransform: 'uppercase', letterSpacing: '.14em' }}>▢ Foto producto</div>
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 20, margin: '0 0 6px', letterSpacing: '-0.01em' }}>{p.name}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.4, color: isDark ? 'rgba(255,255,255,.6)' : 'var(--ink-60)', margin: '0 0 16px', fontFamily: "'Jost',sans-serif" }}>{p.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 18 }}>{p.price}</span>
                    <a href={waBuyLink(p.name)} target="_blank" style={{
                      padding: '10px 18px', borderRadius: 999, background: '#25d366', color: '#fff',
                      fontSize: 12, fontFamily: "'Jost',sans-serif", fontWeight: 600, textDecoration: 'none'
                    }}>Comprar →</a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.shop-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:480px){.shop-grid{grid-template-columns:1fr!important}}`}</style>
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
              <div style={{
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
                <a href={`mailto:${BRAND.email}?subject=Postulación: ${j.title}&body=Adjunto mi CV para el cargo de ${j.title}.`} style={{
                  padding: '14px 24px', borderRadius: 999, background: 'var(--ink)', color: 'var(--pink)',
                  fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap'
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
    </section>
  );
}

// --- Contact ---
function ContactSection({ theme }) {
  const isDark = theme === 'dark';
  const inpStyle = { padding: '14px 16px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(230,198,199,.15)', borderRadius: 10, color: '#fff', fontSize: 14, fontFamily: "'Jost',sans-serif", outline: 'none' };
  return (
    <section id="contacto" style={{ padding: '120px 48px', background: 'var(--pink)', color: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
      <QC position="bottom-left" color="var(--ink)" size={180} style={{ opacity: .07 }}/>
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal><SectionHeader eyebrow="/ contacto" title="Parte por agendar una conversación." theme="light"/></Reveal>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 56 }}>
          <Reveal delay={.1}>
            <div style={{ background: 'var(--ink)', color: 'var(--pink-100)', borderRadius: 24, padding: 40 }}>
              <h3 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 28, color: '#fff', margin: '0 0 28px', position: 'relative' }}>Escríbenos.</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, position: 'relative' }}>
                <input placeholder="Nombre" style={inpStyle}/>
                <input placeholder="Teléfono" style={inpStyle}/>
              </div>
              <input placeholder="Email" style={{ ...inpStyle, width: '100%', marginTop: 14 }}/>
              <select style={{ ...inpStyle, width: '100%', marginTop: 14 }}>
                <option>¿Qué servicio te interesa?</option>
                {SERVICES.map(s => <option key={s.id}>{s.title}</option>)}
              </select>
              <textarea placeholder="Cuéntanos un poco" rows={4} style={{ ...inpStyle, width: '100%', marginTop: 14, resize: 'none' }}/>
              <button onClick={() => alert('Demo — en producción se conecta a email/CRM.')} style={{ marginTop: 20, width: '100%', padding: '16px', borderRadius: 999, background: 'var(--teal)', color: 'var(--ink)', fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 15 }}>Enviar mensaje →</button>
              <div style={{ marginTop: 10, fontSize: 11, color: 'rgba(230,198,199,.4)', fontFamily: "'JetBrains Mono',monospace", textAlign: 'center' }}>Demo · conectar email/CRM en producción</div>
            </div>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Reveal delay={.15}><InfoCard icon="assets/icon-location.png" label="Dirección" lines={[BRAND.address, BRAND.region]}/></Reveal>
            <Reveal delay={.2}><InfoCard icon="assets/icon-phone.png" label="Teléfono" lines={[BRAND.phone, 'WhatsApp disponible']}/></Reveal>
            <Reveal delay={.25}><InfoCard icon="assets/icon-clock.png" label="Horarios" lines={BRAND.hours.map(h => `${h[0]} · ${h[1]}`)}/></Reveal>
            <Reveal delay={.3}><InfoCard icon="assets/icon-support.png" label="Email & Instagram" lines={[BRAND.email, `@${BRAND.instagram}`]}/></Reveal>
          </div>
        </div>
        <Reveal delay={.35}>
          <div style={{ marginTop: 24, borderRadius: 24, overflow: 'hidden', height: 380, boxShadow: '0 20px 60px rgba(26,24,35,.15)', position: 'relative' }}>
            <iframe src="https://www.google.com/maps?q=-33.753589,-70.902940&hl=es&z=16&output=embed" style={{ width: '100%', height: '100%', border: 0 }} loading="lazy" allowFullScreen title="Moment"/>
            <a href="https://maps.app.goo.gl/9SdguuCr2wLYyhTT6" target="_blank" style={{ position: 'absolute', bottom: 20, right: 20, background: 'var(--pink)', padding: '12px 20px', borderRadius: 999, fontFamily: "'Jost',sans-serif", fontSize: 13, fontWeight: 600, textDecoration: 'none', color: 'var(--ink)' }}>Cómo llegar →</a>
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

Object.assign(window, { CalendarSection, ShopSection, JobsSection, ContactSection });
