// frontend/src/components/layout/Header.js
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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

const Logo = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  position: relative;

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
  return (
    <HeaderBlock>
      <HeaderContent>
        <Logo to="/">Vocal Academy</Logo>
        <Navigation>
          <StyledNavLink to="/about">학원소개</StyledNavLink>
          <StyledNavLink to="/programs">교육과정</StyledNavLink>
          <StyledNavLink to="/instructors">강사진</StyledNavLink>
          <StyledNavLink to="/playlist">수강생 작품</StyledNavLink>
          <StyledNavLink to="/news">공지</StyledNavLink>
          <StyledNavLink to="/contact">문의</StyledNavLink>
        </Navigation>
      </HeaderContent>
    </HeaderBlock>
  );
};

export default Header;