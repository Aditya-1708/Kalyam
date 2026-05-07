import { useEffect, useRef, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import WhatsApp from './components/WhatsApp';
import { AuthProvider } from './context/AuthContext';

// Components
import HumanProducts from './components/HumanProducts';
import VeterinaryProducts from './components/VeterinaryProducts';

// Pages
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Products from './pages/Products';

function MainLayout() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isInitialLoad = useRef(true);

  // Hide navbar and footer on admin pages
  const isAdminPage = location.pathname.startsWith('/admin');

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
      {!isAdminPage && <ScrollToTop />}
      {!isAdminPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/human" element={<HumanProducts />} />
          <Route path="/products/veterinary" element={<VeterinaryProducts />} />
          <Route path="/hiring" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/panel"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isAdminPage && <WhatsApp />}
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </Router>
  );
}

export default App;
