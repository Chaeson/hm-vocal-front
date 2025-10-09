// frontend/src/pages/InstructorsPage.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// --- 데이터 정의 ---
const instructorsData = [
  // 보컬 강사진
  {
    id: 'vocal1',
    name: '김보컬',
    specialty: '팝, 발라드 전문',
    bio: '서울예술대학교 실용음악과 졸업. 다수 앨범 코러스 및 가이드 녹음 참여. 개인의 목소리 톤과 감성을 살리는 레슨으로 정평.',
    image: 'https://images.pexels.com/photos/3775540/pexels-photo-3775540.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'vocal',
  },
  {
    id: 'vocal2',
    name: '이소울',
    specialty: 'R&B, 소울, 재즈',
    bio: '버클리 음대 출신. 그루브와 리듬감을 중심으로 한 레슨 진행. 다수의 해외 공연 및 페스티벌 참가 경력.',
    image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'vocal',
  },
  {
    id: 'vocal3',
    name: '박락커',
    specialty: '락, 메탈 고음 발성',
    bio: '20년 경력의 락 밴드 프론트맨. 스크래치, 그로울링 등 파워풀한 발성법 전문. 수강생의 잠재된 에너지를 폭발시키는 수업.',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'vocal',
  },
  // 악기 강사진
  {
    id: 'inst1',
    name: '최기타',
    specialty: '어쿠스틱, 핑거스타일',
    bio: '유명 싱어송라이터들의 라이브 세션 및 편곡 참여. 코드 이론부터 고급 테크닉까지, 눈높이에 맞춘 체계적인 수업.',
    image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'instrument',
  },
  {
    id: 'inst2',
    name: '정피아노',
    specialty: '재즈, 반주법',
    bio: '클래식과 재즈를 넘나드는 폭넓은 스펙트럼. 다수의 재즈 클럽 연주 및 뮤지컬 반주 경력. 실용적인 반주법 위주 레슨.',
    image: 'https://images.pexels.com/photos/462432/pexels-photo-462432.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'instrument',
  },
];

// --- 스타일 컴포넌트 ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem; // 제목이 사라졌으므로 간격 조정
  padding-top: 1rem; // 제목이 사라졌으므로 상단 패딩 조정
`;

const TabNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
`;

const TabButton = styled.button`
  padding: 1rem;
  font-size: 1.2rem;
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

// --- 모달 스타일 컴포넌트 ---
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const modalShow = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: ${modalShow} 0.3s ease-out;
  position: relative;
  display: flex;
  align-items: center;
  padding: 2.5rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.5rem;
    text-align: center;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0,0,0,0.3);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0,0,0,0.6);
  }
`;

const ModalImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid #f0f0f0;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const Separator = styled.div`
  width: 1px;
  align-self: stretch;
  background: #e0e0e0;

  @media (max-width: 768px) {
    width: 80%;
    height: 1px;
  }
`;

const ModalInfoWrapper = styled.div`
  flex: 1;
`;

// --- 메인 컴포넌트 ---
const InstructorsPage = () => {
  const [activeTab, setActiveTab] = useState('vocal');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const handleOpenModal = (instructor) => {
    setSelectedInstructor(instructor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedInstructor(null), 300);
  };

  const filteredInstructors = instructorsData.filter(
    (instructor) => instructor.category === activeTab
  );

  return (
    <PageContainer>
      <TabNav>
        <TabButton 
          className={activeTab === 'vocal' ? 'active' : ''} 
          onClick={() => setActiveTab('vocal')}
        >
          Vocal
        </TabButton>
        <TabButton 
          className={activeTab === 'instrument' ? 'active' : ''} 
          onClick={() => setActiveTab('instrument')}
        >
          Instrument
        </TabButton>
      </TabNav>

      <InstructorGrid>
        {filteredInstructors.map(instructor => (
          <InstructorCard key={instructor.id} onClick={() => handleOpenModal(instructor)}>
            <CardImage src={instructor.image} alt={instructor.name} />
            <CardBody>
              <h3>{instructor.name}</h3>
              <p className="specialty">{instructor.specialty}</p>
              <p className="bio">{`${instructor.bio.substring(0, 50)}...`}</p>
            </CardBody>
          </InstructorCard>
        ))}
      </InstructorGrid>

      {isModalOpen && selectedInstructor && (
        <ModalBackdrop onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <ModalImage src={selectedInstructor.image} alt={selectedInstructor.name} />
            <Separator />
            <ModalInfoWrapper>
              <h3>{selectedInstructor.name}</h3>
              <p className="specialty">{selectedInstructor.specialty}</p>
              <p className="bio">{selectedInstructor.bio}</p>
            </ModalInfoWrapper>
          </ModalContent>
        </ModalBackdrop>
      )}

    </PageContainer>
  );
};

export default InstructorsPage;
