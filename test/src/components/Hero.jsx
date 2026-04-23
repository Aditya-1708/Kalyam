import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCounter } from '../hooks/useCounter';
import { FaCheck, FaCheckCircle, FaFlask } from 'react-icons/fa';

const StatItem = ({ num, suffix, label }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
  const count = useCounter(num, isVisible, 1500);

  return (
    <div ref={ref} className="border-l-2 border-gold pl-4">
      <span className="font-serif text-[2rem] font-bold text-emerald block leading-none">
        {count}{suffix}
      </span>
      <span className="text-xs text-muted uppercase tracking-[0.06em] mt-1 block">
        {label}
      </span>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center pt-28 pb-16 px-6 lg:px-8 max-w-7xl mx-auto gap-16 relative overflow-hidden max-md:text-center max-md:pt-24 max-sm:pt-22 max-sm:px-6 max-sm:pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_60%_50%,rgba(46,125,50,0.07)_0%,transparent_70%)] pointer-events-none -z-10"></div>
      
      <div>
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold tracking-[0.08em] uppercase py-1.5 px-4 rounded-full mb-6 border border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span>Human & Veterinary Medicines</span>
        </div>
        <div className="mb-4">
          <img src="/images/logo.png" alt="Kalyam Pharma Logo" className="h-[70px] w-auto mix-blend-multiply bg-white rounded p-1" />
        </div>
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] text-ink mb-6 font-bold mt-4">
          Kalyam Pharma
        </h1>
        <p className="text-[1.0625rem] text-muted leading-[1.75] mb-8 max-w-[500px] max-md:mx-auto">
          Trusted Healthcare Solutions for Humans &amp; Animals
        </p>
        <div className="flex flex-col gap-4 mb-10 max-w-[500px] max-md:mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <FaCheck className="w-4 h-4" />
            </div>
            <div className="text-ink font-medium">Human Medicines</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
              <FaCheck className="w-4 h-4" />
            </div>
            <div className="text-ink font-medium">Veterinary Medicines (Animal Healthcare)</div>
          </div>
        </div>
        <div className="flex gap-8 max-md:justify-center">
          <StatItem num={29} suffix="+" label="States Covered" />
          <StatItem num={500} suffix="+" label="Distributors" />
          <StatItem num={20} suffix="+" label="Years Research" />
        </div>
      </div>

      <div className="relative flex justify-center items-center max-md:hidden">
        <div className="w-full max-w-[560px] rounded-2xl overflow-hidden relative aspect-[3/4] shadow-[0_32px_80px_rgba(46,125,50,0.15)]">
          <img src="/images/product-sky.jpg" alt="Yuzy Vita Vitamin Supplement" className="w-full h-full object-cover" />
        </div>
        
        <div className="absolute bg-white border border-border rounded-xl py-3.5 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center gap-3 text-[0.8125rem] font-medium -bottom-4 -left-8 animate-float">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-light">
            <FaCheckCircle className="w-[18px] h-[18px] text-[#2E7D32]" />
          </div>
          <div>
            <div className="font-semibold text-ink leading-[1.2]">GMP Certified</div>
            <div className="text-[0.7rem] text-muted">ISO Verified Manufacturing</div>
          </div>
        </div>

        <div className="absolute bg-white border border-border rounded-xl py-3.5 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center gap-3 text-[0.8125rem] font-medium top-6 -right-8 animate-float" style={{ animationDelay: '0.7s'}}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gold-light">
            <FaFlask className="w-[18px] h-[18px] text-[#1565C0]" />
          </div>
          <div>
            <div className="font-semibold text-ink leading-[1.2]">R&amp;D Pipeline</div>
            <div className="text-[0.7rem] text-muted">12 Active Formulations</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
