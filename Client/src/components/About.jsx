import { FaBolt, FaGlobe, FaLock } from 'react-icons/fa';
import Leadership from './Leadership';
import Reveal from './Reveal';

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
              <p className="section-sub"><span className="font-semibold text-secondary">Kalyam Pharma</span> is a trusted third-party pharmaceutical company established on April 8, 2024.</p>
            </Reveal>
            <div className="mt-8">
              <img src="/images/about.jpeg" alt="Quality Pharmaceutical Solutions" className="w-full rounded-2xl object-cover aspect-[3/4]" />
            </div>
          </div>
          
          <div className="md:col-span-2 flex flex-col gap-10">
            <Reveal>
              <div className="p-7 rounded-2xl border border-border bg-bg transition-all duration-300 hover:border-emerald hover:shadow-[0_4px_24px_rgba(46,125,50,0.1)] hover:-translate-y-0.5 cursor-default">
                <div className="w-10 h-10 rounded-lg bg-emerald-light flex items-center justify-center mb-4">
                  <FaBolt className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <h4 className="font-serif text-[1.1875rem] font-bold text-ink mb-2.5">Our Mission</h4>
                <p className="text-[0.9375rem] text-muted leading-[1.7]">To deliver high-quality and affordable medicines to every corner of the country, ensuring better healthcare access for all through consistent innovation and excellence.</p>
              </div>
            </Reveal>
            
            <Reveal delayClass="delay-100">
              <div className="p-7 rounded-2xl border border-border bg-bg transition-all duration-300 hover:border-emerald hover:shadow-[0_4px_24px_rgba(46,125,50,0.1)] hover:-translate-y-0.5 cursor-default">
                <div className="w-10 h-10 rounded-lg bg-emerald-light flex items-center justify-center mb-4">
                  <FaGlobe className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <h4 className="font-serif text-[1.1875rem] font-bold text-ink mb-2.5">Our Presence</h4>
                <p className="text-[0.9375rem] text-muted leading-[1.7]">With a strong and expanding distribution network, we currently supply our pharmaceutical products across all 28 states of India. We are committed to maintaining the highest quality standards and ensuring timely delivery.</p>
              </div>
            </Reveal>
            
            <Reveal delayClass="delay-200">
              <div className="p-7 rounded-2xl border border-border bg-bg transition-all duration-300 hover:border-emerald hover:shadow-[0_4px_24px_rgba(46,125,50,0.1)] hover:-translate-y-0.5 cursor-default">
                <div className="w-10 h-10 rounded-lg bg-emerald-light flex items-center justify-center mb-4">
                  <FaLock className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <h4 className="font-serif text-[1.1875rem] font-bold text-ink mb-2.5">Our Philosophy</h4>
                <p className="text-[0.9375rem] text-muted leading-[1.7]">At Kalyam Pharma, we believe in building long-term relationships with our partners and clients through trust, reliability, and consistent performance in the healthcare industry.</p>
              </div>
            </Reveal>
          </div>
        </div>
        <Leadership />
      </div>
    </section>
  );
};

export default About;
