import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { formatPhoneDisplay, formatTelLink, formatGmailComposeLink } from '../utils/format';

const Footer = () => {
  return (
    <footer className="bg-ink text-white/70 py-14 px-6 lg:px-8 border-t border-white/10">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img src="/images/logo.png" alt="Kalyam Pharma Logo" className="h-10 w-auto bg-white rounded p-1" />
            <div className="font-serif text-[1.4rem] font-bold text-white">
              Kalyam Pharma<span className="text-secondary">.</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed">
            Medicine Third Party Manufacturing company focused on reliable and quality healthcare solutions.
          </p>
        </div>

        {/* Navigation (REAL pages only) */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            Navigation
          </h3>

          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-secondary transition-colors">About</Link></li>
            <li><Link to="/services" className="hover:text-secondary transition-colors">Services</Link></li>
            <li><Link to="/careers" className="hover:text-secondary transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact (MATCH NAVBAR LOGIC) */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            Contact
          </h3>

          <ul className="space-y-4">

            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="w-5 h-5 text-primary mt-1" />
              <span>
                {import.meta.env.VITE_CORPORATE_OFFICE}
              </span>
            </li>

            {/* Email (Gmail compose like navbar) */}
            <li className="flex items-center gap-3">
              <FaEnvelope className="w-5 h-5 text-primary" />
              <a
                href={formatGmailComposeLink(import.meta.env.VITE_EMAIL, 'Inquiry')}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors break-all"
              >
                {import.meta.env.VITE_EMAIL}
              </a>
            </li>

            {/* Phone (same as navbar) */}
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="w-5 h-5 text-primary" />
              <a
                href={formatTelLink(import.meta.env.VITE_PHONE)}
                className="hover:text-secondary transition-colors"
              >
                {formatPhoneDisplay(import.meta.env.VITE_PHONE)}
              </a>
            </li>

          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex justify-center text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Kalyam Pharma. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;