import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';
import Reveal from './Reveal';

const Contact = () => {
  return (
    <section id="contact" className="bg-white py-16 lg:py-24 max-sm:py-14 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* LEFT SIDE - CONTACT INFO */}
          <div>
            <Reveal>
              <p className="section-label">Get in Touch</p>
            </Reveal>

            <Reveal delayClass="delay-100">
              <h2 className="section-title">Contact Us</h2>
            </Reveal>

            <Reveal delayClass="delay-200">
              <div className="divider"></div>
            </Reveal>

            <Reveal delayClass="delay-200">
              <p className="section-sub mb-8">
                We are a leading <strong>Medicine Third Party Manufacturing Company</strong>. Contact us for any inquiries regarding our pharmaceutical solutions for human and veterinary healthcare.
              </p>

              <div className="flex flex-col gap-6">

                {/* CALL */}
                <a
                  href="tel:+917379524088"
                  className="flex items-center gap-4 group p-4 rounded-xl border border-border hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">

                    <FaPhone className="w-5 h-5" />

                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink uppercase tracking-wider mb-1">
                      Call Us
                    </div>
                    <div className="text-lg font-medium text-primary">
                      +91 7379524088
                    </div>
                  </div>
                </a>

                {/* EMAIL */}
                <a
                  href="mailto:Kalyampharmaprivatelimited88@gmail.com"
                  className="flex items-center gap-4 group p-4 rounded-xl border border-border hover:border-secondary hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">

                    <FaEnvelope className="w-5 h-5" />

                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink uppercase tracking-wider mb-1">
                      Email Us
                    </div>
                    <div className="text-lg font-medium text-secondary">
                      Kalyampharmaprivatelimited88@gmail.com
                    </div>
                  </div>
                </a>

                {/* CORPORATE OFFICE */}
                <div className="flex items-start gap-4 group p-4 rounded-xl border border-border hover:border-primary hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink uppercase tracking-wider mb-1">
                      Corporate Office
                    </div>
                    <div className="text-sm font-medium text-muted leading-relaxed">
                      529 KH NO. 14/19, 1st Floor, West Sant Nagar, Street 21, Burari, North Delhi - 110084, Delhi
                    </div>
                  </div>
                </div>

                {/* REGISTERED OFFICE */}
                <div className="flex items-start gap-4 group p-4 rounded-xl border border-border hover:border-secondary hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors shrink-0">
                    <FaBuilding className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink uppercase tracking-wider mb-1">
                      Registered Office
                    </div>
                    <div className="text-sm font-medium text-muted leading-relaxed">
                      KHATA NO 00285, ARZI NO 183, GRAM DAHIYA MUGHALSARI ALINAGAR, Dulhipur, Chandauli, Uttar Pradesh - 232104
                    </div>
                  </div>
                </div>

              </div>
            </Reveal>
          </div>

          <Reveal delayClass="delay-300">
            <div className="max-w-4xl mx-auto">

              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-white p-8 text-center">

                {/* Accent line */}
                <div className="h-1 w-20 mx-auto mb-6 bg-gradient-to-r from-green-600 to-orange-500 rounded-full"></div>

                <h3 className="text-2xl md:text-3xl font-bold text-ink mb-3">
                  Send a Message
                </h3>

                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Click the button below to fill out our contact form. Our team will respond to you shortly.
                </p>

                {/* CTA BUTTON */}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScOGqpxnFzXXpogbLXmryCwSzDqFcNGqScZnnWkku0FgXDydQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-105"
                >
                  Open Contact Form
                </a>

                {/* Optional helper text */}
                <p className="text-xs text-gray-400 mt-4">
                  Opens securely in a new tab
                </p>

              </div>

            </div>
          </Reveal>



        </div>
      </div>
    </section>
  );
};

export default Contact;