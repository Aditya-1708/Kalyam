import React from 'react';
import Reveal from './Reveal';

const Leadership = () => {
  const leaders = [
    {
      name: 'Dr. Ramesh Kumar',
      role: 'Founder & Managing Director',
      bio: 'With over 30 years of experience in the pharmaceutical industry, Dr. Kumar leads with vision and integrity.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Dr. Anjali Sharma',
      role: 'Director of R&D',
      bio: 'A veteran in drug formulation, Dr. Sharma oversees our scientific innovation and quality control systems.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Mr. Vivek Singh',
      role: 'Head of Manufacturing',
      bio: 'Ensuring our facilities meet global GMP standards through rigorous operational oversight.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-bg border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <Reveal>
            <p className="section-label">Our Leadership</p>
          </Reveal>
          <Reveal delayClass="delay-100">
            <h2 className="section-title">The Visionaries Behind Kalyam</h2>
          </Reveal>
          <Reveal delayClass="delay-200">
            <div className="divider mx-auto mt-5"></div>
          </Reveal>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {leaders.map((person, i) => (
            <Reveal key={i} delayClass={`delay-${i * 100}`}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-border group">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-ink mb-1">{person.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-4 uppercase tracking-wider">{person.role}</p>
                  <p className="text-muted text-sm leading-relaxed">{person.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
