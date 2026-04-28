import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsApp from './components/WhatsApp';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

function MainLayout() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    setLoading(true);

    const timeoutDuration = isInitialLoad.current ? 3000 : 1500;
    isInitialLoad.current = false;

    const timer = setTimeout(() => {
      setLoading(false);
    }, timeoutDuration);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <WhatsApp />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
