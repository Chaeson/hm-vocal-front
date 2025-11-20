import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

const ToggleButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Menu = styled.div`
  position: absolute;
  bottom: 70px;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  overflow: hidden;
  opacity: ${props => props.isOpen ? 1 : 0};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(10px)'};
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
`;

const MenuItem = styled.a`
  display: block;
  padding: 1rem 1.5rem;
  color: #333;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const FloatingToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ToggleContainer>
      <Menu isOpen={isOpen}>
        <MenuItem href="#">맨 위로</MenuItem>
        <MenuItem href="#">카톡 문의</MenuItem>
      </Menu>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '💬'}
      </ToggleButton>
    </ToggleContainer>
  );
};

export default FloatingToggle;
