import React, { useState } from 'react';
import Reveal from './Reveal';
import { FaTimes } from 'react-icons/fa';

const Certification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="certification" className="bg-bg py-14 sm:py-16 lg:py-24 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <Reveal><p className="section-label">Trust & Compliance</p></Reveal>
            <Reveal delayClass="delay-100"><h2 className="section-title">Our Certification</h2></Reveal>
            <Reveal delayClass="delay-200"><div className="divider mx-auto mt-5"></div></Reveal>
            <Reveal delayClass="delay-200">
              <p className="section-sub mx-auto">
                Officially registered and recognized pharmaceutical company.
              </p>
            </Reveal>
          </div>

          <Reveal delayClass="delay-100">
            <div 
              className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-border max-w-[700px] mx-auto cursor-pointer p-2"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src="/images/Certificate.jpg" 
                alt="Kalyam Pharma Certificate" 
                loading="lazy"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02] rounded-xl" 
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-300 flex items-center justify-center rounded-xl">
                <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-ink font-semibold px-4 py-2 rounded-lg shadow-sm transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  View Full Certificate
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4 sm:p-8" onClick={() => setIsModalOpen(false)}>
          <div className="relative max-w-4xl w-full max-h-full flex flex-col items-center animate-fadeIn" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute -top-10 right-0 sm:-right-10 text-white hover:text-gold transition-colors p-2"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <img 
              src="/images/Certificate.jpg" 
              alt="Kalyam Pharma Certificate" 
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl bg-white" 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Certification;
