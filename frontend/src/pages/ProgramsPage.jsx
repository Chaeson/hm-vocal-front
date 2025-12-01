import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// 데이터 구조는 이전과 동일
const programsData = [
    {
        id: 'hobby',
        title: '취미/직장인반',
        sections: [
            { id: 'hobby-vocal', title: '보컬', image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '기초 발성부터 원하는 곡 마스터까지, 1:1 맞춤형 레슨으로 노래에 대한 자신감을 키워보세요.' },
            { id: 'hobby-instrument', title: '악기', image: 'https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '피아노, 기타 등 원하는 악기를 기초부터 쉽고 재미있게 배울 수 있습니다. 코드 반주, 연주곡 마스터 등 목표에 맞춰 진행됩니다.' },
            { id: 'hobby-compose', title: '작곡', image: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '나만의 멜로디를 만들고 싶은 분들을 위한 과정입니다. 작곡의 기초 이론부터 실제 곡을 완성하는 노하우까지 배울 수 있습니다.' },
        ]
    },
    {
        id: 'college',
        title: '입시반',
        sections: [
            { id: 'hobby-midi', title: '보컬', image: 'https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '컴퓨터 음악 제작의 핵심인 미디(MIDI)를 활용하여, 나만의 음악을 프로페셔널하게 만들고 편곡하는 방법을 배웁니다.' },
            { id: 'hobby-midi', title: '피아노', image: 'https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '컴퓨터 음악 제작의 핵심인 미디(MIDI)를 활용하여, 나만의 음악을 프로페셔널하게 만들고 편곡하는 방법을 배웁니다.' },
            { id: 'hobby-midi', title: '기타', image: 'https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '컴퓨터 음악 제작의 핵심인 미디(MIDI)를 활용하여, 나만의 음악을 프로페셔널하게 만들고 편곡하는 방법을 배웁니다.' },
            { id: 'hobby-midi', title: '미디', image: 'https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '컴퓨터 음악 제작의 핵심인 미디(MIDI)를 활용하여, 나만의 음악을 프로페셔널하게 만들고 편곡하는 방법을 배웁니다.' },
            { id: 'hobby-midi', title: '작곡', image: 'https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '컴퓨터 음악 제작의 핵심인 미디(MIDI)를 활용하여, 나만의 음악을 프로페셔널하게 만들고 편곡하는 방법을 배웁니다.' },
            { id: 'hobby-midi', title: '화성학', image: 'https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '컴퓨터 음악 제작의 핵심인 미디(MIDI)를 활용하여, 나만의 음악을 프로페셔널하게 만들고 편곡하는 방법을 배웁니다.' },
            { id: 'hobby-midi', title: '시창청음', image: 'https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '컴퓨터 음악 제작의 핵심인 미디(MIDI)를 활용하여, 나만의 음악을 프로페셔널하게 만들고 편곡하는 방법을 배웁니다.' },
        ]
    },
    {
        id: 'audition',
        title: '오디션/프로반',
        sections: [
            { id: 'audition-vocal', title: '보컬', image: 'https://images.pexels.com/photos/3394347/pexels-photo-3394347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '주요 기획사 오디션 합격을 위한 맞춤형 전략과 실전 트레이닝을 제공합니다.' },
            { id: 'audition-vocal', title: '미디', image: 'https://images.pexels.com/photos/3394347/pexels-photo-3394347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '주요 기획사 오디션 합격을 위한 맞춤형 전략과 실전 트레이닝을 제공합니다.' },
            { id: 'audition-vocal', title: '프로듀싱', image: 'https://images.pexels.com/photos/3394347/pexels-photo-3394347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '주요 기획사 오디션 합격을 위한 맞춤형 전략과 실전 트레이닝을 제공합니다.' },
        ]
    },
    {
        id: 'senior',
        title: '시니어반',
        sections: [
            { id: 'audition-vocal', title: '보컬', image: 'https://images.pexels.com/photos/3394347/pexels-photo-3394347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '주요 기획사 오디션 합격을 위한 맞춤형 전략과 실전 트레이닝을 제공합니다.' },
            { id: 'audition-vocal', title: '악기', image: 'https://images.pexels.com/photos/3394347/pexels-photo-3394347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '주요 기획사 오디션 합격을 위한 맞춤형 전략과 실전 트레이닝을 제공합니다.' },
        ]
    },
    {
        id: 'advanced',
        title: '축가 준비반',
        sections: [
            { id: 'advanced-vocal', title: '보컬', image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '일생의 한 번뿐인 특별한 날을 위해, 단기간에 최고의 무대를 만들 수 있도록 집중 코칭합니다.' },
            { id: 'advanced-vocal', title: '악기', image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: '일생의 한 번뿐인 특별한 날을 위해, 단기간에 최고의 무대를 만들 수 있도록 집중 코칭합니다.' },
        ]
    }
];

// --- 스타일 컴포넌트 ---
const fadeIn = keyframes` from { opacity: 0; } to { opacity: 1; }`;
const zoomIn = keyframes` from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; }`;
const PageContainer = styled.div` padding: 2rem 0; `;
const PageTitle = styled.h1` font-size: 2.8rem; font-weight: 700; margin-bottom: 2rem; text-align: center; `;
const TabNav = styled.nav` display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; width: 100%; border-bottom: 1px solid #e0e0e0; margin-bottom: 3rem; `;
const TabButton = styled.button`
  padding: 1rem; font-size: 1.1rem; font-weight: 600; background: none; border: none; cursor: pointer; color: #888;
  border-bottom: 3px solid transparent; margin-bottom: -1px; transition: all 0.3s ease;
  &.active { color: var(--primary-color); border-bottom-color: var(--primary-color); }
`;
const SectionGrid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem;
  width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 2rem; animation: ${fadeIn} 0.5s ease-in-out;
`;
const SectionCard = styled.div`
  position: relative; height: 500px; border-radius: 16px; overflow: hidden; cursor: pointer;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1); transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.15); }
  &::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%); }
`;
const SectionImage = styled.img` width: 100%; height: 100%; object-fit: cover; `;
const SectionTitle = styled.h2`
  position: absolute; bottom: 1.5rem; left: 1.5rem; right: 1.5rem; color: white;
  font-size: 1.8rem; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`;

// --- 모달 스타일 수정 ---
const ModalBackdrop = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7);
  display: flex; justify-content: center; align-items: center; z-index: 1000; animation: ${fadeIn} 0.3s;
`;

const ModalContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 1000px;
  min-height: 500px; /* 최소 높이 설정 */
  max-height: 80vh;
  background: #fff;
  border-radius: 16px;
  display: flex;
  overflow: hidden;
  animation: ${zoomIn} 0.3s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: 0; /* 모바일에서는 최소 높이 제거 */
  }
`;

const ModalImageWrapper = styled.div`
  flex: 3;
  background-color: #eee;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModalTextWrapper = styled.div`
  flex: 7;
  padding: 3rem;
  overflow-y: auto;
  display: flex; /* Flexbox 추가 */
  flex-direction: column; /* 수직 정렬 */

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
    flex-grow: 1; /* 남는 공간을 모두 채움 */
  }
`;

const CloseButton = styled.button`
  position: absolute; top: 1rem; right: 1rem; background: none; border: none;
  font-size: 2rem; color: #888; cursor: pointer; z-index: 10;
  &:hover { color: #333; }
`;

const ProgramsPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const courseFromUrl = searchParams.get('course');
    const programFromUrl = programsData.find(p => p.id === courseFromUrl);
    setSelectedProgram(programFromUrl || programsData[0]);
  }, [window.location.search]);

  const handleSelectProgram = (programId) => {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('course', programId);
    window.history.pushState({}, '', newUrl);

    const program = programsData.find(p => p.id === programId);
    setSelectedProgram(program);
  };

  if (!selectedProgram) {
    return <div>로딩 중...</div>;
  }

  return (
    <PageContainer>
      <PageTitle>교육과정</PageTitle>
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

      <SectionGrid>
        {selectedProgram.sections.map(section => (
          <SectionCard key={section.id} onClick={() => setExpandedSection(section)}>
            <SectionImage src={section.image} alt={section.title} />
            <SectionTitle>{section.title}</SectionTitle>
          </SectionCard>
        ))}
      </SectionGrid>

      {expandedSection && (
        <ModalBackdrop onClick={() => setExpandedSection(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setExpandedSection(null)}>&times;</CloseButton>
            <ModalImageWrapper>
              <img src={expandedSection.image} alt={expandedSection.title} />
            </ModalImageWrapper>
            <ModalTextWrapper>
              <h2>{expandedSection.title}</h2>
              <p>{expandedSection.description}</p>
            </ModalTextWrapper>
          </ModalContent>
        </ModalBackdrop>
      )}
    </PageContainer>
  );
};

export default ProgramsPage;
