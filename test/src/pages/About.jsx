import React from 'react';
import AboutSection from '../components/About';
import Timeline from '../components/Timeline';
import Leadership from '../components/Leadership';
import Values from '../components/Values';
import Certification from '../components/Certification';

const About = () => {
  return (
    <div className="page-transition pt-24">
      <AboutSection />
      <Values />
      <Certification />
      <Timeline />
    </div>
  );
};

export default About;
