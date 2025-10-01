// frontend/src/components/home/LocationAndNewsSection.js
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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
  align-items: flex-start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LocationContainer = styled.div``;

const NewsContainer = styled.div``;

const Subtitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const MapImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Address = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
`;

const NewsList = styled.ul`
  list-style: none;
`;

const NewsItem = styled.li`
  a {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f9f9f9;
    }
  }

  .title {
    font-weight: 500;
  }

  .date {
    color: #888;
  }
`;

// 임시 데이터
const newsData = [
  { id: 1, title: '2분기 수강생 정기 모집 안내', date: '2024.06.10' },
  { id: 2, title: '여름 특강반 개설', date: '2024.06.08' },
  { id: 3, title: '유명 작곡가 초청 강연회', date: '2024.06.01' },
  { id: 4, title: '학원 내부 공사로 인한 휴무 안내', date: '2024.05.28' },
];

const LocationAndNewsSection = () => {
  return (
    <SectionBlock>
      <LayoutContainer>
        <LocationContainer>
          <Subtitle>오시는 길</Subtitle>
          <MapImage src="https://images.pexels.com/photos/224953/pexels-photo-224953.jpeg?auto=compress&cs=tinysrgb&w=600" alt="학원 위치 지도" />
          <Address>
            <strong>Vocal Academy</strong><br />
            서울특별시 중구 세종대로 110<br />
            문의: 02-123-4567
          </Address>
        </LocationContainer>
        <NewsContainer>
          <Subtitle>공지사항</Subtitle>
          <NewsList>
            {newsData.map(item => (
              <NewsItem key={item.id}>
                <NavLink to="/news">
                  <span className="title">{item.title}</span>
                  <span className="date">{item.date}</span>
                </NavLink>
              </NewsItem>
            ))}
          </NewsList>
        </NewsContainer>
      </LayoutContainer>
    </SectionBlock>
  );
};

export default LocationAndNewsSection;
