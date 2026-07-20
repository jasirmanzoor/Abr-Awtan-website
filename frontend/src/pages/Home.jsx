import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Specialized from '../components/Specialized';
import Stats from '../components/Stats';
import Coverage from '../components/Coverage';
import Locations from '../components/Locations';
import Gallery from '../components/Gallery';
import ScaleReach from '../components/ScaleReach';
import Partners from '../components/Partners';
import Enterprise from '../components/Enterprise';
import Leadership from '../components/Leadership';
import Advantage from '../components/Advantage';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="font-body text-[#ece5d3]">
      <Navbar />
      <Hero />
      <Services />
      <Specialized />
      <Stats />
      <Coverage />
      <Locations />
      <Gallery />
      <ScaleReach />
      <Partners />
      <Enterprise />
      <Leadership />
      <Advantage />
      <Contact />
      <Footer />
    </div>
  );
}
