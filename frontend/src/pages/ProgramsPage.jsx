// frontend/src/pages/ProgramsPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const programsData = [
    {
        id: 'hobby',
        title: '취미/직장인반',
        description: `보컬, 악기, 작곡, 미디`,
        image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 'college',
        title: '입시반',
        description: `보컬, 악기, 작곡, 미디`,
        image: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 'audition',
        title: '오디션/프로반',
        description: `보컬, 미디`,
        image: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 'senior',
        title: '시니어반',
        description: `보컬, 악기`,
        image: 'https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 'advanced',
        title: '축가 준비반',
        description: `보컬`,
        image: 'https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    }
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
      <h1>교육과정</h1>

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
