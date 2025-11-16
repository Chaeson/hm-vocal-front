// frontend/src/components/home/HeroSection.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroBlock = styled.section`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') center/cover no-repeat;
  color: white;
`;

const Content = styled.div`
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
`;

const HeroSection = () => {
  return (
    <HeroBlock>
      <Content>
        <Title>당신의 목소리가 작품이 되는 곳</Title>
        <Subtitle>최고의 강사진과 함께 꿈을 현실로 만드세요.</Subtitle>
      </Content>
    </HeroBlock>
  );
};

export default HeroSection;
