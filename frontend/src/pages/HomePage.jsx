// frontend/src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/home/HeroSection.jsx';
import ProgramsSummarySection from '../components/home/ProgramsSummarySection.jsx';
import PlaylistSection from '../components/home/PlaylistSection.jsx';
import LocationAndNewsSection from '../components/home/LocationAndNewsSection.jsx';

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
