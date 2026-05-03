// ============ DIRECTION: EDITORIAL ============
// Vibe: tipografía enorme, mucho aire, boutique wellness. Pink dominante claro.
function DirectionEditorial({ theme, density, headingFont, servicesLayout, showDecor }) {
  const pad = density==='compact' ? '80px' : density==='amplio' ? '160px' : '120px';
  const isDark = theme==='dark';
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

      {/* HERO EDITORIAL */}
      <section style={{position:'relative', padding:`${pad} 48px 60px`, overflow:'hidden'}}>
        {showDecor && (
          <>
            <div style={{position:'absolute',top:-200,right:-200,width:560,height:560,borderRadius:'50%',background:'var(--pink)',opacity: isDark?.28:.55, filter:'blur(4px)', zIndex:0}}/>
            <div style={{position:'absolute',top:120,right:140,width:120,height:120,borderRadius:'50%',background:isDark?'#0f0d17':'var(--ink)', zIndex:0}}/>
            <div style={{position:'absolute',bottom:-40,left:-80,width:220,height:220,borderRadius:'50%',background:'var(--teal)',opacity:.35,zIndex:0}}/>
          </>
        )}
        <div style={{position:'relative',zIndex:2, maxWidth:1400, margin:'0 auto'}}>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,letterSpacing:'.22em',textTransform:'uppercase',color:'var(--teal-dark)',marginBottom:40}}>
            ◉ Centro deportivo integral · Isla de Maipo
          </div>
          <h1 style={{
            fontFamily: headF, fontWeight: headingFont==='archivo'?900:700,
            fontSize:'clamp(84px, 13vw, 220px)', lineHeight:.88, letterSpacing:'-0.045em',
            margin:0, color:ink
          }}>
            piensa en tu<br/>
            <span style={{fontFamily:"'Playfair Display',serif",fontStyle:'italic',fontWeight:400,color:'var(--teal-dark)'}}>bienestar</span>
            <span style={{color:'var(--pink-300)',fontFamily:headF}}>.</span>
          </h1>
          <div style={{display:'grid',gridTemplateColumns:'1.3fr 1fr',gap:60,marginTop:64,alignItems:'end',marginBottom:60}}>
            <p style={{fontSize:22,lineHeight:1.45,maxWidth:640,color:isDark?'rgba(255,255,255,.75)':'var(--ink-60)',margin:0,fontFamily:"'Jost',sans-serif",fontWeight:300}}>
              Un espacio donde kinesiología, psicología, entrenamiento y escalada conviven con un mismo propósito: cuidar tu rendimiento completo, no solo tus músculos.
            </p>
            <div style={{display:'flex',gap:14,justifyContent:'flex-end'}}>
              <button style={{padding:'18px 36px',borderRadius:999,background:'var(--ink)',color:'var(--pink)',fontWeight:600,fontSize:15,fontFamily:"'Jost',sans-serif"}}>Agendar evaluación →</button>
              <button style={{padding:'18px 36px',borderRadius:999,background:'transparent',color:ink,fontWeight:500,fontSize:15,fontFamily:"'Jost',sans-serif",border:`1.5px solid ${isDark?'rgba(255,255,255,.3)':'var(--ink)'}`}}>Conocer el centro</button>
            </div>
          </div>

        </div>
      </section>

      {/* SERVICES EDITORIAL — large list rows with hover */}
      <section id="servicios" style={{padding:`${pad} 48px`, background: isDark?'#0f0d17':'var(--cream)'}}>
        <div style={{maxWidth:1400,margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,marginBottom:80,alignItems:'end'}}>
            <SectionHeader eyebrow="/ servicios" title="Todo lo que tu cuerpo y mente necesitan." theme={theme} headingFont={headingFont}/>
            <p style={{fontSize:17,lineHeight:1.5,color:isDark?'rgba(255,255,255,.6)':'var(--ink-60)',margin:0,fontFamily:"'Jost',sans-serif",fontWeight:300}}>
              Cuatro áreas que trabajan coordinadas. Puedes entrar por una y, si lo necesitas, complementar con otra sin cambiar de espacio ni de equipo.
            </p>
          </div>

          {servicesLayout==='list' || servicesLayout==='grid' ? (
            <ServicesListEditorial theme={theme} headingFont={headingFont}/>
          ) : servicesLayout==='cards' ? (
            <ServicesCardsEditorial theme={theme} headingFont={headingFont}/>
          ) : (
            <ServicesTabsEditorial theme={theme} headingFont={headingFont}/>
          )}
        </div>
      </section>

      {/* PRICING */}
      <PricingSection theme={theme} headingFont={headingFont} pad={pad} pinkBg={pinkBg}/>

      {/* GALLERY INSTALACIONES */}
      <GallerySection theme={theme} headingFont={headingFont} pad={pad} variant="editorial" showDecor={showDecor}/>

      {/* TEAM */}
      <TeamSection theme={theme} headingFont={headingFont} pad={pad} variant="editorial"/>

      {/* BLOG */}
      <BlogSection theme={theme} headingFont={headingFont} pad={pad}/>

      {/* CONTACT + HOURS */}
      <ContactSection theme={theme} headingFont={headingFont} pad={pad} showDecor={showDecor} variant="editorial"/>

      <Footer theme={theme}/>
    </div>
  );
}

