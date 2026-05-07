import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaEnvelope, FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa';
import { formatTelLink, formatEmailLink, formatGmailComposeLink } from '../utils/format';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/', end: true },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] py-4 sm:py-5 px-4 sm:px-6 md:px-10 flex justify-between items-center bg-[#fafcfb]/85 backdrop-blur-md border-b border-border transition-all duration-300">
        <Link to="/" className="flex items-center gap-3 no-underline" onClick={closeMobileMenu}>
          <img src="/images/logo.png" alt="Kalyam Pharma Logo" className="h-12 w-auto object-contain bg-white rounded p-1 shadow-sm" />
          <div className="font-serif text-[1.3rem] text-primary font-bold tracking-tight hidden sm:block">
            Kalyam Pharma<span className="text-secondary">.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-6 list-none items-center m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                end={link.end}
                className={({ isActive }) => `no-underline text-sm font-medium transition-colors duration-200 hover:text-primary ${isActive ? 'text-primary font-semibold' : 'text-muted'}`}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">

          {/* Email Button (fixed styling) */}
          <a
            href={formatGmailComposeLink(import.meta.env.VITE_EMAIL, 'Inquiry')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-all duration-200"
            aria-label="Email Us"
          >
            <FaEnvelope className="w-4 h-4" />
          </a>

          {/* Call Button */}
          <a
            href={formatTelLink(import.meta.env.VITE_PHONE)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-all duration-200 shadow-sm"
          >
            <FaPhoneAlt className="w-4 h-4" />
            <span className="hidden sm:inline">Call Now</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-primary p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>

        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`fixed inset-0 z-[90] bg-[#fafcfb] pt-24 pb-6 px-6 flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <ul className="flex flex-col gap-6 list-none m-0 p-0 text-center mt-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                end={link.end}
                onClick={closeMobileMenu}
                className={({ isActive }) => `block text-2xl font-medium transition-colors duration-200 hover:text-primary ${isActive ? 'text-primary font-bold' : 'text-ink'}`}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-4">
          <a href={formatEmailLink(import.meta.env.VITE_EMAIL)} className="flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-secondary/10 text-secondary font-medium" onClick={closeMobileMenu}>
            <FaEnvelope className="w-5 h-5" />
            Email Us
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
