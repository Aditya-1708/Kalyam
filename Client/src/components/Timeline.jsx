import React from 'react';
import Reveal from './Reveal';

const Timeline = () => {
const events = [
{
year: 'April 8, 2024',
title: 'Company Foundation',
description:
'Official registration and the beginning of Kalyam Pharma’s journey in the pharmaceutical industry.'
},
{
year: 'Mid 2024',
title: 'Product Launch',
description:
'Commenced product launches through strategic third-party manufacturing partnerships.'
},
{
year: '2025',
title: 'Network Expansion',
description:
'Successfully expanded our distribution network, establishing a strong presence across multiple states.'
},
{
year: 'Present (2026)',
title: 'Nationwide Reach',
description:
'Supplying high-quality medicines across India while continuously scaling our distribution capabilities.'
},
{
year: 'Future Goal',
title: 'Global Vision',
description:
'Aiming to build a premier All-India brand and initiate international exports to serve global healthcare needs.'
}
];

return ( <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50"> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

```
    {/* Header */}
    <div className="text-center mb-24">
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

    {/* Timeline */}
    <div className="relative">

      {/* Gradient Line */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[3px] h-full bg-gradient-to-b from-primary via-emerald-400 to-transparent hidden md:block"></div>

      <div className="space-y-20">
        {events.map((event, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row items-center ${
              i % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >

            {/* Content */}
            <div className="flex-1 w-full md:w-1/2 px-4 md:px-12">
              <Reveal delayClass={`delay-${i * 100}`}>
                <div
                  className={`group relative p-8 rounded-2xl border border-border bg-white/70 backdrop-blur-md shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${
                    i % 2 === 0 ? 'md:text-right' : ''
                  }`}
                >
                  {/* Year Badge */}
                  <span className="inline-block px-4 py-1 mb-3 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                    {event.year}
                  </span>

                  <h3 className="text-xl font-bold text-ink mb-3 group-hover:text-primary transition">
                    {event.title}
                  </h3>

                  <p className="text-muted leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Timeline Dot */}
            <div className="relative flex items-center justify-center my-6 md:my-0">
              {/* Outer Pulse */}
              <div className="absolute w-14 h-14 rounded-full bg-primary/20 animate-ping"></div>

              {/* Core Dot */}
              <div className="w-12 h-12 rounded-full bg-primary border-4 border-white shadow-xl z-10 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>

            {/* Empty side */}
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