function ServicesListEditorial({ theme, headingFont }) {
  const isDark = theme==='dark';
  const [hover, setHover] = useState(null);
  const headF = headingFont==='archivo' ? "'Archivo Black',sans-serif"
              : headingFont==='playfair' ? "'Playfair Display',serif"
              : headingFont==='jost' ? "'Jost',sans-serif"
              : "'Space Grotesk',sans-serif";
  return (
    <div style={{borderTop:`1px solid ${isDark?'rgba(255,255,255,.12)':'rgba(26,24,35,.15)'}`}}>
      {SERVICES.map((s, i) => {
        const accentC = s.accent==='teal'?'var(--teal)':s.accent==='blue'?'var(--blue)':s.accent==='pink'?'var(--pink)':'var(--ink)';
        return (
          <div
            key={s.id}
            onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}
            style={{
              display:'grid',gridTemplateColumns:'60px 1fr auto 60px',gap:28,alignItems:'center',
              padding:'36px 0',borderBottom:`1px solid ${isDark?'rgba(255,255,255,.12)':'rgba(26,24,35,.15)'}`,
              transition:'padding .3s',
              cursor:'pointer',
              paddingLeft: hover===i ? 24 : 0,
            }}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,opacity:.5}}>{s.n}</div>
            <div>
              <div style={{
                fontFamily:headF, fontWeight: headingFont==='archivo'?900:700,
                fontSize:'clamp(32px, 4vw, 56px)',letterSpacing:'-0.02em',lineHeight:1,
                color: hover===i ? accentC : (isDark?'#fff':'var(--ink)'),
                transition:'color .3s'
              }}>{s.title.toLowerCase()}</div>
              <div style={{marginTop:12,fontSize:15,color:isDark?'rgba(255,255,255,.55)':'var(--ink-60)',maxWidth:560,fontFamily:"'Jost',sans-serif"}}>{s.desc}</div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:16}}>
              <a href={`#precios-${s.id}`} onClick={(e)=>{ e.preventDefault(); const el=document.getElementById('precios'); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); window.__setPricingTab && window.__setPricingTab(i); }} style={{
                padding:'14px 22px',borderRadius:999,
                background: hover===i ? accentC : 'transparent',
                color: hover===i && s.accent==='ink' ? '#fff' : (hover===i ? 'var(--ink)' : (isDark?'#fff':'var(--ink)')),
                border:`1.5px solid ${hover===i ? accentC : (isDark?'rgba(255,255,255,.3)':'var(--ink)')}`,
                fontFamily:"'Jost',sans-serif",fontSize:13,fontWeight:500,whiteSpace:'nowrap',
                transition:'all .3s', textDecoration:'none', display:'inline-block'
              }}>Ver valores →</a>
            </div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,textAlign:'right',opacity:.5}}>desde ${s.items[0].v.replace('$','')}</div>
          </div>
        );
      })}
    </div>
  );
}

