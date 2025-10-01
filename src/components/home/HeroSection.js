// frontend/src/components/home/HeroSection.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 임시 이미지 데이터 (추후 실제 이미지로 교체)
const images = [
  'https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const HeroBlock = styled.section`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.isActive ? 1 : 0)};
  transition: opacity 1.5s ease-in-out; /* 1.5초 동안 부드럽게 전환 */
  will-change: opacity;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
`;

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 4000); // 4초마다 이미지 변경

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  return (
    <HeroBlock>
      {images.map((image, index) => (
        <ImageContainer
          key={index}
          src={image}
          isActive={index === currentImageIndex}
        />
      ))}
      <HeroContent>
        <Title>당신의 목소리에 날개를</Title>
        <Subtitle>최고의 강사진과 함께 꿈을 현실로 만드세요.</Subtitle>
      </HeroContent>
    </HeroBlock>
  );
};

export default HeroSection;
