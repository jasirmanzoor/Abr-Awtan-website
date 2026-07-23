import React from 'react';
import SiteNav from '../components/SiteNav';
import CinematicHero from '../components/cinematic/CinematicHero';
import CommandCenterCinematic from '../components/cinematic/CommandCenterCinematic';
import ScrollStory from '../components/cinematic/ScrollStory';
import FleetCarousel from '../components/cinematic/FleetCarousel';
import StickyComparison from '../components/cinematic/StickyComparison';
import GrowWithUs from '../components/GrowWithUs';
import Coverage from '../components/Coverage';
import CaseStudies from '../components/CaseStudies';
import Partners from '../components/Partners';
import Testimonials from '../components/Testimonials';
import Enterprise from '../components/Enterprise';
import Leadership from '../components/Leadership';
import Advantage from '../components/Advantage';
import QuoteWizard from '../components/QuoteWizard';
import SiteFooter from '../components/SiteFooter';

export default function Home() {
  return (
    <div className="font-body">
      <SiteNav />
      <CinematicHero />
      <CommandCenterCinematic />
      <ScrollStory />
      <FleetCarousel />
      <StickyComparison />
      <GrowWithUs />
      <Coverage />
      <CaseStudies />
      <Partners />
      <Testimonials />
      <Enterprise />
      <Leadership />
      <Advantage />
      <QuoteWizard />
      <SiteFooter />
    </div>
  );
}
