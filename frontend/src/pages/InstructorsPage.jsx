import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// 1. 이미지 import
import daeyoungLeeImage from '@/assets/images/instructors/v_daeyoung_lee.jpg';
import eunkyoungImage from '@/assets/images/instructors/v_eunkyoung_chu.jpg';
import jiyeonImage from '@/assets/images/instructors/v_jiyeon_kim.jpg';
import jiyoungImage from '@/assets/images/instructors/v_jiyoung_park.jpg';
import mijiImage from '@/assets/images/instructors/v_miji_kim.jpg';
import juntaeImage from '@/assets/images/instructors/i_juntae_kim.jpg';
import seulbeeImage from '@/assets/images/instructors/i_seulbee_lee.jpg';
import minyoungImage from '@/assets/images/instructors/w_minyoung_kim.jpg';

// 2. 이미지 맵 생성
const instructorImageMap = {
  'v_daeyoung_lee.jpg': daeyoungLeeImage.src,
  'v_eunkyoung_chu.jpg': eunkyoungImage.src,
  'v_jiyeon_kim.jpg': jiyeonImage.src,
  'v_jiyoung_park.jpg': jiyoungImage.src,
  'v_miji_kim.jpg': mijiImage.src,
  'i_juntae_kim.jpg': juntaeImage.src,
  'i_seulbee_lee.jpg': seulbeeImage.src,
  'w_minyoung_kim.jpg': minyoungImage.src,
};

// --- 스타일 컴포넌트 ---
const fadeIn = keyframes` from { opacity: 0; } to { opacity: 1; }`;
const PageContainer = styled.div` padding: 2rem; `;
const PageTitle = styled.h1` font-size: 2.8rem; font-weight: 700; margin-bottom: 3rem; text-align: center; `;
const InstructorGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2.5rem; width: 100%; `;
const InstructorCard = styled.div`
  background: #fff; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.08);
  overflow: hidden; display: flex; flex-direction: column; animation: ${fadeIn} 0.6s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer;
  &:hover { transform: translateY(-5px); box-shadow: 0 12px 24px rgba(0,0,0,0.12); }
