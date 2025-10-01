// frontend/src/components/common/FloatingToggle.js
import React, { useState } from 'react';
import styled from 'styled-components';

const FloatingToggleContainer = styled.div`
  position: fixed;
  left: 30px;
  bottom: 30px;
  z-index: 1000;
`;

const ToggleButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: var(--primary-color);
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.1);
  }

  .icon {
    transition: transform 0.3s ease;
    transform: ${props => (props.isOpen ? 'rotate(45deg)' : 'rotate(0)')};
  }
`;

const SubToggleButton = styled.button`
  position: absolute;
  left: 5px; /* 메인 버튼 중앙에 오도록 조정 */
  bottom: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: #6c757d; /* 서브 버튼 색상 */
  color: white;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  opacity: ${props => (props.isHovered ? 1 : 0)};
  transform: ${props => (props.isHovered ? `translateY(-${props.offset}px)` : 'translateY(0)')};
  pointer-events: ${props => (props.isHovered ? 'auto' : 'none')}; /* 숨겨져 있을 때 클릭 방지 */

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #5a6268;
  }
`;

const FloatingToggle = () => {
  const [isOpen, setIsOpen] = useState(false); // 메인 버튼 클릭 상태
  const [isHovered, setIsHovered] = useState(false); // 마우스 오버 상태

  const handleMainButtonClick = () => {
    setIsOpen(!isOpen);
    // 메인 버튼 클릭 시 동작할 기능
  };

  const handleSubButtonClick = (action) => {
    console.log(`Sub button clicked: ${action}`);
    // 서브 버튼 클릭 시 동작할 기능
    setIsHovered(false); // 서브 버튼 클릭 후 숨기기
  };

  return (
    <FloatingToggleContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ToggleButton onClick={handleMainButtonClick} isOpen={isOpen}>
        <span className="icon">+</span>
      </ToggleButton>
      <SubToggleButton
        isHovered={isHovered}
        offset={70} /* 메인 버튼 위로 70px */
        onClick={() => handleSubButtonClick('Option 1')}
      >
        A
      </SubToggleButton>
      <SubToggleButton
        isHovered={isHovered}
        offset={130} /* 첫 번째 서브 버튼 위로 60px */
        onClick={() => handleSubButtonClick('Option 2')}
      >
        B
      </SubToggleButton>
    </FloatingToggleContainer>
  );
};

export default FloatingToggle;