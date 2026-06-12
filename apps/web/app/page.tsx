import React from 'react';
import { Navbar } from './components/landing/Navbar';
import { HeroSection } from './components/landing/HeroSection';
import { LearningTracks } from './components/landing/LearningTracks';
import { WhyEIPs } from './components/landing/WhyEIPs';
import { JourneySection } from './components/landing/JourneySection';
import { GovernanceSection } from './components/landing/GovernanceSection';
import { CommunitySection } from './components/landing/CommunitySection';
import { Footer } from './components/landing/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar className=" bg-background/90 backdrop-blur-xl border-b border-border"/>
      <main className="mt-16">
        <HeroSection />
        <LearningTracks />
        <WhyEIPs />
        <GovernanceSection />
        <JourneySection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
}

