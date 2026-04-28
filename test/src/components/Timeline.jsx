import React from 'react';
import Reveal from './Reveal';

const Timeline = () => {
  const events = [
    {
      year: '2004',
      title: 'Foundation',
      description: 'Kalyam Pharma was established with a focus on high-quality veterinary formulations.'
    },
    {
      year: '2008',
      title: 'Manufacturing Excellence',
      description: 'Inaugurated our first state-of-the-art manufacturing facility complying with GMP standards.'
    },
    {
      year: '2012',
      title: 'Market Expansion',
      description: 'Expanded operations to over 15 states in India, becoming a trusted name in veterinary healthcare.'
    },
    {
      year: '2016',
      title: 'Human Healthcare Division',
      description: 'Launched our dedicated division for human pharmaceutical solutions, bringing the same quality standards to patient care.'
    },
    {
      year: '2020',
      title: 'Innovation Hub',
      description: 'Established a centralized R&D center for advanced drug delivery systems and next-gen formulations.'
    },
    {
      year: '2024',
      title: 'Nationwide Leader',
      description: 'Celebrating 20 years of excellence with a presence across all 29 Indian states.'
    }
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Reveal>
            <p className="section-label">Our Journey</p>
          </Reveal>
          <Reveal delayClass="delay-100">
            <h2 className="section-title">Milestones of Excellence</h2>
          </Reveal>
          <Reveal delayClass="delay-200">
            <div className="divider mx-auto mt-5"></div>
          </Reveal>
        </div>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 hidden md:block"></div>
          
          <div className="space-y-16">
            {events.map((event, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full md:w-1/2 px-4 md:px-12">
                  <Reveal delayClass={`delay-${i * 100}`}>
                    <div className={`p-8 rounded-2xl border border-border bg-bg hover:border-primary transition-all duration-300 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                      <span className="text-primary font-bold text-2xl mb-2 block">{event.year}</span>
                      <h3 className="text-xl font-bold text-ink mb-4">{event.title}</h3>
                      <p className="text-muted leading-relaxed">{event.description}</p>
                    </div>
                  </Reveal>
                </div>
                
                {/* Dot */}
                <div className="w-12 h-12 rounded-full bg-primary border-4 border-white shadow-xl z-10 flex items-center justify-center my-6 md:my-0">
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                </div>
                
                <div className="flex-1 w-full md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
