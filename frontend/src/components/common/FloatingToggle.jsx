import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
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
  const [isVisible, setIsVisible] = useState(false);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 시작 시 버튼 숨기기
      setIsVisible(false);
      
      // 기존 타이머가 있다면 제거
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      // 3초 후에 버튼을 표시하는 새 타이머 설정
      timeoutIdRef.current = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
    };

    // 초기 로드 시 3초 후 버튼 표시
    timeoutIdRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너와 타이머 정리
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return (
    <ToggleContainer isVisible={isVisible}>
      <Menu isOpen={isOpen}>
        <MenuItem href="#">맨 위로</MenuItem>
        <MenuItem href="https://blog.naver.com/hm_vocal">블로그</MenuItem>
        <MenuItem href="https://www.instagram.com/hmvocal/">인스타그램</MenuItem>
        <MenuItem href="https://www.youtube.com/@hmvocal2001">YouTube</MenuItem>
        <MenuItem href="#">카톡 문의</MenuItem>
      </Menu>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '💬'}
      </ToggleButton>
    </ToggleContainer>
  );
};

export default FloatingToggle;
