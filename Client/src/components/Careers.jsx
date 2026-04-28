import React from 'react';
import Reveal from './Reveal';
import { FaBriefcase, FaExternalLinkAlt } from 'react-icons/fa';

const Careers = () => {
  return (
    <section id="careers" className="bg-bg py-14 sm:py-16 lg:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center max-w-[600px] mx-auto mb-14">
          <Reveal>
            <p className="section-label">Join Our Team</p>
          </Reveal>

          <Reveal delayClass="delay-100">
            <h2 className="section-title">Careers</h2>
          </Reveal>

          <Reveal delayClass="delay-200">
            <div className="divider mx-auto mt-5"></div>
          </Reveal>

          <Reveal delayClass="delay-200">
            <p className="section-sub mx-auto">
              We are always looking for passionate individuals to help us build the future of healthcare.
            </p>
          </Reveal>
        </div>

        {/* COMPACT CARD */}
        <div className="max-w-xl mx-auto">
          <Reveal delayClass="delay-300">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">

              {/* Icon */}
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                <FaBriefcase className="w-6 h-6" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2">
                Apply for a Position
              </h3>

              {/* Description */}
              <p className="text-gray-500 mb-6">
                Submit your application through our secure Google Form. Resume upload is supported.
              </p>

              {/* CTA Button */}
              <a
                href={import.meta.env.VITE_CAREER_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
              >
                Apply Now
                <FaExternalLinkAlt className="w-4 h-4" />
              </a>

              {/* Note */}
              <p className="text-xs text-gray-400 mt-4">
                * Google login may be required for file upload
              </p>

            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default Careers;
