// ============ DIRECTION: SHOWCASE ============
// Vibe: fotos full-bleed, cinematográfico, dark-friendly. Pink como acento.
function DirectionShowcase({ theme, density, headingFont, servicesLayout, showDecor }) {
  const pad = density==='compact' ? '80px' : density==='amplio' ? '160px' : '120px';
  const isDark=theme==='dark';
  const bg = isDark ? '#0f0d17' : 'var(--cream)';
  const ink = isDark ? '#fff' : 'var(--ink)';
  const pinkBg = isDark ? '#1f1a28' : 'var(--pink-50)';
  const headF = headingFont==='archivo' ? "'Archivo Black',sans-serif"
              : headingFont==='playfair' ? "'Playfair Display',serif"
              : headingFont==='jost' ? "'Jost',sans-serif"
              : "'Space Grotesk',sans-serif";

  return (
    <div style={{background:bg,color:ink,minHeight:'100vh'}}>
      <Nav theme={theme}/>

      {/* HERO SHOWCASE — full-bleed image background */}
      <section style={{position:'relative',minHeight:'92vh',overflow:'hidden',color:'#fff'}}>
        <div style={{position:'absolute',inset:0,background:'var(--ink)'}}>
          <PhotoPlaceholder label="hero · muro de escalada 8m" ratio="auto" tone="ink"/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg, rgba(15,13,23,.3) 0%, rgba(15,13,23,.85) 100%)'}}/>
        </div>
        {showDecor && (
          <>
            <div style={{position:'absolute',top:120,right:80,width:320,height:320,borderRadius:'50%',background:'var(--pink)',opacity:.4,mixBlendMode:'screen'}}/>
            <div style={{position:'absolute',top:200,right:160,width:160,height:160,borderRadius:'50%',background:'var(--teal)',opacity:.3,mixBlendMode:'screen'}}/>
          </>
        )}
        <div style={{position:'relative',zIndex:2,maxWidth:1400,margin:'0 auto',padding:'120px 48px 80px',display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:'92vh'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:28}}>
              <img src="assets/logo-isotype-pink.png" style={{width:44,height:44}}/>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,letterSpacing:'.22em',textTransform:'uppercase',color:'var(--pink)'}}>◉ Centro Deportivo · 2019</div>
            </div>
          </div>
          <div>
            <h1 style={{
              fontFamily:headF,fontWeight: headingFont==='archivo'?900:700,
              fontSize:'clamp(72px, 11vw, 200px)',lineHeight:.86,letterSpacing:'-0.045em',margin:0,color:'#fff'
            }}>
              Piensa en tu<br/>
              <span style={{fontFamily:"'Playfair Display',serif",fontStyle:'italic',fontWeight:400,color:'var(--pink)'}}>bienestar</span>.
            </h1>
            <div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:60,marginTop:60,alignItems:'end'}}>
              <p style={{fontSize:20,lineHeight:1.5,maxWidth:560,color:'rgba(255,255,255,.78)',margin:0,fontFamily:"'Jost',sans-serif",fontWeight:300}}>
                Moment es un centro deportivo integral donde el cuerpo, la mente y el movimiento se cuidan juntos. Kinesiología, psicología, entrenamiento y escalada.
              </p>
              <div style={{display:'flex',gap:12,justifyContent:'flex-end',flexWrap:'wrap'}}>
                <button style={{padding:'18px 30px',borderRadius:999,background:'var(--pink)',color:'var(--ink)',fontFamily:"'Jost',sans-serif",fontWeight:700,fontSize:14}}>Agendar evaluación →</button>
                <button style={{padding:'18px 30px',borderRadius:999,background:'transparent',color:'#fff',fontFamily:"'Jost',sans-serif",fontWeight:500,fontSize:14,border:'1.5px solid rgba(255,255,255,.4)'}}>Tour virtual</button>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:24,marginTop:80,paddingTop:32,borderTop:'1px solid rgba(255,255,255,.18)'}}>
              {[
                ['Kinesiología','desde $20.000'],
                ['Psicología','desde $20.000'],
                ['Entrenamiento','desde $90.000'],
                ['Escalada','desde $8.000'],
              ].map(([a,b],i)=>(
                <div key={i}>
                  <div style={{fontFamily:"'Jost',sans-serif",fontSize:14,color:'var(--pink)',fontWeight:500}}>{a}</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,marginTop:6,color:'rgba(255,255,255,.65)'}}>{b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SHOWCASE — alternating image + text rows */}
      <section id="servicios" style={{padding:`${pad} 48px`}}>
        <div style={{maxWidth:1400,margin:'0 auto'}}>
          <SectionHeader eyebrow="/ servicios" title="Cada área, su propio espacio." subtitle="Conoce cómo se ve y se siente cada servicio antes de agendar." theme={theme} headingFont={headingFont}/>
          <div style={{marginTop:72,display:'flex',flexDirection:'column',gap:80}}>
            {SERVICES.map((s,i)=>{
              const accentC = s.accent==='teal'?'var(--teal)':s.accent==='blue'?'var(--blue)':s.accent==='pink'?'var(--pink)':'var(--ink)';
              const flip = i%2===1;
              return (
                <div key={s.id} style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'center'}}>
                  <div style={{order: flip?2:1,position:'relative',borderRadius:20,overflow:'hidden',minHeight:440,background:accentC}}>
                    {showDecor && <div style={{position:'absolute',top:20,left:20,width:80,height:80,borderRadius:'50%',background:s.accent==='ink'?'var(--pink)':'var(--ink)',zIndex:2,opacity:.9}}/>}
                    <PhotoPlaceholder label={s.title.toLowerCase()} ratio="auto" tone={s.accent==='ink'?'ink':'pink'}/>
                    <div style={{position:'absolute',bottom:20,right:20,background:'rgba(26,24,35,.85)',backdropFilter:'blur(8px)',color:'#fff',padding:'12px 18px',borderRadius:999,fontFamily:"'JetBrains Mono',monospace",fontSize:12,zIndex:2}}>
                      {s.n} / 04
                    </div>
                  </div>
                  <div style={{order: flip?1:2}}>
                    <img src={s.icon} style={{width:72,height:72,objectFit:'contain',marginBottom:20}}/>
                    <h3 style={{fontFamily:headF,fontWeight:headingFont==='archivo'?900:700,fontSize:'clamp(40px,4vw,64px)',margin:0,lineHeight:.95,letterSpacing:'-0.03em'}}>{s.title}</h3>
                    <p style={{fontSize:18,lineHeight:1.55,color:isDark?'rgba(255,255,255,.65)':'var(--ink-60)',marginTop:20,maxWidth:520,fontFamily:"'Jost',sans-serif"}}>{s.desc}</p>
                    <div style={{display:'flex',gap:8,marginTop:28,flexWrap:'wrap'}}>
                      {s.items.slice(0,3).map((it,j)=>(
                        <span key={j} style={{padding:'8px 14px',background:isDark?'rgba(255,255,255,.06)':'var(--pink-50)',borderRadius:999,fontSize:12,fontFamily:"'Jost',sans-serif",fontWeight:500}}>{it.k} · {it.v}</span>
                      ))}
                    </div>
                    <button style={{marginTop:32,padding:'16px 28px',borderRadius:999,background:accentC,color:s.accent==='ink'?'#fff':'var(--ink)',fontFamily:"'Jost',sans-serif",fontWeight:600,fontSize:14}}>{s.cta} →</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PricingSection theme={theme} headingFont={headingFont} pad={pad} pinkBg={pinkBg}/>
      <GallerySection theme={theme} headingFont={headingFont} pad={pad} variant="showcase" showDecor={showDecor}/>
      <TeamSection theme={theme} headingFont={headingFont} pad={pad} variant="showcase"/>
      <BlogSection theme={theme} headingFont={headingFont} pad={pad}/>
      <ContactSection theme={theme} headingFont={headingFont} pad={pad} showDecor={showDecor} variant="showcase"/>
      <Footer theme={theme}/>
    </div>
  );
}

Object.assign(window, { DirectionShowcase });
