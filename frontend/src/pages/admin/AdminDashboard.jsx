// frontend/src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import apiClient from '@/api/axios'; // apiClient import
import { IoIosArrowDown, IoIosClose } from 'react-icons/io';

// --- 탭 레이블 맵 (카테고리 표시용) ---
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
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const DashboardContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: #f5f7fa;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin: 0;
  color: #2c3e50;
`;

const DashboardContent = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  flex: 0 0 250px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
`;

const MenuTitle = styled.div`
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
`;

const MenuItem = styled.div`
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 4px solid transparent;
  background: ${props => props.active ? '#f0f4ff' : 'white'};
  border-left-color: ${props => props.active ? '#667eea' : 'transparent'};
  color: ${props => props.active ? '#667eea' : '#555'};
  font-weight: ${props => props.active ? '600' : '400'};

  &:hover {
    background: #f8f9fa;
    color: #667eea;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 2rem;
  animation: ${fadeIn} 0.3s ease-in;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

const PanelTitle = styled.h2`
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
`;

const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ItemCard = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
  background: white;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  padding: 1.25rem;
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
`;

const ItemCategory = styled.p`
  font-size: 0.9rem;
  color: #667eea;
  margin: 0;
  font-weight: 500;
`;

const ItemContent = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0 0 0;
  line-height: 1.5;
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease-in;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideIn} 0.3s ease-out;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #555;
    font-size: 0.95rem;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e8e8e8;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
    font-family: inherit;
    
    &:focus {
      border-color: #667eea;
      outline: none;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 120px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

// Custom Multi-Select Styles
const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectTrigger = styled.div`
  width: 100%;
  min-height: 45px;
  padding: 0.5rem;
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  background: white;
  transition: border-color 0.2s;

  &:hover {
    border-color: #667eea;
  }
`;

const Tag = styled.span`
  background: #667eea;
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
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 1000;
  margin-top: 0.5rem;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  background: ${props => props.isSelected ? '#f0f4ff' : 'white'};
  color: ${props => props.isSelected ? '#667eea' : '#333'};
  font-weight: ${props => props.isSelected ? '600' : 'normal'};
  
  &:hover {
    background: #f8f9fa;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #999;
  font-size: 1.1rem;
`;

// --- 메인 컴포넌트 ---
const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('instructors');
  const [showModal, setShowModal] = useState(false);

  const [instructors, setInstructors] = useState([]);
  const [studentWorks, setStudentWorks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    category: ['Vocal'],
    cardBio: '',
    image: null
  });

  const [workFormData, setWorkFormData] = useState({
    category: 'Video',
    title: '',
    studentName: '',
    coverImage: null,
    mediaFile: null
  });

  const [announcementFormData, setAnnouncementFormData] = useState({
    title: '',
    content: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await apiClient.get('/api/instructors');
      if (response.data) {
        setInstructors(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch instructors:", error);
    }
  };

  const fetchStudentWorks = async () => {
    try {
      const response = await apiClient.get('/api/student-works');
      if (response.data) {
        setStudentWorks(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch student works:", error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await apiClient.get('/api/announcements');
      if (response.data) {
        setAnnouncements(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
    }
  };

  useEffect(() => {
    fetchInstructors();
    fetchStudentWorks();
    fetchAnnouncements();
  }, []);

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
      setFormData({ name: '', category: ['Vocal'], cardBio: '', image: null });
      setShowModal(false);
      fetchInstructors();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("업로드 실패: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWorkInputChange = (e) => {
    const { name, value } = e.target;
    setWorkFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWorkFileChange = (e) => {
    const { name, files } = e.target;
    setWorkFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleWorkSubmit = async (e) => {
    e.preventDefault();
    if (!workFormData.title || !workFormData.studentName || !workFormData.coverImage) {
      alert("제목, 수강생명, 커버 이미지는 필수입니다.");
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();
    data.append('category', workFormData.category);
    data.append('title', workFormData.title);
    data.append('studentName', workFormData.studentName);
    data.append('coverImage', workFormData.coverImage);
    if (workFormData.mediaFile) {
      data.append('mediaFile', workFormData.mediaFile);
    }

    try {
      await apiClient.post('/api/student-works', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("작품이 성공적으로 등록되었습니다!");
      setWorkFormData({
        category: 'Video',
        title: '',
        studentName: '',
        coverImage: null,
        mediaFile: null
      });
      setShowModal(false);
      fetchStudentWorks();
    } catch (error) {
      console.error("Work upload failed:", error);
      alert("업로드 실패: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnnouncementInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    if (!announcementFormData.title || !announcementFormData.content) {
      alert("제목과 내용은 필수입니다.");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post('/api/announcements', announcementFormData);
      alert("공지사항이 성공적으로 등록되었습니다!");
      setAnnouncementFormData({
        title: '',
        content: '',
        category: 'general'
      });
      setShowModal(false);
      fetchAnnouncements();
    } catch (error) {
      console.error("Announcement upload failed:", error);
      alert("업로드 실패: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'instructors':
        return (
          <>
            <PanelHeader>
              <PanelTitle>강사진 목록 ({instructors.length})</PanelTitle>
              <AddButton onClick={() => setShowModal(true)}>+ 강사 등록</AddButton>
            </PanelHeader>
            {instructors.length === 0 ? (
              <EmptyState>등록된 강사가 없습니다.</EmptyState>
            ) : (
              <ItemGrid>
                {instructors.map(inst => (
                  <ItemCard key={inst.id}>
                    <ItemImage src={inst.image} alt={inst.name} />
                    <ItemInfo>
                      <ItemName>{inst.name}</ItemName>
                      <ItemCategory>
                        {(Array.isArray(inst.category) ? inst.category : [inst.category])
                          .map(c => tabLabels[c] || c).join(', ')}
                      </ItemCategory>
                      {inst.cardBio && <ItemContent>{inst.cardBio}</ItemContent>}
                    </ItemInfo>
                  </ItemCard>
                ))}
              </ItemGrid>
            )}
          </>
        );

      case 'works':
        return (
          <>
            <PanelHeader>
              <PanelTitle>수강생 작품 목록 ({studentWorks.length})</PanelTitle>
              <AddButton onClick={() => setShowModal(true)}>+ 작품 등록</AddButton>
            </PanelHeader>
            {studentWorks.length === 0 ? (
              <EmptyState>등록된 작품이 없습니다.</EmptyState>
            ) : (
              <ItemGrid>
                {studentWorks.map(work => (
                  <ItemCard key={work.id}>
                    <ItemImage src={work.coverImage} alt={work.title} />
                    <ItemInfo>
                      <ItemName>{work.title}</ItemName>
                      <ItemCategory>
                        {work.category === 'Video' ? '영상' : work.category === 'Recording' ? '녹음' : '앨범'} | {work.studentName}
                      </ItemCategory>
                    </ItemInfo>
                  </ItemCard>
                ))}
              </ItemGrid>
            )}
          </>
        );

      case 'announcements':
        return (
          <>
            <PanelHeader>
              <PanelTitle>공지사항 목록 ({announcements.length})</PanelTitle>
              <AddButton onClick={() => setShowModal(true)}>+ 공지사항 등록</AddButton>
            </PanelHeader>
            {announcements.length === 0 ? (
              <EmptyState>등록된 공지사항이 없습니다.</EmptyState>
            ) : (
              <ItemGrid>
                {announcements.map(announcement => (
                  <ItemCard key={announcement.id}>
                    <ItemInfo style={{ padding: '1.5rem' }}>
                      <ItemName>{announcement.title}</ItemName>
                      <ItemCategory>
                        {announcement.category === 'general' ? '일반' : announcement.category === 'event' ? '이벤트' : '공지'}
                      </ItemCategory>
                      <ItemContent>
                        {announcement.content.length > 150 ? announcement.content.substring(0, 150) + '...' : announcement.content}
                      </ItemContent>
                    </ItemInfo>
                  </ItemCard>
                ))}
              </ItemGrid>
            )}
          </>
        );

      default:
        return null;
    }
  };

  const renderModal = () => {
    if (!showModal) return null;

    let modalTitle = '';
    let modalForm = null;

    switch (activeMenu) {
      case 'instructors':
        modalTitle = '새 강사 등록';
        modalForm = (
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
        );
        break;

      case 'works':
        modalTitle = '수강생 작품 등록';
        modalForm = (
          <form onSubmit={handleWorkSubmit}>
            <FormGroup>
              <label>카테고리</label>
              <select name="category" value={workFormData.category} onChange={handleWorkInputChange}>
                <option value="Video">영상</option>
                <option value="Recording">녹음</option>
                <option value="Album">앨범</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>제목</label>
              <input type="text" name="title" value={workFormData.title} onChange={handleWorkInputChange} required />
            </FormGroup>
            <FormGroup>
              <label>수강생명</label>
              <input type="text" name="studentName" value={workFormData.studentName} onChange={handleWorkInputChange} required />
            </FormGroup>
            <FormGroup>
              <label>커버 이미지</label>
              <input type="file" name="coverImage" accept="image/*" onChange={handleWorkFileChange} required />
            </FormGroup>
            <FormGroup>
              <label>미디어 파일 (선택, 최대 50MB)</label>
              <input type="file" name="mediaFile" accept="video/*,audio/*" onChange={handleWorkFileChange} />
            </FormGroup>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '업로드 중...' : '등록하기'}
            </SubmitButton>
          </form>
        );
        break;

      case 'announcements':
        modalTitle = '공지사항 등록';
        modalForm = (
          <form onSubmit={handleAnnouncementSubmit}>
            <FormGroup>
              <label>카테고리</label>
              <select name="category" value={announcementFormData.category} onChange={handleAnnouncementInputChange}>
                <option value="general">일반</option>
                <option value="event">이벤트</option>
                <option value="notice">공지</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>제목</label>
              <input type="text" name="title" value={announcementFormData.title} onChange={handleAnnouncementInputChange} required />
            </FormGroup>
            <FormGroup>
              <label>내용</label>
              <textarea name="content" value={announcementFormData.content} onChange={handleAnnouncementInputChange} required />
            </FormGroup>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '업로드 중...' : '등록하기'}
            </SubmitButton>
          </form>
        );
        break;

      default:
        return null;
    }

    return (
      <ModalOverlay onClick={() => setShowModal(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{modalTitle}</ModalTitle>
            <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
          </ModalHeader>
          {modalForm}
        </ModalContent>
      </ModalOverlay>
    );
  };

  return (
    <DashboardContainer>
      <Header>
        <Title>관리자 대시보드</Title>
      </Header>

      <DashboardContent>
        <LeftPanel>
          <MenuTitle>관리 메뉴</MenuTitle>
          <MenuItem active={activeMenu === 'instructors'} onClick={() => setActiveMenu('instructors')}>
            강사진
          </MenuItem>
          <MenuItem active={activeMenu === 'works'} onClick={() => setActiveMenu('works')}>
            작품
          </MenuItem>
          <MenuItem active={activeMenu === 'announcements'} onClick={() => setActiveMenu('announcements')}>
            공지사항
          </MenuItem>
        </LeftPanel>

        <RightPanel>
          {renderContent()}
        </RightPanel>
      </DashboardContent>

      {renderModal()}
    </DashboardContainer>
  );
};

export default AdminDashboard;
