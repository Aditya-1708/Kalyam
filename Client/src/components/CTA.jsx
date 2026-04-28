import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const CTA = () => {
  return (
    <section className="py-14 sm:py-20 lg:py-32 bg-ink relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/20 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Ready to Partner with <span className="text-primary">Kalyam Pharma?</span>
          </h2>
        </Reveal>
        
        <Reveal delayClass="delay-100">
          <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Experience excellence in pharmaceutical manufacturing and supply. Join our growing network of healthcare partners across India.
          </p>
        </Reveal>
        
        <Reveal delayClass="delay-200">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/contact" 
              className="px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all transform hover:scale-105 shadow-xl shadow-primary/20"
            >
              Contact Us Now
            </Link>
            <Link 
              to="/services" 
              className="px-10 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              Explore Services
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTA;
