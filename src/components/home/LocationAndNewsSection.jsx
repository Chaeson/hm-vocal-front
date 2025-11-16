// frontend/src/components/home/LocationAndNewsSection.js
import React from 'react';
import styled from 'styled-components';
import Card from '../common/Card.jsx';

const SectionBlock = styled.section`
  padding: 4rem 2rem;
  background: #fff;
`;

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div``;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

// 임시 데이터
const latestNews = {
  to: '/news',
  image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600',
  title: '제 15회 정기 연주회 안내',
  subtitle: '2024년 12월 20일, 수강생 여러분의 멋진 무대를 기대해주세요!',
};

const LocationAndNewsSection = () => {
  return (
    <SectionBlock>
      <LayoutContainer>
        <Section>
          <SectionTitle>오시는 길</SectionTitle>
          {/* 실제 지도 컴포넌트가 들어갈 자리 */}
          <div style={{ height: '300px', background: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
            <p>지도 API가 여기에 표시됩니다.</p>
          </div>
        </Section>
        <Section>
          <SectionTitle>최신 소식</SectionTitle>
          <Card 
            to={latestNews.to}
            image={latestNews.image}
            title={latestNews.title}
            subtitle={latestNews.subtitle}
          />
        </Section>
      </LayoutContainer>
    </SectionBlock>
  );
};

export default LocationAndNewsSection;
