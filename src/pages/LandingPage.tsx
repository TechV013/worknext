import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { FeaturesSection } from '../components/sections/FeaturesSection';
import { HowItWorks } from '../components/sections/HowItWorks';
import { FuturePartnersSection } from '../components/sections/FuturePartnersSection';
import { FAQSection } from '../components/sections/FAQSection';
import { ContactSection } from '../components/sections/ContactSection';

export const LandingPage: React.FC = () => {
  return (
    <MainLayout>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorks />
      <FuturePartnersSection />
      <FAQSection />
      <ContactSection />
    </MainLayout>
  );
};
