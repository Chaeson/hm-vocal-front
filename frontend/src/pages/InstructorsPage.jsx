import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// 1. 이미지 import
import daeyoungLeeImage from '@/assets/images/instructors/v_daeyoung_lee.jpg';
import eunkyoungImage from '@/assets/images/instructors/v_eunkyoung_chu.jpg';
import jiyeonImage from '@/assets/images/instructors/v_jiyeon_kim.jpg';
import jiyoungImage from '@/assets/images/instructors/v_jiyoung_park.jpg';
import mijiImage from '@/assets/images/instructors/v_miji_kim.jpg';
import juntaeImage from '@/assets/images/instructors/i_juntae_kim.jpg';
import seulbeeImage from '@/assets/images/instructors/i_seulbee_lee.jpg';
import minyoungImage from '@/assets/images/instructors/w_minyoung_kim.jpg';

// 2. 정적 데이터 생성
const instructorsData = [
  { id: 1, name: '이대영', category: 'Vocal', cardBio: '감성을 자극하는 목소리, 맞춤형 보컬 트레이닝 전문가.', image: daeyoungLeeImage.src },
  { id: 2, name: '추은경', category: 'Vocal', cardBio: '파워풀한 고음과 섬세한 표현력을 위한 보컬 코치.', image: eunkyoungImage.src },
  { id: 3, name: '김지연', category: 'Vocal', cardBio: '기초부터 탄탄하게, 정확한 음정과 발성을 지도합니다.', image: jiyeonImage.src },
  { id: 4, name: '박지영', category: 'Vocal', cardBio: '다양한 장르를 소화하는 실전형 보컬 트레이너.', image: jiyoungImage.src },
  { id: 5, name: '김미지', category: 'Vocal', cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: mijiImage.src },
  { id: 6, name: '김준태', category: 'Instrument', cardBio: '기타, 베이스, 드럼 등 밴드 악기 전문 레슨.', image: juntaeImage.src },
  { id: 7, name: '이슬비', category: 'Instrument', cardBio: '피아노, 키보드 연주와 함께하는 시창청음 및 화성학.', image: seulbeeImage.src },
  { id: 8, name: '김민영', category: 'Writer', cardBio: '자신만의 이야기를 멜로디로, 작사/작곡 입문부터 프로까지.', image: minyoungImage.src },
];

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
  
  h3 { 
    font-size: 1.5rem; 
    margin-bottom: 0.5rem; 
  }
  
  p.specialty { 
    font-size: 1rem; 
    font-weight: 500; 
    color: var(--primary-color); 
    margin-bottom: 1rem; 
  }
  
  p.bio { 
    font-size: 0.95rem; 
    line-height: 1.6; 
    color: #666; 
  }
`;

// --- 메인 컴포넌트 ---
const InstructorsPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredInstructors = activeTab === 'All'
    ? instructorsData
    : instructorsData.filter(instructor => instructor.category === activeTab);

  const tabs = ['All', 'Vocal', 'Piano', 'Guitar', 'Writer', 'Harmonics', 'AuralSkills', 'MIDI', 'Acoustics'];

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
            {tab === 'All' ? '전체' : tab}
          </TabButton>
        ))}
      </TabNav>

      <InstructorGrid>
        {filteredInstructors.map((instructor) => (
          <InstructorCard key={instructor.id}>
            <CardImage src={instructor.image} alt={instructor.name} />
            <CardBody>
              <h3>{instructor.name}</h3>
              <p className="specialty">{instructor.category}</p>
              <p className="bio">{instructor.cardBio}</p>
            </CardBody>
          </InstructorCard>
        ))}
      </InstructorGrid>
    </PageContainer>
  );
};

export default InstructorsPage;
