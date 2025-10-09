// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import GlobalStyles from './assets/styles/global.css';

// Import pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import InstructorsPage from './pages/InstructorsPage';
import PlaylistPage from './pages/PlaylistPage';
import NewsListPage from './pages/NewsListPage';
import ContactPage from './pages/ContactPage';
import FloatingToggle from './components/common/FloatingToggle';

const GlobalStyle = createGlobalStyle`
  ${GlobalStyles}
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/instructors" element={<InstructorsPage />} />
            <Route path="/playlist" element={<PlaylistPage />} />
            <Route path="/news" element={<NewsListPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
      <FloatingToggle />
    </BrowserRouter>
  );
}

export default App;
