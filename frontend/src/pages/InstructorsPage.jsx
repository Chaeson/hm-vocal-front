import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

// 1. 이미지 import (다시 추가)
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


// --- 스타일 컴포넌트 (기존과 동일) ---
const fadeIn = keyframes` from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); }`;

const PageContainer = styled.div`
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.75rem;
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

// --- 모달 스타일 (기존과 동일) ---
const ModalBackdrop = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center; z-index: 1000;
`;
const modalShow = keyframes`from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); }`;
const ModalContent = styled.div`
  background: white; border-radius: 16px; max-width: 800px; width: 90%; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: ${modalShow} 0.3s ease-out; position: relative; display: flex; align-items: center; padding: 2.5rem; gap: 2rem;
  @media (max-width: 768px) { flex-direction: column; padding: 1.5rem; text-align: center; }
`;
const CloseButton = styled.button`
  position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.3); color: white; border: none; border-radius: 50%;
  width: 30px; height: 30px; font-size: 1.2rem; cursor: pointer; display: flex; justify-content: center; align-items: center;
  line-height: 1; transition: background 0.2s ease;
  &:hover { background: rgba(0,0,0,0.6); }
`;
const ModalImage = styled.img`
  width: 200px; height: 200px; object-fit: cover; border-radius: 50%; border: 5px solid #f0f0f0;
  @media (max-width: 768px) { width: 150px; height: 150px; }
`;
const Separator = styled.div`
  width: 1px; align-self: stretch; background: #e0e0e0;
  @media (max-width: 768px) { width: 80%; height: 1px; }
`;
const ModalInfoWrapper = styled.div` flex: 1; `;

// --- 메인 컴포넌트 ---
const InstructorsPage = () => {
  const [vocalInstructors, setVocalInstructors] = useState([]);
  const [instrumentInstructors, setInstrumentInstructors] = useState([]);
  const [writerInstructors, setWriterInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/instructors');
        const instructors = response.data;

        // 카테고리별로 강사 분류
        setVocalInstructors(instructors.filter(inst => inst.category === 'Vocal'));
        setInstrumentInstructors(instructors.filter(inst => inst.category === 'Instrument'));
        setWriterInstructors(instructors.filter(inst => inst.category === 'Writer'));
      } catch (err) {
        console.error("Failed to fetch instructors:", err);
        setError("강사 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const handleOpenModal = (instructor) => {
    setSelectedInstructor(instructor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedInstructor(null), 300);
  };

  // 이미지 파일명을 실제 URL로 변환하는 함수
  const getImageUrl = (filename) => {
    return instructorImageMap[filename] || ''; // 맵에 없으면 빈 문자열 반환
  };

  if (loading) {
    return (
      <PageContainer>
        <p>강사 정보를 불러오는 중...</p>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <p style={{ color: 'red' }}>{error}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Section>
        <SectionTitle>Vocal</SectionTitle>
        <InstructorGrid>
          {vocalInstructors.length > 0 ? (
            vocalInstructors.map(instructor => ( // Fragment 제거
              <InstructorCard key={instructor.id} onClick={() => handleOpenModal(instructor)}>
                <CardImage src={getImageUrl(instructor.image)} alt={instructor.name} />
                <CardBody>
                  <h3>{instructor.name}</h3>
                  <p className="specialty">{instructor.specialty}</p>
                  <p className="bio">{instructor.cardBio}</p>
                </CardBody>
              </InstructorCard>
            ))
          ) : (
            <p>등록된 보컬 강사가 없습니다.</p>
          )}
        </InstructorGrid>
      </Section>

      <Section>
        <SectionTitle>Instrument</SectionTitle>
        <InstructorGrid>
          {instrumentInstructors.length > 0 ? (
            instrumentInstructors.map(instructor => ( // Fragment 제거
              <InstructorCard key={instructor.id} onClick={() => handleOpenModal(instructor)}>
                <CardImage src={getImageUrl(instructor.image)} alt={instructor.name} />
                <CardBody>
                  <h3>{instructor.name}</h3>
                  <p className="specialty">{instructor.specialty}</p>
                  <p className="bio">{instructor.cardBio}</p>
                </CardBody>
              </InstructorCard>
            ))
          ) : (
            <p>등록된 악기 강사가 없습니다.</p>
          )}
        </InstructorGrid>
      </Section>

      <Section>
        <SectionTitle>Writer</SectionTitle>
        <InstructorGrid>
          {writerInstructors.length > 0 ? (
            writerInstructors.map(instructor => ( // Fragment 제거
              <InstructorCard key={instructor.id} onClick={() => handleOpenModal(instructor)}>
                <CardImage src={getImageUrl(instructor.image)} alt={instructor.name} />
                <CardBody>
                  <h3>{instructor.name}</h3>
                  <p className="specialty">{instructor.specialty}</p>
                  <p className="bio">{instructor.cardBio}</p>
                </CardBody>
              </InstructorCard>
            ))
          ) : (
            <p>등록된 작곡/작사가 강사가 없습니다.</p>
          )}
        </InstructorGrid>
      </Section>

      {isModalOpen && selectedInstructor && (
        <ModalBackdrop onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => handleCloseModal()}>&times;</CloseButton>
            <ModalImage src={getImageUrl(selectedInstructor.image)} alt={selectedInstructor.name} />
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
