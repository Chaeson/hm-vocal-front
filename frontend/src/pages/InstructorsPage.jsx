import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { IoIosArrowDown, IoIosClose } from 'react-icons/io'; // Ensure react-icons is installed

// 1. 이미지 import (현재 데이터에 이미지가 없으므로 주석 처리 또는 플레이스홀더 사용)
// import daeyoungLeeImage from '@/assets/images/instructors/v_daeyoung_lee.jpg';

// 2. 정적 데이터 생성 (초기값)
const initialInstructorsData = [
  { id: 1, name: '이대영', category: ['Vocal'], cardBio: '감성을 자극하는 목소리, 맞춤형 보컬 트레이닝 전문가.', image: "" },
  { id: 2, name: '김미지', category: ['Vocal', 'Piano'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "" },
  { id: 3, name: '박지영', category: ['Vocal'], cardBio: '다양한 장르를 소화하는 실전형 보컬 트레이너.', image: "" },
  { id: 4, name: '김지연', category: ['Vocal'], cardBio: '기초부터 탄탄하게, 정확한 음정과 발성을 지도합니다.', image: "" },
  { id: 5, name: '추은경', category: ['Vocal'], cardBio: '파워풀한 고음과 섬세한 표현력을 위한 보컬 코치.', image: "" },
  { id: 6, name: '한혜영', category: ['Vocal'], cardBio: '따뜻한 음색과 풍부한 감성 표현의 노하우를 전수합니다.', image: "" },
  { id: 7, name: '권예린', category: ['Piano', 'Writer', 'Harmonics', 'AuralSkills'], cardBio: '피아노 연주와 함께하는 시창청음 및 화성학.', image: "" },
  { id: 8, name: '김민영', category: ['Piano', 'Writer', 'Harmonics', 'AuralSkills'], cardBio: '작사/작곡 입문부터 프로까지, 자신만의 음악 만들기.', image: "" },
  { id: 9, name: '이슬비', category: ['Piano', 'AuralSkills'], cardBio: '클래식과 재즈를 넘나드는 피아노 레슨.', image: "" },
  { id: 10, name: '김준태', category: ['Guitar'], cardBio: '기타, 베이스, 드럼 등 밴드 악기 전문 레슨.', image: "" },
  { id: 11, name: '정주영', category: ['Guitar'], cardBio: '어쿠스틱 감성부터 일렉트릭 사운드까지 마스터.', image: "" },
  { id: 12, name: '안창현', category: ['MIDI', 'Acoustics'], cardBio: '트렌디한 사운드 메이킹과 프로페셔널한 믹싱/마스터링.', image: "" },
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
  Acoustics: '음향학',
};

// --- 스타일 컴포넌트 ---
const fadeIn = keyframes` from { opacity: 0; } to { opacity: 1; }`;
const PageContainer = styled.div` padding: 2rem; position: relative; `;
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

// --- Upload Modal Styles ---
const UploadButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  background-color: var(--primary-color, #3498db);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  cursor: pointer;
  z-index: 90;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.3);
  }
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 500px;
  max-width: 90vw;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  animation: ${zoomIn} 0.3s ease-out;
`;

const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #555;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;
    
    &:focus {
      border-color: var(--primary-color, #3498db);
      outline: none;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color, #3498db);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #2980b9;
  }
`;

// --- Custom Multi-Select Styles ---
const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectTrigger = styled.div`
  width: 100%;
  min-height: 45px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  background: white;
  transition: border-color 0.2s;

  &:hover {
    border-color: #bbb;
  }
`;

const Tag = styled.span`
  background: var(--primary-color, #3498db);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const RemoveTag = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover { opacity: 0.8; }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 1000;
  margin-top: 0.3rem;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled.div`
  padding: 0.8rem;
  cursor: pointer;
  background: ${props => props.isSelected ? '#f0f9ff' : 'white'};
  color: ${props => props.isSelected ? 'var(--primary-color, #3498db)' : '#333'};
  font-weight: ${props => props.isSelected ? '600' : 'normal'};
  
  &:hover {
    background: #f5f5f5;
  }