`;
const CardImage = styled.img` width: 100%; height: 280px; object-fit: cover; `;
const CardBody = styled.div`
  padding: 1.5rem; flex-grow: 1;
  h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
  p.specialty { font-size: 1rem; font-weight: 500; color: var(--primary-color); margin-bottom: 1rem; }
  p.bio { font-size: 0.95rem; line-height: 1.6; color: #666; }
`;

// --- 모달 스타일 ---
const ModalBackdrop = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* 반투명 검은 배경 복원 */
  display: flex; justify-content: center; align-items: center; z-index: 1000;
  animation: ${fadeIn} 0.3s;
`;
const ModalContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const modalShow = keyframes`from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); }`;
const ModalContent = styled.div`
  background: white; border-radius: 16px; max-width: 800px; width: 90%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: ${modalShow} 0.3s ease-out;
  position: relative; display: flex; align-items: stretch; /* align-items 변경 */
  padding: 0; /* 패딩 제거 */
  max-height: 90vh;
  overflow: hidden; /* 내부 컨텐츠가 모서리를 벗어나지 않도록 */

  @media (max-width: 768px) { 
    flex-direction: column; padding: 0;
    overflow-y: auto;
  }
`;
const CloseButton = styled.button`
  position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.3); color: white; border: none; border-radius: 50%;
  width: 30px; height: 30px; font-size: 1.2rem; cursor: pointer; display: flex; justify-content: center; align-items: center;
  line-height: 1; transition: background 0.2s ease; z-index: 10;
  &:hover { background: rgba(0,0,0,0.6); }
`;
const ModalImage = styled.img`
  width: 300px; /* 이미지 너비 조정 */
  height: auto; /* 높이 자동 조정 */
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`;
const ModalInfoWrapper = styled.div`
  flex: 1; text-align: left;
  overflow-y: auto;
  padding: 2.5rem;
  min-height: 0;

  h3 { font-size: 2rem; margin-bottom: 0.75rem; }
  p.specialty { font-size: 1.1rem; font-weight: 500; color: var(--primary-color); margin-bottom: 1.5rem; }
  p.bio { font-size: 1rem; line-height: 1.7; color: #555; }
`;
const NavButton = styled.button`
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(0,0,0,0.3); color: white; border: none; border-radius: 50%;
  width: 40px; height: 40px; font-size: 1.5rem; cursor: pointer;
  display: flex; justify-content: center; align-items: center;
  transition: background 0.2s ease; z-index: 5;
  &:hover { background: rgba(0,0,0,0.6); }
  &.prev { left: -60px; }
  &.next { right: -60px; }
  @media (max-width: 950px) {
    &.prev { left: 10px; }
    &.next { right: 10px; }
  }
`;

// --- 메인 컴포넌트 ---
const InstructorsPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInstructorIndex, setSelectedInstructorIndex] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        console.log(apiUrl)
        const response = await axios.get(`${apiUrl}/api/instructors`);
        const data = response.data;
        const categoryOrder = ['Vocal', 'Instrument', 'Writer'];
        const sortedInstructors = data.sort((a, b) => {
          const categoryA = categoryOrder.indexOf(a.category);
          const categoryB = categoryOrder.indexOf(b.category);
          if (categoryA !== categoryB) return categoryA - categoryB;
          return a.priority - b.priority;
        });
        setInstructors(sortedInstructors);
      } catch (err) {
        setError("강사 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  const handleOpenModal = (index) => setSelectedInstructorIndex(index);
  const handleCloseModal = () => setSelectedInstructorIndex(null);

  const handleNext = () => {
    if (selectedInstructorIndex === null) return;
    const nextIndex = (selectedInstructorIndex + 1) % instructors.length;
    setSelectedInstructorIndex(nextIndex);
  };

  const handlePrev = () => {
    if (selectedInstructorIndex === null) return;
    const prevIndex = (selectedInstructorIndex - 1 + instructors.length) % instructors.length;
    setSelectedInstructorIndex(prevIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedInstructorIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') handleCloseModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedInstructorIndex, instructors]);

  const getImageUrl = (filename) => instructorImageMap[filename] || '';

  if (loading) return <PageContainer><p>강사 정보를 불러오는 중...</p></PageContainer>;
  if (error) return <PageContainer><p style={{ color: 'red' }}>{error}</p></PageContainer>;

  const selectedInstructor = selectedInstructorIndex !== null ? instructors[selectedInstructorIndex] : null;

  return (
    <PageContainer>
      <PageTitle>강사진</PageTitle>
      <InstructorGrid>
        {instructors.map((instructor, index) => (
          <InstructorCard key={instructor.id} onClick={() => handleOpenModal(index)}>
            <CardImage src={getImageUrl(instructor.image)} alt={instructor.name} />
            <CardBody>
              <h3>{instructor.name}</h3>
              <p className="specialty">{instructor.category}</p>
              <p className="bio">{instructor.cardBio}</p>
            </CardBody>
          </InstructorCard>
        ))}
      </InstructorGrid>

      {selectedInstructor && (
        <ModalBackdrop onClick={handleCloseModal}>
          <ModalContainer>
            <NavButton className="prev" onClick={(e) => { e.stopPropagation(); handlePrev(); }}><FaChevronLeft /></NavButton>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
              <ModalImage src={getImageUrl(selectedInstructor.image)} alt={selectedInstructor.name} />
              <ModalInfoWrapper>
                <h3>{selectedInstructor.name}</h3>
                <p className="specialty">{selectedInstructor.category}</p>
                <p className="bio">{selectedInstructor.bio}</p>
              </ModalInfoWrapper>
            </ModalContent>
            <NavButton className="next" onClick={(e) => { e.stopPropagation(); handleNext(); }}><FaChevronRight /></NavButton>
          </ModalContainer>
        </ModalBackdrop>
      )}
    </PageContainer>
  );
};

export default InstructorsPage;
