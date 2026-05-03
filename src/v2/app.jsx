// ============ APP V2 ============
function App() {
  const theme = 'light';

  // Inject shared CSS
  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = SHARED_CSS;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  // Handle hash on load (React mounts async so browser loses the anchor scroll)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    let attempts = 0;
    const scroll = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (attempts++ < 20) {
        setTimeout(scroll, 80);
      }
    };
    setTimeout(scroll, 100);
  }, []);

  return (
    <>
      <Nav theme={theme}/>
      <HeroVideo theme={theme}/>
      <ServicesSection theme={theme}/>
      <CarouselSection theme={theme}/>
      <TeamSection theme={theme}/>
      <EnMediosSection theme={theme}/>
      <CalendarSection theme={theme}/>
      <ShopSection theme={theme}/>
      <JobsSection theme={theme}/>
      <ContactSection theme={theme}/>
      <Footer theme={theme}/>
      <FloatingContacts/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