function ServicesCardsEditorial({ theme, headingFont }) {
  const isDark=theme==='dark';
  const headF = headingFont==='archivo' ? "'Archivo Black',sans-serif" : headingFont==='playfair'? "'Playfair Display',serif" : "'Jost',sans-serif";
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:28}}>
      {SERVICES.map(s=>{
        const accentC = s.accent==='teal'?'var(--teal)':s.accent==='blue'?'var(--blue)':s.accent==='pink'?'var(--pink)':'var(--ink)';
        return (
          <div key={s.id} style={{
            background:isDark?'#1a1627':'#fff',
            border:`1px solid ${isDark?'rgba(255,255,255,.08)':'rgba(26,24,35,.08)'}`,
            borderRadius:20, padding:40, position:'relative',overflow:'hidden'
          }}>
            <div style={{position:'absolute',top:-40,right:-40,width:140,height:140,borderRadius:'50%',background:accentC,opacity:.25}}/>
            <img src={s.icon} style={{width:64,height:64,objectFit:'contain',position:'relative'}}/>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,opacity:.5,marginTop:24}}>{s.n}</div>
            <h3 style={{fontFamily:headF,fontSize:32,margin:'6px 0 12px',letterSpacing:'-0.02em',lineHeight:1.05}}>{s.title}</h3>
            <p style={{fontSize:14,lineHeight:1.5,color:isDark?'rgba(255,255,255,.6)':'var(--ink-60)',margin:'0 0 24px'}}>{s.desc}</p>
            <button style={{padding:'12px 20px',borderRadius:999,background:accentC,color:s.accent==='ink'?'#fff':'var(--ink)',fontFamily:"'Jost',sans-serif",fontWeight:600,fontSize:13}}>{s.cta} →</button>
          </div>
        );
      })}
    </div>
  );
}

