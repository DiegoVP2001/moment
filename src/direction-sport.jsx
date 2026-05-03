// ============ DIRECTION: SPORT GRID ============
// Vibe: energético, cards densas, tipos grandes, ritmo visual con marquee y acentos fuertes.
function DirectionSport({ theme, density, headingFont, servicesLayout, showDecor }) {
  const pad = density==='compact' ? '64px' : density==='amplio' ? '140px' : '100px';
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

      {/* HERO SPORT — split */}
      <section style={{padding:`${pad} 36px 60px`, position:'relative'}}>
        <div style={{maxWidth:1400,margin:'0 auto',display:'grid',gridTemplateColumns:'1.1fr 1fr',gap:40,alignItems:'stretch'}}>
          <div style={{position:'relative'}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,letterSpacing:'.22em',textTransform:'uppercase',color:'var(--teal-dark)',marginBottom:32}}>
              ● Ahora abierto · Isla de Maipo
            </div>
            <h1 style={{
              fontFamily: headF, fontWeight: headingFont==='archivo'?900:700,
              fontSize:'clamp(72px, 10vw, 168px)', lineHeight:.86, letterSpacing:'-0.045em',
              margin:0, color:ink, textTransform:'uppercase'
            }}>
              Piensa en tu<br/>
              <span style={{color:'var(--teal-dark)'}}>bienestar.</span>
            </h1>
            <p style={{marginTop:32,fontSize:18,lineHeight:1.5,maxWidth:520,fontFamily:"'Jost',sans-serif",color:isDark?'rgba(255,255,255,.7)':'var(--ink-60)'}}>
              Cuatro áreas deportivas integradas: kinesiología, psicología, entrenamiento y escalada. Un equipo, un lugar, un proceso.
            </p>
            <div style={{display:'flex',gap:12,marginTop:28,flexWrap:'wrap'}}>
              <button style={{padding:'16px 28px',borderRadius:999,background:'var(--teal)',color:'var(--ink)',fontFamily:"'Jost',sans-serif",fontWeight:700,fontSize:14}}>Agendar evaluación →</button>
              <button style={{padding:'16px 28px',borderRadius:999,background:'var(--pink)',color:'var(--ink)',fontFamily:"'Jost',sans-serif",fontWeight:700,fontSize:14}}>Reservar escalada</button>
              <button style={{padding:'16px 28px',borderRadius:999,background:'transparent',color:ink,fontFamily:"'Jost',sans-serif",fontWeight:500,fontSize:14,border:`1.5px solid ${isDark?'rgba(255,255,255,.3)':'var(--ink)'}`}}>Ver precios</button>
            </div>
          </div>
          <div style={{position:'relative',borderRadius:24,overflow:'hidden',minHeight:560,background:'var(--pink)'}}>
            {showDecor && <div style={{position:'absolute',top:24,right:24,width:140,height:140,borderRadius:'50%',background:'var(--ink)',zIndex:2}}/>}
            {showDecor && <div style={{position:'absolute',top:44,right:44,width:100,height:100,borderRadius:'50%',background:'var(--pink)',zIndex:3}}/>}
            <PhotoPlaceholder label="hero · deportista entrenando" ratio="auto" tone="pink"/>
            <div style={{position:'absolute',left:24,bottom:24,right:24,background:'rgba(26,24,35,.85)',backdropFilter:'blur(10px)',color:'#fff',padding:'20px 24px',borderRadius:16,display:'flex',gap:24,alignItems:'center',zIndex:2}}>
              <img src="assets/logo-isotype-pink.png" style={{width:48,height:48}}/>
              <div>
                <div style={{fontFamily:"'Jost',sans-serif",fontWeight:600,fontSize:14}}>Sesión de kinesiología</div>
                <div style={{fontSize:12,color:'rgba(230,198,199,.7)',marginTop:2,fontFamily:"'JetBrains Mono',monospace"}}>lun 10:30 · karinna a.</div>
              </div>
              <div style={{marginLeft:'auto',padding:'6px 14px',background:'var(--teal)',borderRadius:999,color:'var(--ink)',fontSize:12,fontWeight:700,fontFamily:"'Jost',sans-serif"}}>CONFIRMADO</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div style={{background:'var(--ink)',color:'var(--pink)',padding:'20px 0',overflow:'hidden',borderTop:'1px solid rgba(230,198,199,.1)',borderBottom:'1px solid rgba(230,198,199,.1)'}}>
        <div style={{display:'flex',gap:48,whiteSpace:'nowrap',animation:'marquee 40s linear infinite',fontFamily:headF,fontSize:28,textTransform:'uppercase',letterSpacing:'-0.01em'}}>
          {Array.from({length:6}).map((_,i)=>(
            <React.Fragment key={i}>
              <span>Kinesiología</span><span style={{color:'var(--teal)'}}>◉</span>
              <span>Psicología</span><span style={{color:'var(--teal)'}}>◉</span>
              <span>Entrenamiento</span><span style={{color:'var(--teal)'}}>◉</span>
              <span>Recovery</span><span style={{color:'var(--teal)'}}>◉</span>
              <span style={{fontStyle:'italic',fontFamily:"'Playfair Display',serif",textTransform:'none'}}>escalada</span><span style={{color:'var(--teal)'}}>◉</span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>

      {/* SERVICES GRID 4-UP */}
      <section id="servicios" style={{padding:`${pad} 36px`, background: isDark?'#0f0d17':'var(--cream)'}}>
        <div style={{maxWidth:1400,margin:'0 auto'}}>
          <SectionHeader eyebrow="/ servicios" title="Cuatro áreas. Un solo centro." subtitle="Entra por la puerta que necesites hoy; complementa con las otras cuando estés listo." theme={theme} headingFont={headingFont}/>

          <div style={{display:'grid',gridTemplateColumns: servicesLayout==='list' ? '1fr' : 'repeat(4,1fr)',gap:20,marginTop:56}}>
            {SERVICES.map((s,i)=>{
              const accentC = s.accent==='teal'?'var(--teal)':s.accent==='blue'?'var(--blue)':s.accent==='pink'?'var(--pink)':'var(--ink)';
              const isPink = s.accent==='pink';
              const cardBg = i===0? 'var(--teal)' : i===1 ? 'var(--blue)' : i===2 ? (isDark?'#1a1627':'var(--ink)') : 'var(--pink)';
              const cardFg = i===2 ? (isDark?'#fff':'var(--pink)') : 'var(--ink)';
              return (
                <div key={s.id} style={{
                  background:cardBg, color:cardFg,
                  borderRadius:20, padding:28, position:'relative',overflow:'hidden',
                  minHeight: servicesLayout==='list'? 180 : 380,
                  display:'flex',flexDirection:'column',justifyContent:'space-between'
                }}>
                  {showDecor && <div style={{position:'absolute',top:-50,right:-50,width:140,height:140,borderRadius:'50%',background:'rgba(26,24,35,.12)'}}/>}
                  <div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:24}}>
                      <img src={s.icon} style={{width:54,height:54,objectFit:'contain'}}/>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,opacity:.6}}>{s.n}</span>
                    </div>
                    <h3 style={{fontFamily:headF,fontWeight: headingFont==='archivo'?900:700,fontSize:26,lineHeight:1.05,letterSpacing:'-0.02em',margin:'0 0 12px'}}>{s.title}</h3>
                    <p style={{fontSize:13,lineHeight:1.5,margin:0,opacity:.82,fontFamily:"'Jost',sans-serif"}}>{s.desc}</p>
                  </div>
                  <div style={{marginTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:16,borderTop:`1px solid ${i===2?'rgba(230,198,199,.2)':'rgba(26,24,35,.18)'}`}}>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:700}}>desde {s.items[0].v}</div>
                    <span style={{fontFamily:"'Jost',sans-serif",fontSize:13,fontWeight:600}}>{s.cta} →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PricingSection theme={theme} headingFont={headingFont} pad={pad} pinkBg={pinkBg}/>
      <GallerySection theme={theme} headingFont={headingFont} pad={pad} variant="sport" showDecor={showDecor}/>
      <TeamSection theme={theme} headingFont={headingFont} pad={pad} variant="sport"/>
      <BlogSection theme={theme} headingFont={headingFont} pad={pad}/>
      <ContactSection theme={theme} headingFont={headingFont} pad={pad} showDecor={showDecor} variant="sport"/>
      <Footer theme={theme}/>
    </div>
  );
}

Object.assign(window, { DirectionSport });
