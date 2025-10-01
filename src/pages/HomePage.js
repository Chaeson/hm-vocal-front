// frontend/src/pages/HomePage.js
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ProgramsSummarySection from '../components/home/ProgramsSummarySection';
import PlaylistSection from '../components/home/PlaylistSection';
import LocationAndNewsSection from '../components/home/LocationAndNewsSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ProgramsSummarySection />
      <PlaylistSection />
      <LocationAndNewsSection />
    </>
  );
};

export default HomePage;