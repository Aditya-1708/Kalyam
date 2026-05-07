import { useMemo, useState } from "react";
import {
    FaBars,
    FaChevronDown,
    FaEnvelope,
    FaLock,
    FaPhoneAlt,
    FaTimes,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useSecretEntrance } from "../hooks/useSecretEntrance";
import { formatTelLink } from "../utils/format";

// ✅ Moved outside component — stable, no need to recompute on every render
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const navLinks = [
  { name: "Home", path: "/", end: true },
  { name: "About", path: "/about" },
  {
    name: "Products",
    dropdown: [
      { name: "Human", path: "/products/human" },
      { name: "Veterinary", path: "/products/veterinary" },
    ],
  },
  { name: "Hiring", path: "/hiring" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isSecretUnlocked = useSecretEntrance();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const email = import.meta.env.VITE_EMAIL;
  const phone = import.meta.env.VITE_PHONE;

  // ✅ Memoized so it doesn't recompute on every render
  const emailLink = useMemo(
    () =>
      isMobile
        ? `mailto:${email}`
        : `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Inquiry`,
    [email],
  );

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] py-4 sm:py-5 px-4 sm:px-6 md:px-10 flex justify-between items-center bg-[#fafcfb]/85 backdrop-blur-md border-b border-border">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={closeMobileMenu}
        >
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-12 bg-white rounded p-1"
          />
          <div className="font-serif text-[1.3rem] text-primary font-bold hidden sm:block">
            Kalyam Pharma<span className="text-secondary">.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-6 items-center">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group">
              {link.dropdown ? (
                <>
                  <span className="flex items-center gap-1 cursor-pointer text-sm font-medium text-muted hover:text-primary transition">
                    {link.name}
                    <FaChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
                  </span>

                  <div className="absolute top-full left-0 mt-2 w-44 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {link.dropdown.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm hover:bg-gray-100 transition ${
                            isActive
                              ? "text-primary font-semibold"
                              : "text-muted"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                // ✅ Added active styling to desktop NavLinks
                <NavLink
                  to={link.path}
                  end={link.end}
                  className={({ isActive }) =>
                    `text-sm font-medium transition ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted hover:text-primary"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Right Buttons */}
        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          {/* Secret Admin Entrance */}
          {isSecretUnlocked && (
            <Link
              to="/admin/login"
              title="Admin Portal"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition animate-pulse"
            >
              <FaLock className="w-4 h-4" />
            </Link>
          )}

          {/* Email */}
          <a
            href={emailLink}
            target={!isMobile ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition"
          >
            <FaEnvelope className="w-4 h-4" />
          </a>

          {/* Call */}
          <a
            href={formatTelLink(phone)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition"
          >
            <FaPhoneAlt className="w-4 h-4" />
            <span className="hidden sm:inline">Call Now</span>
          </a>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[120] bg-white pt-24 px-6 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        {/* ✅ Close button inside mobile menu */}
        <button
          className="absolute top-5 right-6 p-2 text-xl"
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          <FaTimes />
        </button>

        <ul className="flex flex-col gap-6 text-center mt-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.dropdown ? (
                <div className="flex flex-col gap-2">
                  {/* ✅ Dropdown label styled consistently */}
                  <div className="text-xl font-medium text-muted">
                    {link.name}
                  </div>
                  <div className="flex flex-col gap-1 pl-4">
                    {link.dropdown.map((item) => (
                      // ✅ Added missing closeMobileMenu on dropdown items
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          `text-base py-1 transition ${
                            isActive
                              ? "text-primary font-semibold"
                              : "text-muted hover:text-primary"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  to={link.path}
                  end={link.end}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `text-xl font-medium transition ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted hover:text-primary"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
