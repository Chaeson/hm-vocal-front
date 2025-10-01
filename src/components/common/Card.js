// frontend/src/components/common/Card.js
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const CardBlock = styled(NavLink)`
  display: block;
  background: #f9f9f9; /* Apple 스타일의 밝은 회색 배경 */
  border-radius: 18px;
  overflow: hidden;
  text-align: center;
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 60%; /* 이미지 비율 유지 */
  position: relative;
  margin-bottom: 1.5rem;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain; /* 이미지가 잘리지 않게 */
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1d1d1f; /* Apple의 텍스트 색상 */
`;

const CardSubtitle = styled.p`
  font-size: 1rem;
  color: #515154;
`;

const Card = ({ to, image, title, subtitle }) => {
  return (
    <CardBlock to={to}>
      <ImageContainer>
        <img src={image} alt={title} />
      </ImageContainer>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{subtitle}</CardSubtitle>
    </CardBlock>
  );
};

export default Card;
