import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const HeaderContent = styled.div`
  height: 120px; /* 헤더 높이 유지 */
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  z-index: 101;

  img {
    height: 80px;   /* 헤더에 맞는 높이 설정 */
    width: 142px;  /* 16:9 비율에 맞는 너비 (80 * 16/9) */
    object-fit: cover; /* 이미지가 비율에 맞게 채워지도록 설정 */
  }
`;

// --- 데스크톱 메뉴 ---
const Navigation = styled.nav`
  display: flex;
  gap: 3.5rem; /* 메뉴 간격 확장 */

  @media (max-width: 768px) {
    display: none; // 모바일에서는 숨김
  }
`;

const StyledLink = styled.a`
  font-size: 1.2rem; /* 텍스트 크기 1.5배 증가 */
  font-weight: 500;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  color: inherit;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s;
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }

  &.active {
    color: var(--primary-color);
  }
`;

// --- 모바일 메뉴 (햄버거) ---
const HamburgerButton = styled.button`
  display: none; // 기본적으로 숨김
  background: none;
  border: none;
  cursor: pointer;
  z-index: 101;

  @media (max-width: 768px) {
    display: block; // 모바일에서만 보임
  }

  div {
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 5px 0;
    transition: all 0.3s ease;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 100;
`;

const MobileStyledLink = styled(StyledLink)`
  font-size: 1.5rem;
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Astro는 서버에서도 렌더링되므로, window 객체는 client-side에서만 접근
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <HeaderBlock>
      <HeaderContent>
        <Logo href="/">
            <img src="/main-logo.jpg" alt="HM Vocal Logo" />
        </Logo>
        
        {/* 데스크톱용 메뉴 */}
        <Navigation>
          <StyledLink href="/about" className={currentPath === '/about' ? 'active' : ''}>학원소개</StyledLink>
          <StyledLink href="/programs" className={currentPath === '/programs' ? 'active' : ''}>교육과정</StyledLink>
          <StyledLink href="/instructors" className={currentPath === '/instructors' ? 'active' : ''}>강사진</StyledLink>
          <StyledLink href="/playlist" className={currentPath === '/playlist' ? 'active' : ''}>수강생 작품</StyledLink>
          <StyledLink href="/news" className={currentPath === '/news' ? 'active' : ''}>소식</StyledLink>
          <StyledLink href="/contact" className={currentPath === '/contact' ? 'active' : ''}>문의</StyledLink>
        </Navigation>

        {/* 모바일용 햄버거 버튼 */}
        <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div />
          <div />
          <div />
        </HamburgerButton>
      </HeaderContent>

      {/* 모바일 메뉴 패널 */}
      <MobileMenu isOpen={isMenuOpen}>
        <MobileStyledLink href="/about" className={currentPath === '/about' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>학원소개</MobileStyledLink>
        <MobileStyledLink href="/programs" className={currentPath === '/programs' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>교육과정</MobileStyledLink>
        <MobileStyledLink href="/instructors" className={currentPath === '/instructors' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>강사진</MobileStyledLink>
        <MobileStyledLink href="/playlist" className={currentPath === '/playlist' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>수강생 작품</MobileStyledLink>
        <MobileStyledLink href="/news" className={currentPath === '/news' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>소식</MobileStyledLink>
        <MobileStyledLink href="/contact" className={currentPath === '/contact' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>문의</MobileStyledLink>
      </MobileMenu>
    </HeaderBlock>
  );
};

export default Header;