function ServicesTabsEditorial({ theme, headingFont }) {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];
  const isDark=theme==='dark';
  const accentC = s.accent==='teal'?'var(--teal)':s.accent==='blue'?'var(--blue)':s.accent==='pink'?'var(--pink)':'var(--ink)';
  const headF = headingFont==='archivo' ? "'Archivo Black',sans-serif" : "'Playfair Display',serif";
  return (
    <div>
      <div style={{display:'flex',gap:8,borderBottom:`1px solid ${isDark?'rgba(255,255,255,.12)':'rgba(26,24,35,.12)'}`,marginBottom:40,flexWrap:'wrap'}}>
        {SERVICES.map((x,i)=>(
          <button key={x.id} onClick={()=>setActive(i)} style={{
            padding:'16px 24px',fontFamily:"'Jost',sans-serif",fontSize:14,fontWeight:500,
            borderBottom: active===i ? `2px solid ${accentC}` : '2px solid transparent',
            color: active===i ? (isDark?'#fff':'var(--ink)') : (isDark?'rgba(255,255,255,.5)':'var(--ink-60)'),
            marginBottom:-1
          }}>{x.n} · {x.title}</button>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1.3fr 1fr',gap:60}}>
        <div>
          <h3 style={{fontFamily:headF,fontSize:56,margin:0,letterSpacing:'-0.02em',lineHeight:1}}>{s.title}</h3>
          <p style={{fontSize:18,lineHeight:1.55,color:isDark?'rgba(255,255,255,.65)':'var(--ink-60)',marginTop:20,maxWidth:560}}>{s.desc}</p>
          <button style={{marginTop:32,padding:'14px 28px',borderRadius:999,background:accentC,color:s.accent==='ink'?'#fff':'var(--ink)',fontFamily:"'Jost',sans-serif",fontWeight:600,fontSize:14}}>{s.cta} →</button>
        </div>
        <div style={{background:isDark?'#1a1627':'#fff',borderRadius:16,padding:28,border:`1px solid ${isDark?'rgba(255,255,255,.08)':'rgba(26,24,35,.08)'}`}}>
          {s.items.map((it,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'14px 0',borderBottom: i<s.items.length-1?`1px dashed ${isDark?'rgba(255,255,255,.1)':'rgba(26,24,35,.1)'}`:'none',fontSize:14}}>
              <span style={{fontFamily:"'Jost',sans-serif"}}>{it.k}</span>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}>{it.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- PRICING (shared across directions, tabbed) ---
function PricingSection({ theme, headingFont, pad, pinkBg }) {
  const [active, setActive] = useState(0);
  useEffect(()=>{ window.__setPricingTab = setActive; },[]);
  const s = SERVICES[active];
  const isDark=theme==='dark';
  const accentC = s.accent==='teal'?'var(--teal)':s.accent==='blue'?'var(--blue)':s.accent==='pink'?'var(--pink)':'var(--ink)';
  const headF = headingFont==='archivo' ? "'Archivo Black',sans-serif" : headingFont==='playfair'?"'Playfair Display',serif":"'Space Grotesk',sans-serif";
  return (
    <section id="precios" style={{padding:`${pad} 48px`, background:pinkBg, position:'relative', overflow:'hidden'}}>
      <div style={{maxWidth:1400, margin:'0 auto', position:'relative', zIndex:1}}>
        <SectionHeader eyebrow="/ precios" title="Valores de Servicios." subtitle="Filtra por área y mira exactamente qué obtienes por qué valor. Sin paquetes escondidos." theme={theme} headingFont={headingFont}/>

        <div style={{display:'flex',gap:10,marginTop:48,flexWrap:'wrap'}}>
          {SERVICES.map((x,i)=>(
            <button key={x.id} onClick={()=>setActive(i)} style={{
              padding:'12px 22px', borderRadius:999,
              background: active===i ? 'var(--ink)' : 'transparent',
              color: active===i ? 'var(--pink)' : (isDark?'#fff':'var(--ink)'),
              border:`1.5px solid ${active===i?'var(--ink)':(isDark?'rgba(255,255,255,.3)':'rgba(26,24,35,.2)')}`,
              fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:500
            }}>{x.title}</button>
          ))}
        </div>

        <div style={{marginTop:40,display:'grid',gridTemplateColumns:'1fr 1fr',gap:32}}>
          <div style={{background:isDark?'#1a1627':'#fff',borderRadius:24,padding:40,border:`1px solid ${isDark?'rgba(255,255,255,.08)':'rgba(26,24,35,.06)'}`,position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:-30,right:-30,width:120,height:120,borderRadius:'50%',background:accentC,opacity:.3}}/>
            <img src={s.icon} style={{width:72,height:72,position:'relative'}}/>
            <h3 style={{fontFamily:headF,fontSize:44,margin:'20px 0 10px',letterSpacing:'-0.02em',lineHeight:1}}>{s.title}</h3>
            <p style={{fontSize:15,lineHeight:1.5,color:isDark?'rgba(255,255,255,.6)':'var(--ink-60)',margin:'0 0 28px',maxWidth:440}}>{s.desc}</p>
            <a href={waGeneralLink(s.title)} target="_blank" style={{display:'inline-block',padding:'14px 26px',borderRadius:999,background:accentC,color:s.accent==='ink'?'#fff':'var(--ink)',fontFamily:"'Jost',sans-serif",fontWeight:600,fontSize:14,textDecoration:'none'}}>{s.cta} vía WhatsApp →</a>
          </div>
          <div style={{background:isDark?'#1a1627':'#fff',borderRadius:24,padding:12,border:`1px solid ${isDark?'rgba(255,255,255,.08)':'rgba(26,24,35,.06)'}`}}>
            {s.items.map((it,i)=>(
              <a key={i} href={waLink(s.title, it.k)} target="_blank" style={{
                display:'grid',gridTemplateColumns:'32px 1fr auto auto',gap:16,alignItems:'center',
                padding:'18px 20px',borderBottom: i<s.items.length-1?`1px solid ${isDark?'rgba(255,255,255,.06)':'rgba(26,24,35,.06)'}`:'none',
                borderRadius:i===0?'16px 16px 0 0':i===s.items.length-1?'0 0 16px 16px':0,
                textDecoration:'none',color:'inherit',transition:'background .15s'
              }} onMouseEnter={e=>e.currentTarget.style.background=isDark?'rgba(255,255,255,.03)':'var(--pink-50)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,opacity:.4}}>{String(i+1).padStart(2,'0')}</span>
                <span style={{fontFamily:"'Jost',sans-serif",fontSize:15}}>{it.k}</span>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:16,color:accentC==='var(--ink)'?(isDark?'#fff':'var(--ink)'):accentC}}>{it.v}</span>
                <span style={{fontSize:11,fontFamily:"'Jost',sans-serif",color:'#25d366',fontWeight:600}}>WA →</span>
              </a>
            ))}
          </div>
        </div>

        {/* PLAN DETAIL */}
        <div style={{marginTop:32,background:isDark?'rgba(255,255,255,.03)':'rgba(255,255,255,.55)',backdropFilter:'blur(10px)',border:`1px solid ${isDark?'rgba(255,255,255,.06)':'rgba(26,24,35,.06)'}`,borderRadius:24,padding:36,display:'grid',gridTemplateColumns:'auto 1fr auto',gap:28,alignItems:'center'}}>
          <div style={{width:60,height:60,borderRadius:'50%',background:accentC,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Archivo Black',sans-serif",fontSize:18,color:s.accent==='ink'?'#fff':'var(--ink)'}}>{s.n}</div>
          <div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',color:isDark?'rgba(255,255,255,.5)':'var(--ink-60)',marginBottom:8}}>Detalle del plan</div>
            <p style={{fontSize:15,lineHeight:1.55,margin:0,color:isDark?'rgba(255,255,255,.75)':'var(--ink)',fontFamily:"'Jost',sans-serif",maxWidth:860}}>{s.detail}</p>
          </div>
          <a href={waGeneralLink(s.title)} target="_blank" style={{padding:'12px 20px',borderRadius:999,background:'#25d366',color:'#fff',fontFamily:"'Jost',sans-serif",fontWeight:600,fontSize:13,textDecoration:'none',whiteSpace:'nowrap'}}>Consultar →</a>
        </div>
      </div>
    </section>
  );
}

// --- GALLERY ---
function GallerySection({ theme, headingFont, pad, variant, showDecor }) {
  const isDark = theme==='dark';
  return (
    <section id="instalaciones" style={{padding:`${pad} 48px`, position:'relative', overflow:'hidden', background: isDark?'#0f0d17':'var(--cream)'}}>
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:60,marginBottom:56,alignItems:'end'}}>
          <SectionHeader eyebrow="/ instalaciones" title="Un centro pensado para cada etapa." theme={theme} headingFont={headingFont}/>
          <a style={{fontFamily:"'Jost',sans-serif",fontSize:14,borderBottom:`1px solid ${isDark?'rgba(255,255,255,.4)':'var(--ink)'}`,paddingBottom:4}}>Tour virtual →</a>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gridAutoRows:'200px',gap:14}}>
          <div style={{gridColumn:'span 2',gridRow:'span 2'}}><PhotoPlaceholder label={GALLERY_CAPTIONS[0]} ratio="auto" tone="pink"/></div>
          <div><PhotoPlaceholder label={GALLERY_CAPTIONS[1]} ratio="auto" tone="cream"/></div>
          <div><PhotoPlaceholder label={GALLERY_CAPTIONS[2]} ratio="auto" tone="ink"/></div>
          <div style={{gridColumn:'span 2'}}><PhotoPlaceholder label={GALLERY_CAPTIONS[3]} ratio="auto" tone="pink"/></div>
          <div><PhotoPlaceholder label={GALLERY_CAPTIONS[4]} ratio="auto" tone="cream"/></div>
          <div><PhotoPlaceholder label={GALLERY_CAPTIONS[5]} ratio="auto" tone="ink"/></div>
        </div>
      </div>
    </section>
  );
}

// --- TEAM ---
function TeamSection({ theme, headingFont, pad, variant }) {
  const isDark=theme==='dark';
  const headF = headingFont==='archivo' ? "'Archivo Black',sans-serif" : headingFont==='playfair'?"'Playfair Display',serif":"'Space Grotesk',sans-serif";
  return (
    <section id="equipo" style={{padding:`${pad} 48px`, background: isDark?'#1a1627':'var(--ink)', color:'var(--pink-100)'}}>
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:60,marginBottom:72,alignItems:'end'}}>
          <div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,letterSpacing:'.22em',textTransform:'uppercase',color:'var(--teal)',marginBottom:18}}>/ equipo</div>
            <h2 style={{fontFamily:headF,fontSize:'clamp(44px, 5.5vw, 80px)',lineHeight:.95,letterSpacing:'-0.03em',margin:0,color:'#fff'}}>
              Profesionales que <span style={{fontFamily:"'Playfair Display',serif",fontStyle:'italic',fontWeight:400,color:'var(--pink)'}}>escuchan</span> antes de tratar.
            </h2>
          </div>
          <p style={{fontSize:17,lineHeight:1.55,color:'rgba(230,198,199,.7)',margin:0,fontFamily:"'Jost',sans-serif",fontWeight:300,maxWidth:460}}>
            Cada miembro del equipo tiene formación específica y trabaja en coordinación con las otras áreas del centro.
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:28}}>
          {TEAM.map((m,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(230,198,199,.1)',borderRadius:20,overflow:'hidden',position:'relative'}}>
              <div style={{aspectRatio:'4/5',overflow:'hidden',background:'var(--pink-100)'}}>
                <img src={m.photo} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top',filter:'grayscale(.15) contrast(1.02)'}}/>
              </div>
              <div style={{padding:28}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--teal)',marginBottom:10}}>0{i+1}</div>
                <h3 style={{fontFamily:headF,fontSize:28,margin:'0 0 6px',color:'#fff',letterSpacing:'-0.01em'}}>{m.name}</h3>
                <div style={{fontSize:13,color:'var(--pink)',fontFamily:"'Jost',sans-serif",fontWeight:500,letterSpacing:'.02em',marginBottom:14}}>{m.role}</div>
                <p style={{fontSize:14,lineHeight:1.5,color:'rgba(230,198,199,.7)',margin:0}}>{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- BLOG ---
function BlogSection({ theme, headingFont, pad }) {
  const isDark=theme==='dark';
  const [open, setOpen] = useState(null);
  const [allOpen, setAllOpen] = useState(false);
  const headF = headingFont==='archivo' ? "'Archivo Black',sans-serif" : headingFont==='playfair'?"'Playfair Display',serif":"'Space Grotesk',sans-serif";
  const stockBody = {
    'Recovery':'La terapia de compresión aplica presión intermitente en extremidades para mejorar el retorno venoso, disminuir el ácido láctico y acelerar la recuperación muscular. En Moment la usamos como complemento a entrenamientos exigentes o jornadas largas de escalada.\n\nSesiones de 20–30 minutos, ideal post-entrenamiento o antes de una competencia.',
    'Mental':'Antes de una competencia clave, tres rutinas simples marcan diferencia: (1) visualización guiada 10 min la noche anterior, (2) respiración 4-7-8 al despertar, (3) anclaje físico — un gesto corto, el mismo siempre — 30 seg antes de entrar a competir.\n\nTrabajadas con nuestro psicólogo deportivo, se vuelven automatismos.',
    'Escalada':'Tu primera sesión en muro no requiere experiencia ni equipo: te recibimos con una inducción de seguridad, te presentamos arnés y nudos básicos, y haces tus primeras rutas con instructor. Lo que nadie te cuenta: los brazos NO son lo que más duele al día siguiente — son los antebrazos y el core.\n\nRecomendamos hidratarte bien y llegar 15 minutos antes.'
  };
  return (
    <section id="blog" style={{padding:`${pad} 48px`, background: isDark?'#0f0d17':'var(--cream)'}}>
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:60,marginBottom:56,alignItems:'end'}}>
          <SectionHeader eyebrow="/ journal" title="Lectura útil para tu proceso." theme={theme} headingFont={headingFont}/>
          <button onClick={()=>setAllOpen(true)} style={{fontFamily:"'Jost',sans-serif",fontSize:14,borderBottom:`1px solid ${isDark?'rgba(255,255,255,.4)':'var(--ink)'}`,paddingBottom:4,background:'none'}}>Ver todos los artículos →</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:28}}>
          {BLOG.map((b,i)=>(
            <article key={i} onClick={()=>setOpen(i)} style={{background:isDark?'#1a1627':'#fff',borderRadius:20,overflow:'hidden',border:`1px solid ${isDark?'rgba(255,255,255,.06)':'rgba(26,24,35,.06)'}`,cursor:'pointer',transition:'transform .2s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'} onMouseLeave={e=>e.currentTarget.style.transform='none'}>
              <div style={{height:220}}><PhotoPlaceholder label={`artículo ${i+1}`} ratio="auto" tone={i%2?'pink':'cream'}/></div>
              <div style={{padding:28}}>
                <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:16}}>
                  <span style={{background:'var(--pink-100)',color:'var(--ink)',padding:'4px 12px',borderRadius:999,fontFamily:"'Jost',sans-serif",fontSize:11,fontWeight:600,letterSpacing:'.04em',textTransform:'uppercase'}}>{b.tag}</span>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,opacity:.5}}>{b.read} lectura</span>
                </div>
                <h3 style={{fontFamily:headF,fontSize:22,lineHeight:1.2,margin:0,letterSpacing:'-0.01em'}}>{b.title}</h3>
                <div style={{marginTop:20,fontFamily:"'Jost',sans-serif",fontSize:13,color:'var(--teal-dark)',fontWeight:600}}>Leer artículo →</div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {open!==null && (
        <div onClick={()=>setOpen(null)} style={{position:'fixed',inset:0,background:'rgba(15,13,23,.75)',backdropFilter:'blur(8px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
          <div onClick={e=>e.stopPropagation()} style={{background:'#fff',borderRadius:24,maxWidth:720,width:'100%',maxHeight:'85vh',overflow:'auto',padding:48,position:'relative',color:'var(--ink)'}}>
            <button onClick={()=>setOpen(null)} style={{position:'absolute',top:20,right:20,width:36,height:36,borderRadius:'50%',background:'var(--pink-100)',fontSize:18}}>×</button>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--teal-dark)'}}>{BLOG[open].tag} · {BLOG[open].read} lectura</div>
            <h2 style={{fontFamily:headF,fontSize:38,lineHeight:1.1,margin:'12px 0 24px',letterSpacing:'-0.02em'}}>{BLOG[open].title}</h2>
            <div style={{height:240,borderRadius:14,overflow:'hidden',marginBottom:28}}><PhotoPlaceholder label="imagen artículo" ratio="auto" tone="pink"/></div>
            {stockBody[BLOG[open].tag].split('\n\n').map((p,j)=>(
              <p key={j} style={{fontSize:16,lineHeight:1.65,color:'var(--ink-60)',fontFamily:"'Jost',sans-serif",margin:'0 0 16px'}}>{p}</p>
            ))}
            <div style={{marginTop:24,fontSize:12,fontFamily:"'JetBrains Mono',monospace",color:'var(--ink-60)',opacity:.6}}>— Contenido stock para demo</div>
          </div>
        </div>
      )}
      {allOpen && (
        <div onClick={()=>setAllOpen(false)} style={{position:'fixed',inset:0,background:'rgba(15,13,23,.75)',backdropFilter:'blur(8px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
          <div onClick={e=>e.stopPropagation()} style={{background:'#fff',borderRadius:24,maxWidth:900,width:'100%',maxHeight:'85vh',overflow:'auto',padding:48,position:'relative',color:'var(--ink)'}}>
            <button onClick={()=>setAllOpen(false)} style={{position:'absolute',top:20,right:20,width:36,height:36,borderRadius:'50%',background:'var(--pink-100)',fontSize:18}}>×</button>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--teal-dark)'}}>/ archivo completo</div>
            <h2 style={{fontFamily:headF,fontSize:42,margin:'12px 0 32px',letterSpacing:'-0.02em'}}>Todos los artículos</h2>
            <div style={{display:'flex',flexDirection:'column',gap:0}}>
              {[...BLOG, ...BLOG.map(b=>({...b,title:b.title+' (vol. 2)'}))].map((b,i)=>(
                <div key={i} onClick={()=>{setAllOpen(false); setOpen(i%BLOG.length);}} style={{display:'grid',gridTemplateColumns:'80px 1fr auto',gap:24,padding:'20px 0',borderBottom:'1px solid rgba(26,24,35,.08)',cursor:'pointer',alignItems:'center'}}>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,opacity:.5}}>{String(i+1).padStart(2,'0')}</span>
                  <div>
                    <div style={{fontFamily:"'Jost',sans-serif",fontSize:11,textTransform:'uppercase',letterSpacing:'.1em',color:'var(--teal-dark)',marginBottom:4}}>{b.tag}</div>
                    <div style={{fontFamily:headF,fontSize:18,lineHeight:1.3,letterSpacing:'-0.01em'}}>{b.title}</div>
                  </div>
                  <span style={{fontSize:12,fontFamily:"'JetBrains Mono',monospace",opacity:.5}}>{b.read}</span>
                </div>
              ))}
            </div>
            <div style={{marginTop:24,fontSize:12,fontFamily:"'JetBrains Mono',monospace",color:'var(--ink-60)',opacity:.6}}>— Listado stock para demo</div>
          </div>
        </div>
      )}
    </section>
  );
}

