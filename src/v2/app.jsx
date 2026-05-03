// ============ APP V2 ============
function App() {
  const theme = 'light'; // can be toggled via tweaks later

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = SHARED_CSS;
    document.head.appendChild(el);
    return () => el.remove();
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
