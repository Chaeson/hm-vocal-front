import React from 'react';
import styled from 'styled-components';

// --- 데이터 (이미지 URL 포함) ---
const programs = [
  {
    id: 'hobby',
    title: '취미/직장인반',
    description: '간략 설명글',
    image: 'https://images.pexels.com/photos/45243/saxophone-music-gold-gloss-45243.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'college',
    title: '입시반',
    description: '간략 설명글',
    image: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'audition',
    title: '오디션/프로반',
    description: '간략 설명글',
    image: 'https://images.pexels.com/photos/1916817/pexels-photo-1916817.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'senior',
    title: '시니어반',
    description: '간략 설명글',
    image: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'serenade',
    title: '축가 준비반',
    description: '간략 설명글',
    image: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

// --- 스타일 컴포넌트 ---
const Section = styled.section`
  padding: 5rem 0; // 상하 패딩만 적용
  background-color: #f9f9f9;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 4rem;
  padding: 0 2rem;
`;

const CardContainer = styled.div`
  /* 데스크톱: 그리드 레이아웃 */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  /* 모바일: 가로 스크롤 레이아웃 */
  @media (max-width: 768px) {
    max-width: none; /* 데스크톱의 너비 제한 해제 */
    margin: 0;       /* 데스크톱의 가운데 정렬 해제 */
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 0 1rem;
    gap: 1.5rem;

    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar { display: none; }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 80%; // 모바일에서 카드 너비
    flex-shrink: 0; // 카드가 줄어들지 않도록 설정
    scroll-snap-align: start; // 스크롤 스냅 정렬
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 2rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const MoreButton = styled.a`
  background-color: #007bff;
  color: white;
  text-decoration: none;
  text-align: center;
  border: none;
  border-radius: 25px;
  padding: 0.8rem 1.8rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;

  &:hover {
    background-color: #0056b3;
  }
`;

// --- 메인 컴포넌트 ---
const ProgramsSummarySection = () => {
  return (
    <Section>
      <SectionTitle>당신을 위한 최고의 과정</SectionTitle>
      <SectionSubtitle>체계적인 커리큘럼으로 여러분의 성장을 돕습니다.</SectionSubtitle>
      <CardContainer>
        {programs.map((program) => (
          <Card key={program.id}>
            <CardImage src={program.image} alt={program.title} />
            <CardBody>
              <CardTitle>{program.title}</CardTitle>
              <CardDescription>{program.description}</CardDescription>
              <MoreButton href={`/programs/?course=${program.id}`}>자세히 보기</MoreButton>
            </CardBody>
          </Card>
        ))}
      </CardContainer>
    </Section>
  );
};

export default ProgramsSummarySection;
