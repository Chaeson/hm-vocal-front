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

// 2. 정적 데이터 생성 (category를 배열로 변경)
const instructorsData = [
  { id: 1, name: '이대영', category: ['Vocal'], cardBio: '감성을 자극하는 목소리, 맞춤형 보컬 트레이닝 전문가.', image: "" },
  { id: 2, name: '김미지', category: ['Vocal','Piano'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "" },
  { id: 3, name: '박지영', category: ['Vocal'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "" },
  { id: 4, name: '김지연', category: ['Vocal'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "" },
  { id: 5, name: '추은경', category: ['Vocal'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "" },
  { id: 6, name: '한혜영', category: ['Vocal'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "" },
  { id: 7, name: '권예린', category: ['Piano','Writer','Harmonics','AuralSkills'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "" },
  { id: 8, name: '김민영', category: ['Piano','Writer','Harmonics','AuralSkills'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "" },
  { id: 9, name: '이슬비', category: ['Piano','AuralSkills'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "" },
  { id: 10, name: '김준태', category: ['Guitar'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "" },
  { id: 11, name: '정주영', category: ['Guitar'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "" },
  { id: 12, name: '안창현', category: ['MIDI','Acoustics'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "" },
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

  // 필터링 로직 수정 (includes 사용)
  const filteredInstructors = activeTab === 'All'
    ? instructorsData
    : instructorsData.filter(instructor => instructor.category.includes(activeTab));

  const tabs = Object.keys(tabLabels);

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
          <InstructorCard key={instructor.id}>
            <CardImage src={instructor.image} alt={instructor.name} />
            <CardBody>
              <h3>{instructor.name}</h3>
              {/* 여러 카테고리를 표시하도록 수정 */}
              <p className="specialty">{instructor.category.map(cat => tabLabels[cat] || cat).join(' / ')}</p>
              <p className="bio">{instructor.cardBio}</p>
            </CardBody>
          </InstructorCard>
        ))}
      </InstructorGrid>
    </PageContainer>
  );
};

export default InstructorsPage;