// --- CONTACT / HOURS / MAP ---
function ContactSection({ theme, headingFont, pad, showDecor, variant }) {
  const isDark=theme==='dark';
  const headF = headingFont==='archivo' ? "'Archivo Black',sans-serif" : headingFont==='playfair'?"'Playfair Display',serif":"'Space Grotesk',sans-serif";
  return (
    <section id="contacto" style={{padding:`${pad} 48px`, background:'var(--pink)', color:'var(--ink)', position:'relative', overflow:'hidden'}}>
      {showDecor && (
        <div style={{position:'absolute',bottom:-160,left:-160,width:420,height:420,borderRadius:'50%',background:'var(--ink)',opacity:.08,zIndex:0}}/>
      )}
      <div style={{maxWidth:1400, margin:'0 auto', position:'relative', zIndex:1}}>
        <SectionHeader eyebrow="/ contacto" title="Parte por agendar una conversación." subtitle="Encuentra aquí nuestra dirección, teléfono y correo para contactarnos de forma rápida y sencilla." theme="light" headingFont={headingFont}/>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,marginTop:56}}>
          {/* form */}
          <div style={{background:'var(--ink)',color:'var(--pink-100)',borderRadius:24,padding:40}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--teal)',marginBottom:24}}>Escríbenos →</div>
            <h3 style={{fontFamily:headF,fontSize:32,color:'#fff',margin:'0 0 28px',letterSpacing:'-0.02em'}}>Cuéntanos qué necesitas.</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <input placeholder="Nombre" style={inpStyle}/>
              <input placeholder="Teléfono" style={inpStyle}/>
            </div>
            <input placeholder="Email" style={{...inpStyle,width:'100%',marginTop:14}}/>
            <select style={{...inpStyle,width:'100%',marginTop:14}}>
              <option>¿Qué servicio te interesa?</option>
              {SERVICES.map(s=><option key={s.id}>{s.title}</option>)}
            </select>
            <textarea placeholder="Cuéntanos un poco" rows={4} style={{...inpStyle,width:'100%',marginTop:14,resize:'none',fontFamily:'inherit'}}/>
            <button onClick={(e)=>{e.preventDefault();alert('Formulario demo — en producción conectaremos este envío por correo o a tu CRM favorito. Mientras tanto, escríbenos por WhatsApp y te respondemos al toque.');}} style={{marginTop:20,width:'100%',padding:'16px 24px',borderRadius:999,background:'var(--teal)',color:'var(--ink)',fontFamily:"'Jost',sans-serif",fontWeight:600,fontSize:15}}>Enviar mensaje →</button>
            <div style={{marginTop:12,fontSize:11,color:'rgba(230,198,199,.55)',fontFamily:"'JetBrains Mono',monospace",textAlign:'center'}}>Demo · conectar email/CRM al pasar a producción</div>
          </div>

          {/* info */}
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <InfoCard icon="assets/icon-location.png" label="Dirección" lines={[BRAND.address, BRAND.region]}/>
            <InfoCard icon="assets/icon-phone.png" label="Teléfono" lines={[BRAND.phone, 'WhatsApp 24/7']}/>
            <InfoCard icon="assets/icon-clock.png" label="Horarios" lines={BRAND.hours.map(h=>`${h[0]} · ${h[1]}`)}/>
            <InfoCard icon="assets/icon-support.png" label="Email & IG" lines={[BRAND.email, `@${BRAND.instagram}`]}/>
          </div>
        </div>

        {/* map placeholder */}
        <div style={{marginTop:24,borderRadius:24,overflow:'hidden',height:380,position:'relative',boxShadow:'0 20px 60px rgba(26,24,35,.15)'}}>
          <iframe
            src="https://www.google.com/maps?q=-33.753589,-70.902940&hl=es&z=16&output=embed"
            style={{width:'100%',height:'100%',border:0}}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Moment · Isla de Maipo"
          />
          <a href="https://maps.app.goo.gl/9SdguuCr2wLYyhTT6" target="_blank" style={{position:'absolute',bottom:20,right:20,background:'var(--pink)',padding:'12px 20px',borderRadius:999,fontFamily:"'Jost',sans-serif",fontSize:13,fontWeight:600,color:'var(--ink)',textDecoration:'none',boxShadow:'0 8px 20px rgba(0,0,0,.15)'}}>Cómo llegar →</a>
        </div>
      </div>
    </section>
  );
}

const inpStyle = {
  padding:'14px 16px',
  background:'rgba(255,255,255,.06)',
  border:'1px solid rgba(230,198,199,.15)',
  borderRadius:10,
  color:'#fff',
  fontSize:14,
  fontFamily:"'Jost',sans-serif",
  outline:'none',
};

function InfoCard({ icon, label, lines }) {
  return (
    <div style={{background:'rgba(255,255,255,.5)',backdropFilter:'blur(10px)',borderRadius:20,padding:24,display:'flex',gap:20,alignItems:'flex-start',border:'1px solid rgba(26,24,35,.08)'}}>
      <img src={icon} style={{width:56,height:56,objectFit:'contain',flexShrink:0}}/>
      <div>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--ink-60)',marginBottom:8}}>{label}</div>
        {lines.map((l,i)=><div key={i} style={{fontFamily:"'Jost',sans-serif",fontSize:15,lineHeight:1.4,color:'var(--ink)',marginBottom:2}}>{l}</div>)}
      </div>
    </div>
  );
}

Object.assign(window, {
  DirectionEditorial, PricingSection, GallerySection, TeamSection, BlogSection, ContactSection, InfoCard
});