`;


// --- 메인 컴포넌트 ---
const InstructorsPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [instructors, setInstructors] = useState(initialInstructorsData);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload Form State
  const [formData, setFormData] = useState({
    name: '',
    category: ['Vocal'],
    cardBio: '',
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // MultiSelect State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch instructors from backend on mount
  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/instructors');
      if (response.data && response.data.length > 0) {
        setInstructors([...initialInstructorsData, ...response.data]);
      }
    } catch (error) {
      console.error("Failed to fetch instructors:", error);
    }
  };

  const filteredInstructors = activeTab === 'All'
    ? instructors
    : instructors.filter(instructor => instructor.category.includes(activeTab));

  const tabs = Object.keys(tabLabels);

  const handleCardClick = (id) => setExpandedId(id);
  const handleCloseExpanded = () => setExpandedId(null);

  const expandedInstructor = expandedId
    ? instructors.find(inst => inst.id === expandedId)
    : null;

  // Upload Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (categoryKey) => {
    setFormData(prev => {
      const currentCategories = prev.category;
      if (currentCategories.includes(categoryKey)) {
        return { ...prev, category: currentCategories.filter(c => c !== categoryKey) };
      } else {
        return { ...prev, category: [...currentCategories, categoryKey] };
      }
    });
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image) {
      alert("이름과 이미지는 필수입니다.");
      return;
    }
    if (formData.category.length === 0) {
      alert("최소 하나의 카테고리를 선택해주세요.");
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', JSON.stringify(formData.category));
    data.append('cardBio', formData.cardBio);
    data.append('image', formData.image);

    try {
      await axios.post('http://localhost:8080/api/instructors', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("강사가 성공적으로 등록되었습니다!");
      setIsUploadModalOpen(false);
      setFormData({ name: '', category: ['Vocal'], cardBio: '', image: null });
      fetchInstructors(); // Refresh list
    } catch (error) {
      console.error("Upload failed:", error);
      alert("업로드 실패: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <UploadButton onClick={() => setIsUploadModalOpen(true)}>
        + 강사 추가
      </UploadButton>

      {isUploadModalOpen && (
        <ExpandedViewBackdrop onClick={() => setIsUploadModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <FormTitle>새 강사 등록</FormTitle>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label>이름</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </FormGroup>
              <FormGroup>
                <label>카테고리</label>
                <SelectContainer ref={dropdownRef}>
                  <SelectTrigger onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    {formData.category.length > 0 ? (
                      formData.category.map(cat => (
                        <Tag key={cat} onClick={(e) => { e.stopPropagation(); handleCategoryToggle(cat); }}>
                          {tabLabels[cat]}
                          <RemoveTag><IoIosClose /></RemoveTag>
                        </Tag>
                      ))
                    ) : (
                      <span style={{ color: '#aaa' }}>카테고리를 선택하세요</span>
                    )}
                    <IoIosArrowDown style={{ marginLeft: 'auto', color: '#888' }} />
                  </SelectTrigger>
                  <DropdownMenu isOpen={isDropdownOpen}>
                    {Object.keys(tabLabels).filter(k => k !== 'All').map(key => (
                      <DropdownItem
                        key={key}
                        isSelected={formData.category.includes(key)}
                        onClick={() => handleCategoryToggle(key)}
                      >
                        {tabLabels[key]}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </SelectContainer>
              </FormGroup>
              <FormGroup>
                <label>소개 (Bio)</label>
                <textarea name="cardBio" value={formData.cardBio} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <label>프로필 이미지</label>
                <input type="file" accept="image/*" onChange={handleFileChange} required />
              </FormGroup>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? '업로드 중...' : '등록하기'}
              </SubmitButton>
            </form>
          </ModalContent>
        </ExpandedViewBackdrop>
      )}
    </PageContainer>
  );
};

export default InstructorsPage;
