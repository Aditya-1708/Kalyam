import React from 'react';
import Reveal from './Reveal';

const Global = () => {
  return (
    <section className="py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <p className="section-label">Our Presence</p>
            </Reveal>
            <Reveal delayClass="delay-100">
              <h2 className="section-title">Nationwide Distribution Network</h2>
            </Reveal>
            <Reveal delayClass="delay-200">
              <div className="divider"></div>
            </Reveal>
            <Reveal delayClass="delay-300">
              <p className="text-muted text-lg mb-8">
                With a robust supply chain and distribution network, Kalyam Pharma ensures that high-quality medicines are accessible across 29 states in India. Our commitment to timely delivery and quality maintenance remains unwavering.
              </p>
            </Reveal>
            
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: 'Major Cities', value: '100+' },
                { label: 'Distributors', value: '500+' },
                { label: 'Healthcare Partners', value: '1000+' },
                { label: 'Retail Outlets', value: '5000+' },
              ].map((stat, i) => (
                <Reveal key={i} delayClass={`delay-${(i + 1) * 100}`}>
                  <div className="p-4 border-l-4 border-primary bg-primary/5">
                    <div className="text-2xl font-bold text-ink">{stat.value}</div>
                    <div className="text-sm text-muted uppercase tracking-wider">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <Reveal delayClass="delay-400">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=1000" 
                  alt="Global Presence" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </Reveal>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Global;
