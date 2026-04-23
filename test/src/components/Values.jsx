import React from 'react';
import Reveal from './Reveal';
import { FaCheckCircle, FaBolt, FaShieldAlt, FaHeart } from 'react-icons/fa';

const Values = () => {
  const values = [
    {
      title: "Integrity",
      desc: "Uncompromising adherence to ethical protocols and pharmaceutical transparency in every formulation we produce.",
      icon: <FaCheckCircle className="w-[22px] h-[22px] text-[#2E7D32]" />,
      delay: ""
    },
    {
      title: "Innovation",
      desc: "Continual investment in research methodologies to drive therapeutic breakthroughs and next-generation formulations.",
      icon: <FaBolt className="w-[22px] h-[22px] text-[#2E7D32]" />,
      delay: "delay-100"
    },
    {
      title: "Quality Matrix",
      desc: "Zero-tolerance policy for substandard materials through stringent ISO verification and ongoing batch testing.",
      icon: <FaShieldAlt className="w-[22px] h-[22px] text-[#2E7D32]" />,
      delay: "delay-200"
    },
    {
      title: "Compassion",
      desc: "Viewing every dose as a vital component in improving quality of life, one patient at a time.",
      icon: <FaHeart className="w-[22px] h-[22px] text-[#2E7D32]" />,
      delay: "delay-300"
    }
  ];

  return (
    <section id="values" className="bg-bg py-16 lg:py-24 max-sm:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-[600px] mx-auto">
          <Reveal><p className="section-label">Guiding Principles</p></Reveal>
          <Reveal delayClass="delay-100"><h2 className="section-title">Our Core Values</h2></Reveal>
          <Reveal delayClass="delay-200"><div className="divider mx-auto mt-5"></div></Reveal>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {values.map((val, i) => (
            <Reveal key={i} delayClass={val.delay}>
              <div className="py-8 px-6 rounded-2xl border border-border bg-white text-center transition-all duration-300 relative overflow-hidden group hover:border-emerald hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(46,125,50,0.12)] cursor-default h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-light to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"></div>
                <div className="w-[52px] h-[52px] rounded-xl bg-emerald-light flex items-center justify-center mx-auto mb-5 relative z-10">
                  {val.icon}
                </div>
                <h4 className="font-serif text-[1.125rem] font-bold text-ink mb-2.5 relative z-10">{val.title}</h4>
                <p className="text-[0.875rem] text-muted leading-[1.65] relative z-10">{val.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
