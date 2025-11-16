// frontend/src/components/home/ProgramsSummarySection.js
import React from 'react';
import styled from 'styled-components';
import Card from '../common/Card.jsx';

const SectionBlock = styled.section`
  padding: 4rem 0;
  background: #fff;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-wrap: nowrap; /* 줄바꿈 방지 */
  overflow-x: auto;  /* x축으로 오버플로우 발생 시 스크롤 생성 */
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem; /* 좌우 여백 추가 */

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  /* 스크롤 스냅 기능 추가 */
  scroll-snap-type: x mandatory;
`;

const CardWrapper = styled.div`
  flex: 0 0 31%; /* 한 화면에 대략 3개의 카드가 보이도록 너비 설정 */
  min-width: 320px; /* 카드의 최소 너비 */
  scroll-snap-align: start; /* 스크롤 시 카드 시작점에 맞춰 멈춤 */
`;

// ProgramsPage.js의 id와 일치하도록 데이터 수정
const programs = [
  {
    id: 'beginner',
    image: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: '보컬 입문반',
    subtitle: '기초부터 탄탄하게, 당신의 목소리를 찾아보세요.',
  },
  {
    id: 'audition',
    image: 'https://images.pexels.com/photos/1916817/pexels-photo-1916817.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: '오디션 준비반',
    subtitle: '전문적인 트레이닝으로 꿈의 무대에 도전하세요.',
  },
  {
    id: 'hobby',
    image: 'https://images.pexels.com/photos/45243/saxophone-music-gold-gloss-45243.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: '취미/직장인반',
    subtitle: '노래로 찾는 삶의 활력, 스트레스를 해소하세요.',
  },
  {
    id: 'advanced',
    image: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: '심화 과정',
    subtitle: '테크닉을 완성하고 자신만의 스타일을 만드세요.',
  },
];

const ProgramsSummarySection = () => {
  return (
    <SectionBlock>
      <SectionTitle>당신을 위한 최고의 과정</SectionTitle>
      <ScrollContainer>
        {programs.map((program, index) => (
          <CardWrapper key={index}>
            <Card
              to={`/programs?course=${program.id}`}
              image={program.image}
              title={program.title}
              subtitle={program.subtitle}
            />
          </CardWrapper>
        ))}
      </ScrollContainer>
    </SectionBlock>
  );
};

export default ProgramsSummarySection;
