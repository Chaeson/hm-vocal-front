// frontend/src/components/layout/Header.js
import React from 'react';
import styled from 'styled-components';
// NavLink를 a 태그로 변경합니다.
// Astro에서는 window.location.pathname을 통해 현재 경로를 확인합니다.

const HeaderBlock = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const HeaderContent = styled.div`
  height: 80px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
`;

const StyledLink = styled.a`
  font-size: 1rem;
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

const Header = () => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <HeaderBlock>
      <HeaderContent>
        <Logo href="/">Vocal Academy</Logo>
        <Navigation>
          <StyledLink href="/about" className={currentPath === '/about' ? 'active' : ''}>학원소개</StyledLink>
          <StyledLink href="/programs" className={currentPath === '/programs' ? 'active' : ''}>교육과정</StyledLink>
          <StyledLink href="/instructors" className={currentPath === '/instructors' ? 'active' : ''}>강사진</StyledLink>
          <StyledLink href="/playlist" className={currentPath === '/playlist' ? 'active' : ''}>수강생 작품</StyledLink>
          <StyledLink href="/news" className={currentPath === '/news' ? 'active' : ''}>소식</StyledLink>
          <StyledLink href="/contact" className={currentPath === '/contact' ? 'active' : ''}>문의</StyledLink>
        </Navigation>
      </HeaderContent>
    </HeaderBlock>
  );
};

export default Header;
