import React from "react";
import Hero from "../components/Hero";
import Global from "../components/Global";
import CTA from "../components/CTA";
import Showcase from "../components/Showcase";

const Home = () => {
  return (
    <div className="page-transition">
      <Hero />
      <Showcase />
      <Global />
      <CTA />
    </div>
  );
};

export default Home;
