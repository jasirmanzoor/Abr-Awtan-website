import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CommandCenter from '../components/CommandCenter';
import Services from '../components/Services';
import QuoteWizard from '../components/QuoteWizard';
import ServiceComparison from '../components/ServiceComparison';
import Coverage from '../components/Coverage';
import Locations from '../components/Locations';
import TrackShipment from '../components/TrackShipment';
import CaseStudies from '../components/CaseStudies';
import Partners from '../components/Partners';
import Testimonials from '../components/Testimonials';
import Enterprise from '../components/Enterprise';
import Leadership from '../components/Leadership';
import Advantage from '../components/Advantage';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';

export default function Home() {
  return (
    <div className="font-body">
      <Navbar />
      <Hero />
      <CommandCenter />
      <Services />
      <QuoteWizard />
      <ServiceComparison />
      <Coverage />
      <Locations />
      <TrackShipment />
      <CaseStudies />
      <Partners />
      <Testimonials />
      <Enterprise />
      <Leadership />
      <Advantage />
      <Contact />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
