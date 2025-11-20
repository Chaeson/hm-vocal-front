import React from 'react';
import styled from 'styled-components';

const CardLink = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.12);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

const Card = ({ to, image, title, subtitle }) => {
  return (
    <CardLink href={to}>
      <Image src={image} alt={title} />
      <Content>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Content>
    </CardLink>
  );
};

export default Card;
