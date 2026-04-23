import React, { useState } from 'react';
import Reveal from './Reveal';
import { FaTimes } from 'react-icons/fa';

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="products" className="bg-bg py-16 lg:py-24 max-sm:py-14 border-b border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <Reveal><p className="section-label">Our Spotlight</p></Reveal>
            <Reveal delayClass="delay-100"><h2 className="section-title">Our Products</h2></Reveal>
            <Reveal delayClass="delay-200"><div className="divider mx-auto mt-5"></div></Reveal>
            <Reveal delayClass="delay-200">
              <p className="section-sub mx-auto">
                Explore our wide range of pharmaceutical offerings.
              </p>
            </Reveal>
          </div>

          <Reveal delayClass="delay-100">
            <div 
              className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-border max-w-[900px] mx-auto cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src="/images/products.jpg" 
                alt="Kalyam Pharma Products" 
                loading="lazy"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]" 
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-ink font-semibold px-4 py-2 rounded-lg shadow-sm transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Click to enlarge
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4 sm:p-8" onClick={() => setIsModalOpen(false)}>
          <div className="relative max-w-5xl w-full max-h-full flex flex-col items-center animate-fadeIn" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute -top-10 right-0 sm:-right-10 text-white hover:text-gold transition-colors p-2"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <img 
              src="/images/products.jpg" 
              alt="Kalyam Pharma Products" 
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl" 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
