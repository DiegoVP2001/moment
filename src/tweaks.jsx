// ============ TWEAKS PANEL ============
function TweaksPanel({ tweaks, setTweak, onClose }) {
  const Row = ({ label, children }) => (
    <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:18}}>
      <div style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace",letterSpacing:'.14em',textTransform:'uppercase',color:'rgba(255,255,255,.55)'}}>{label}</div>
      {children}
    </div>
  );
  const Pills = ({ value, options, onChange }) => (
    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
      {options.map(o=>(
        <button key={o.v} onClick={()=>onChange(o.v)} style={{
          padding:'7px 12px',borderRadius:999,fontSize:12,fontFamily:"'Jost',sans-serif",fontWeight:500,
          background: value===o.v ? 'var(--pink)' : 'rgba(255,255,255,.08)',
          color: value===o.v ? 'var(--ink)' : '#fff',
          border: value===o.v ? '1px solid var(--pink)' : '1px solid rgba(255,255,255,.12)'
        }}>{o.l}</button>
      ))}
    </div>
  );
  return (
    <div style={{
      position:'fixed',right:22,bottom:92,zIndex:100,
      width:300,background:'rgba(15,13,23,.92)',backdropFilter:'blur(18px)',
      color:'#fff',borderRadius:20,padding:22,
      border:'1px solid rgba(230,198,199,.18)',
      boxShadow:'0 20px 60px rgba(0,0,0,.4)',
      fontFamily:"'Inter',sans-serif"
    }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
        <div style={{fontFamily:"'Archivo Black',sans-serif",fontSize:16,letterSpacing:'-0.01em'}}>TWEAKS</div>
        <button onClick={onClose} style={{color:'rgba(255,255,255,.6)',fontSize:18,width:24,height:24}}>×</button>
      </div>

      <Row label="Dirección">
        <Pills value={tweaks.direction} onChange={v=>setTweak('direction',v)} options={[
          {v:'editorial',l:'Editorial'},
          {v:'sport',l:'Sport'},
          {v:'showcase',l:'Showcase'},
        ]}/>
      </Row>
      <Row label="Fondo">
        <Pills value={tweaks.theme} onChange={v=>setTweak('theme',v)} options={[
          {v:'light',l:'Claro (pink)'},{v:'dark',l:'Oscuro (eigengrau)'}
        ]}/>
      </Row>
      <Row label="Densidad">
        <Pills value={tweaks.density} onChange={v=>setTweak('density',v)} options={[
          {v:'compact',l:'Compacto'},{v:'normal',l:'Normal'},{v:'amplio',l:'Amplio'}
        ]}/>
      </Row>
      <Row label="Tipografía titulares">
        <Pills value={tweaks.headingFont} onChange={v=>setTweak('headingFont',v)} options={[
          {v:'archivo',l:'Archivo Black'},{v:'playfair',l:'Playfair'},{v:'jost',l:'Jost'},{v:'space',l:'Space Grotesk'}
        ]}/>
      </Row>
      <Row label="Layout de servicios">
        <Pills value={tweaks.servicesLayout} onChange={v=>setTweak('servicesLayout',v)} options={[
          {v:'grid',l:'Grid / List'},{v:'cards',l:'Cards'},{v:'tabs',l:'Tabs'}
        ]}/>
      </Row>
      <Row label="Decoración geométrica">
        <Pills value={String(tweaks.showDecor)} onChange={v=>setTweak('showDecor', v==='true')} options={[
          {v:'true',l:'Visible'},{v:'false',l:'Oculta'}
        ]}/>
      </Row>

      <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid rgba(255,255,255,.08)',fontSize:11,color:'rgba(255,255,255,.45)',fontFamily:"'JetBrains Mono',monospace",lineHeight:1.5}}>
        Los cambios persisten al recargar.
      </div>
    </div>
  );
}

function TweakToggleButton({ onClick }) {
  return (
    <button onClick={onClick} style={{
      position:'fixed',right:22,bottom:92,zIndex:99,
      width:56,height:56,borderRadius:'50%',
      background:'var(--ink)',color:'var(--pink)',
      boxShadow:'0 10px 30px rgba(0,0,0,.25)',
      display:'flex',alignItems:'center',justifyContent:'center',
      fontFamily:"'Archivo Black',sans-serif",fontSize:11,letterSpacing:'.1em'
    }} aria-label="Open tweaks">TW</button>
  );
}

Object.assign(window, { TweaksPanel, TweakToggleButton });
