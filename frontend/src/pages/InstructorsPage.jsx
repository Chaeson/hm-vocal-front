import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import apiClient from '@/api/axios'; // apiClient import
import { IoIosArrowDown, IoIosClose } from 'react-icons/io';

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
  p.bio { 
    font-size: 1.1rem; 
    line-height: 1.8; 
    color: #555; 
    white-space: pre-wrap;
  }
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
  const [instructors, setInstructors] = useState([]);
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
      const response = await apiClient.get('/api/instructors');
      if (response.data && response.data.length > 0) {
        setInstructors(response.data);
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
      await apiClient.post('/api/instructors', data, {
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
                <p className="bio">{expandedInstructor.cardBio && expandedInstructor.cardBio.replace(/\r\n/g, '\n')}</p>
              </ExpandedBody>
            </ExpandedCard>
          </ExpandedWrapper>
        </ExpandedViewBackdrop>
      )}
    </PageContainer>
  );
};

export default InstructorsPage;
