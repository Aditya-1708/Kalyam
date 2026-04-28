import React from 'react';
import Reveal from './Reveal';
import { FaBolt, FaGlobe, FaClock } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="bg-white border-y border-border py-14 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 items-start">
          <div className="md:col-span-1 md:sticky md:top-28">
            <Reveal><p className="section-label">Who We Are</p></Reveal>
            <Reveal delayClass="delay-100"><h2 className="section-title">Our Corporate Journey</h2></Reveal>
            <Reveal delayClass="delay-200"><div className="divider"></div></Reveal>
            <Reveal delayClass="delay-200">
              <p className="section-sub"><span className="font-semibold text-secondary">Kalyam Pharma</span> is a premier Medicine Third Party Manufacturing Company providing high-quality pharmaceutical solutions for both human and veterinary healthcare. Founded on the conviction that animal health is inseparable from human health, Kalyam Pharma has spent decades building formulations that clinicians trust and patients—both humans and animals—respond to.</p>
            </Reveal>
            <div className="mt-8">
              <img src="/images/product-yellow.jpg" alt="KFD Vitamin C Plus" className="w-full rounded-2xl object-cover aspect-[3/4]" />
            </div>
          </div>
          
          <div className="md:col-span-2 flex flex-col gap-10">
            <Reveal>
              <div className="p-7 rounded-2xl border border-border bg-bg transition-all duration-300 hover:border-emerald hover:shadow-[0_4px_24px_rgba(46,125,50,0.1)] hover:-translate-y-0.5 cursor-default">
                <div className="w-10 h-10 rounded-lg bg-emerald-light flex items-center justify-center mb-4">
                  <FaBolt className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <h4 className="font-serif text-[1.1875rem] font-bold text-ink mb-2.5">Our Mission</h4>
                <p className="text-[0.9375rem] text-muted leading-[1.7]">To meticulously engineer high-performance veterinary supplements that address complex clinical challenges, empowering veterinarians and livestock producers to optimize animal health protocols globally.</p>
              </div>
            </Reveal>
            
            <Reveal delayClass="delay-100">
              <div className="p-7 rounded-2xl border border-border bg-bg transition-all duration-300 hover:border-emerald hover:shadow-[0_4px_24px_rgba(46,125,50,0.1)] hover:-translate-y-0.5 cursor-default">
                <div className="w-10 h-10 rounded-lg bg-emerald-light flex items-center justify-center mb-4">
                  <FaGlobe className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <h4 className="font-serif text-[1.1875rem] font-bold text-ink mb-2.5">Our Vision</h4>
                <p className="text-[0.9375rem] text-muted leading-[1.7]">To be the universally recognized leader in specialized animal nutrition, setting the global benchmark for safety, purity, and clinical outcomes across both livestock and companion animal categories.</p>
              </div>
            </Reveal>
            
            <Reveal delayClass="delay-200">
              <div className="p-7 rounded-2xl border border-border bg-bg transition-all duration-300 hover:border-emerald hover:shadow-[0_4px_24px_rgba(46,125,50,0.1)] hover:-translate-y-0.5 cursor-default">
                <div className="w-10 h-10 rounded-lg bg-emerald-light flex items-center justify-center mb-4">
                  <FaClock className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <h4 className="font-serif text-[1.1875rem] font-bold text-ink mb-2.5">Our History</h4>
                <p className="text-[0.9375rem] text-muted leading-[1.7]">Established with a foundational commitment to scientific rigor, Kalyam originated by identifying critical nutritional gaps within domestic livestock environments. Over the years, we scaled our state-of-the-art manufacturing infrastructure and expanded into companion animal care, becoming a trusted name across India's veterinary community.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
