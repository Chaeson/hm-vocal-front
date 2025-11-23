import React from 'react';
import styled from 'styled-components';

// --- 커리큘럼 데이터 ---
const curriculumData = [
  {
    title: '취미반',
    description: '노래를 처음 배우시는 분, 즐겁게 노래하고 싶으신 분들을 위한 과정입니다.',
  },
  {
    title: '오디션반',
    description: '기획사 오디션 합격을 목표로 체계적인 트레이닝과 전략적인 준비를 제공합니다.',
  },
  {
    title: '전문반',
    description: '프로 보컬리스트, 가이드 보컬, 코러스 세션 등을 위한 심화 과정입니다.',
  },
  {
    title: '입시반',
    description: '실용음악과 입시를 준비하는 학생들을 위한 맞춤형 커리큘럼과 집중 관리를 제공합니다.',
  },
];

// --- 스타일 컴포넌트 ---
const Section = styled.section`
  padding: 5rem 2rem;
  background-color: #f9f9f9;
  text-align: center;
  
  min-height: 100vh; // 최소 화면 높이를 채웁니다.
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  scroll-snap-align: start; // 스크롤 스냅의 정렬 지점으로 설정합니다.
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
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }
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
`;

const MoreButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.8rem 1.8rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// --- 메인 컴포넌트 ---
const CurriculumSection = () => {
  return (
    <Section>
      <SectionTitle>커리큘럼</SectionTitle>
      <SectionSubtitle>체계적인 커리큘럼으로 여러분의 성장을 돕습니다.</SectionSubtitle>
      <CardGrid>
        {curriculumData.map((item, index) => (
          <Card key={index}>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            <MoreButton>자세히 보기</MoreButton>
          </Card>
        ))}
      </CardGrid>
    </Section>
  );
};

export default CurriculumSection;
