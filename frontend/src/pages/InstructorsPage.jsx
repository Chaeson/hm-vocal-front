import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// 1. 이미지 import (현재 데이터에 이미지가 없으므로 주석 처리 또는 플레이스홀더 사용)
// import daeyoungLeeImage from '@/assets/images/instructors/v_daeyoung_lee.jpg';

// 2. 정적 데이터 생성
const instructorsData = [
  { id: 1, name: '이대영', category: ['Vocal'], cardBio: '감성을 자극하는 목소리, 맞춤형 보컬 트레이닝 전문가.', image: "https://via.placeholder.com/300x280/3498db/FFFFFF?text=Profile" },
  { id: 2, name: '김미지', category: ['Vocal','Piano'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "https://via.placeholder.com/300x280/2ecc71/FFFFFF?text=Profile" },
  { id: 3, name: '박지영', category: ['Vocal'], cardBio: '다양한 장르를 소화하는 실전형 보컬 트레이너.', image: "https://via.placeholder.com/300x280/e74c3c/FFFFFF?text=Profile" },
  { id: 4, name: '김지연', category: ['Vocal'], cardBio: '기초부터 탄탄하게, 정확한 음정과 발성을 지도합니다.', image: "https://via.placeholder.com/300x280/f39c12/FFFFFF?text=Profile" },
  { id: 5, name: '추은경', category: ['Vocal'], cardBio: '파워풀한 고음과 섬세한 표현력을 위한 보컬 코치.', image: "https://via.placeholder.com/300x280/9b59b6/FFFFFF?text=Profile" },
  { id: 6, name: '한혜영', category: ['Vocal'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "https://via.placeholder.com/300x280/1abc9c/FFFFFF?text=Profile" },
  { id: 7, name: '권예린', category: ['Piano','Writer','Harmonics','AuralSkills'], cardBio: '피아노 연주와 함께하는 시창청음 및 화성학.', image: "https://via.placeholder.com/300x280/34495e/FFFFFF?text=Profile" },
  { id: 8, name: '김민영', category: ['Piano','Writer','Harmonics','AuralSkills'], cardBio: '작사/작곡 입문부터 프로까지, 자신만의 음악 만들기.', image: "https://via.placeholder.com/300x280/7f8c8d/FFFFFF?text=Profile" },
  { id: 9, name: '이슬비', category: ['Piano','AuralSkills'], cardBio: '클래식과 재즈를 넘나드는 피아노 레슨.', image: "https://via.placeholder.com/300x280/d35400/FFFFFF?text=Profile" },
  { id: 10, name: '김준태', category: ['Guitar'], cardBio: '기타, 베이스, 드럼 등 밴드 악기 전문 레슨.', image: "https://via.placeholder.com/300x280/c0392b/FFFFFF?text=Profile" },
  { id: 11, name: '정주영', category: ['Guitar'], cardBio: '어쿠스틱 감성부터 일렉트릭 사운드까지 마스터.', image: "https://via.placeholder.com/300x280/8e44ad/FFFFFF?text=Profile" },
  { id: 12, name: '안창현', category: ['MIDI','Acoustics'], cardBio: '트렌디한 사운드 메이킹과 프로페셔널한 믹싱/마스터링.', image: "https://via.placeholder.com/300x280/2980b9/FFFFFF?text=Profile" },
];

// 3. 탭 레이블 맵
const tabLabels = {
  All: '전체',
  Vocal: '보컬',
  Piano: '피아노',
  Guitar: '기타',
  Writer: '작곡',
  Harmonics: '화성학',
  AuralSkills: '시창청음',
  MIDI: '미디',
  Acoustics: '음향학'
};

// --- 스타일 컴포넌트 ---
const fadeIn = keyframes` from { opacity: 0; } to { opacity: 1; }`;
const PageContainer = styled.div` padding: 2rem; `;
const PageTitle = styled.h1` font-size: 2.8rem; font-weight: 700; margin-bottom: 2rem; text-align: center; `;

const TabNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 3rem;
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

const InstructorGrid = styled.div` 
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
  gap: 2.5rem; 
  width: 100%; 
`;

const InstructorCard = styled.div`
  background: #fff; 
  border-radius: 12px; 
  box-shadow: 0 8px 16px rgba(0,0,0,0.08);
  overflow: hidden; 
  display: flex; 
  flex-direction: column; 
  animation: ${fadeIn} 0.6s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover { 
    transform: translateY(-5px); 
    box-shadow: 0 12px 24px rgba(0,0,0,0.12); 
  }
`;

const CardImage = styled.img` 
  width: 100%; 
  height: 280px; 
  object-fit: cover; 
`;

const CardBody = styled.div`
  padding: 1.5rem; 
  flex-grow: 1;
  
  h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
  p.specialty { font-size: 1rem; font-weight: 500; color: var(--primary-color); margin-bottom: 1rem; }
  p.bio { font-size: 0.95rem; line-height: 1.6; color: #666; }
`;

// --- Expanded View Styles ---
const ExpandedViewBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: ${fadeIn} 0.3s;
`;

const ExpandedWrapper = styled.div`
  position: relative;
`;

const zoomIn = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const ExpandedCard = styled.div`
  width: 90vw;
  max-width: 1200px;
  height: 85vh;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.2);
  display: flex;
  overflow: hidden;
  animation: ${zoomIn} 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  @media (max-width: 768px) {
    flex-direction: column;
    width: 95vw;
    height: 90vh;
  }
`;

const ExpandedImage = styled.img`
  width: 45%;
  object-fit: cover;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`;

const ExpandedBody = styled.div`
  padding: 3rem;
  flex-grow: 1;
  overflow-y: auto;
  
  h3 { font-size: 2.8rem; margin-bottom: 1rem; }
  p.specialty { font-size: 1.3rem; font-weight: 500; color: var(--primary-color); margin-bottom: 2rem; }
  p.bio { font-size: 1.1rem; line-height: 1.8; color: #555; }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: transparent;
  color: white;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 110;
  
  &:hover {
    transform: scale(1.1);
  }
`;

// --- 메인 컴포넌트 ---
const InstructorsPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const filteredInstructors = activeTab === 'All'
    ? instructorsData
    : instructorsData.filter(instructor => instructor.category.includes(activeTab));

  const tabs = Object.keys(tabLabels);

  const handleCardClick = (id) => setExpandedId(id);
  const handleCloseExpanded = () => setExpandedId(null);

  const expandedInstructor = expandedId 
    ? instructorsData.find(inst => inst.id === expandedId)
    : null;

  return (
    <PageContainer>
      <PageTitle>강사진</PageTitle>

      <TabNav>
        {tabs.map(tab => (
          <TabButton
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tabLabels[tab]}
          </TabButton>
        ))}
      </TabNav>

      <InstructorGrid>
        {filteredInstructors.map((instructor) => (
          <InstructorCard key={instructor.id} onClick={() => handleCardClick(instructor.id)}>
            <CardImage src={instructor.image} alt={instructor.name} />
            <CardBody>
              <h3>{instructor.name}</h3>
              <p className="specialty">{instructor.category.map(cat => tabLabels[cat] || cat).join(' / ')}</p>
              <p className="bio">{instructor.cardBio}</p>
            </CardBody>
          </InstructorCard>
        ))}
      </InstructorGrid>

      {expandedInstructor && (
        <ExpandedViewBackdrop onClick={handleCloseExpanded}>
          <ExpandedWrapper>
            <CloseButton onClick={handleCloseExpanded}>&times;</CloseButton>
            <ExpandedCard onClick={(e) => e.stopPropagation()}>
              <ExpandedImage src={expandedInstructor.image} alt={expandedInstructor.name} />
              <ExpandedBody>
                <h3>{expandedInstructor.name}</h3>
                <p className="specialty">{expandedInstructor.category.map(cat => tabLabels[cat] || cat).join(' / ')}</p>
                <p className="bio">{expandedInstructor.cardBio}</p>
              </ExpandedBody>
            </ExpandedCard>
          </ExpandedWrapper>
        </ExpandedViewBackdrop>
      )}
    </PageContainer>
  );
};

export default InstructorsPage;
