// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
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
import AdminPage from './pages/admin/AdminPage';
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

// --- 레이아웃 컴포넌트 정의 ---

// 1. 일반 사용자용 기본 레이아웃
const DefaultLayout = () => (
  <AppContainer>
    <Header />
    <MainContent>
      <Outlet /> {/* 중첩된 라우트의 페이지들이 여기에 렌더링됩니다 */}
    </MainContent>
    <Footer />
    <FloatingToggle />
  </AppContainer>
);

// 2. 관리자 페이지용 레이아웃 (헤더, 푸터 없음)
const AdminLayout = () => (
  <div style={{ background: '#f0f2f5', minHeight: '100vh' }}>
    <Outlet /> {/* AdminPage가 여기에 렌더링됩니다 */}
  </div>
);


function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        {/* 일반 사용자 페이지들 */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/instructors" element={<InstructorsPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* 관리자 페이지 */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
