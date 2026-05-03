// ============ APP ============
const { useState: useS, useEffect: useE } = React;

const DEFAULTS = JSON.parse(document.getElementById('tweak-defaults').textContent.match(/\{[\s\S]*\}/)[0]);

function App() {
  const [tweaks, setTweaks] = useS(()=>{
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem('moment-tweaks')||'{}') }; }
    catch { return DEFAULTS; }
  });
  const [editMode, setEditMode] = useS(false);
  const [panelOpen, setPanelOpen] = useS(false);

  const setTweak = (k,v) => {
    setTweaks(prev=>{
      const next = { ...prev, [k]: v };
      localStorage.setItem('moment-tweaks', JSON.stringify(next));
      try { window.parent.postMessage({type:'__edit_mode_set_keys', edits:{ [k]: v }}, '*'); } catch(e){}
      return next;
    });
  };

  useE(()=>{
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') { setEditMode(true); setPanelOpen(true); }
      else if (e.data?.type === '__deactivate_edit_mode') { setEditMode(false); setPanelOpen(false); }
    };
    window.addEventListener('message', handler);
    try { window.parent.postMessage({type:'__edit_mode_available'}, '*'); } catch(e){}
    return ()=>window.removeEventListener('message', handler);
  },[]);

  // inject shared CSS once
  useE(()=>{
    const el = document.createElement('style');
    el.textContent = SHARED_CSS;
    document.head.appendChild(el);
    return ()=>el.remove();
  },[]);

  const Direction = tweaks.direction === 'sport' ? DirectionSport
                  : tweaks.direction === 'showcase' ? DirectionShowcase
                  : DirectionEditorial;

  return (
    <>
      <Direction
        theme={tweaks.theme}
        density={tweaks.density}
        headingFont={tweaks.headingFont}
        servicesLayout={tweaks.servicesLayout}
        showDecor={tweaks.showDecor}
      />
      <WhatsAppFloat/>
      {editMode && (
        panelOpen
          ? <TweaksPanel tweaks={tweaks} setTweak={setTweak} onClose={()=>setPanelOpen(false)}/>
          : <TweakToggleButton onClick={()=>setPanelOpen(true)}/>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
