// frontend/src/pages/ProgramsPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const programsData = [
  {
    id: 'beginner',
    title: '보컬 입문반',
    description: `노래를 처음 시작하는 분들을 위한 과정입니다. \n기초 발성, 호흡법, 정확한 음정 연습을 통해 노래의 기본기를 탄탄하게 다집니다. \n자신의 목소리를 이해하고 자신감을 키우는 첫걸음이 될 것입니다.`,
    image: 'https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'audition',
    title: '오디션 준비반',
    description: `기획사 오디션, 대학 입시를 목표로 하는 분들을 위한 전문 과정입니다. \n개인의 매력을 극대화할 수 있는 곡 선정부터, 무대 퍼포먼스, 녹음 실습까지, \n실전 경험이 풍부한 전문 강사진이 합격을 위한 모든 것을 지도합니다.`,
    image: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'hobby',
    title: '취미/직장인반',
    description: `음악을 사랑하는 모든 분들을 위한 과정입니다. \n스트레스 해소, 자기 계발 등 각자의 목표에 맞춰 즐겁게 노래를 배울 수 있습니다. \n최신 가요, 팝, 뮤지컬 넘버 등 원하는 곡으로 레슨을 진행합니다.`,
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'advanced',
    title: '심화 과정',
    description: `프로 보컬리스트, 싱어송라이터를 꿈꾸는 분들을 위한 심화 과정입니다. \n더욱 깊이 있는 발성 테크닉, 다양한 장르의 곡 해석, 자신만의 음악 스타일을 구축하는 방법을 배웁니다. \n프로듀싱, 작곡 레슨과 연계도 가능합니다.`,
    image: 'https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 2rem 0;
  overflow-x: hidden;
`;

const MainLayout = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  animation: ${fadeIn} 0.5s ease-in-out;
  user-select: none;
  -webkit-user-drag: none;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  min-width: 40%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.12);
  }
`;

const DescriptionWrapper = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    white-space: pre-wrap;
    word-break: keep-all;
    color: #555;
  }
`;

const TabNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
`;

const TabButton = styled.button`
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  border-bottom: 3px solid transparent;
  margin-bottom: -1px;
  transition: all 0.3s ease;

  &.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
  }

  &:hover {
    color: var(--primary-color);
  }
`;

const ProgramsPage = ({ initialCourse }) => {
  const [selectedProgram, setSelectedProgram] = useState(() => {
    return programsData.find(p => p.id === initialCourse) || programsData[0];
  });

  const handleSelectProgram = (programId) => {
    const program = programsData.find(p => p.id === programId);
    setSelectedProgram(program);
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('course', programId);
    window.history.pushState({}, '', newUrl);
  };

  return (
    <PageContainer>
      <h1>📚 교육과정</h1>

      <TabNav>
        {programsData.map(program => (
          <TabButton
            key={program.id}
            className={selectedProgram.id === program.id ? 'active' : ''}
            onClick={() => handleSelectProgram(program.id)}
          >
            {program.title}
          </TabButton>
        ))}
      </TabNav>
      
      <MainLayout key={selectedProgram.id}>
        <ImageWrapper>
          <img src={selectedProgram.image} alt={selectedProgram.title} />
        </ImageWrapper>
        <DescriptionWrapper>
          <h2>{selectedProgram.title}</h2>
          <p>{selectedProgram.description}</p>
        </DescriptionWrapper>
      </MainLayout>

    </PageContainer>
  );
};

export default ProgramsPage;
