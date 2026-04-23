import React from 'react';
import Hero from '../components/Hero';
import Global from '../components/Global';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <div className="page-transition">
      <Hero />
      <Global />
      <CTA />
    </div>
  );
};

export default Home;
