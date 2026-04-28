
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { formatWhatsAppLink } from '../utils/format';

const WhatsApp = () => {
  return (
    <a
      href={formatWhatsAppLink(import.meta.env.VITE_PHONE, import.meta.env.VITE_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#20bd5a] transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-7 h-7" />
    </a>
  );
};

export default WhatsApp;
