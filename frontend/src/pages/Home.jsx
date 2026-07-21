import React from 'react';
import SiteNav from '../components/SiteNav';
import Hero from '../components/Hero';
import CommandCenter from '../components/CommandCenter';
import ServicesGrid from '../components/Services';
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
import SiteFooter from '../components/SiteFooter';

export default function Home() {
  return (
    <div className="font-body">
      <SiteNav />
      <Hero />
      <CommandCenter />
      <ServicesGrid />
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
      <SiteFooter />
    </div>
  );
}
