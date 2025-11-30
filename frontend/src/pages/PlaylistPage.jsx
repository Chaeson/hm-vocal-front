import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaPlay, FaHeadphones, FaCompactDisc } from 'react-icons/fa';
import axios from 'axios';

// 탭 레이블 맵
const tabLabels = {
  Video: '영상 자료',
  Recording: '수강생 녹음',
  Album: '음원 발매',
};

// --- 스타일 컴포넌트 (기존 유지) ---
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

const MediaGrid = styled.div` 
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
  gap: 2.5rem; 
  width: 100%; 
`;

const MediaCard = styled.div`
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

const CardThumbnail = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  background-color: #000;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
  }
  
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    color: white;
    opacity: 0.8;
    transition: opacity 0.2s;
    ${MediaCard}:hover & {
      opacity: 1;
    }
  }
`;

const CardBody = styled.div`
  padding: 1.5rem; 
  flex-grow: 1;
  
  h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
  p { font-size: 0.95rem; color: #666; }
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
  max-width: 1000px;
  max-height: 85vh;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.2);
  display: flex;
  overflow: hidden;
  animation: ${zoomIn} 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  @media (max-width: 768px) {
    flex-direction: column;
    width: 95vw;
    max-height: 90vh;
  }
`;

const PlayerContainer = styled.div`
  width: 55%;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`;

const ExpandedBody = styled.div`
  padding: 3rem;
  flex-grow: 1;
  overflow-y: auto;
  
  h3 { font-size: 2.5rem; margin-bottom: 1rem; }
  p.artist { font-size: 1.2rem; color: #555; margin-bottom: 2rem; }
  p.bio { font-size: 1rem; line-height: 1.8; color: #666; }
  audio { width: 100%; margin-top: 2rem; }
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

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #999;
  font-size: 1.2rem;
`;

// --- 메인 컴포넌트 ---
const PlaylistPage = () => {
  const tabs = Object.keys(tabLabels);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [studentWorks, setStudentWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentWorks();
  }, []);

  const fetchStudentWorks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/student-works');
      if (response.data) {
        setStudentWorks(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch student works:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMedia = studentWorks.filter(item => item.category === activeTab);

  const handleCardClick = (item) => {
    setExpandedItem(item);
  };

  const handleClose = () => {
    setExpandedItem(null);
  };

  const getIcon = (category) => {
    switch (category) {
      case 'Video':
        return <FaPlay />;
      case 'Recording':
        return <FaHeadphones />;
      case 'Album':
        return <FaCompactDisc />;
      default:
        return <FaPlay />;
    }
  };

  return (
    <PageContainer>
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

      {loading ? (
        <EmptyState>작품을 불러오는 중...</EmptyState>
      ) : filteredMedia.length === 0 ? (
        <EmptyState>등록된 작품이 없습니다.</EmptyState>
      ) : (
        <MediaGrid>
          {filteredMedia.map((item) => (
            <MediaCard key={item.id} onClick={() => handleCardClick(item)}>
              <CardThumbnail>
                <img src={item.coverImage} alt={item.title} />
                {getIcon(item.category)}
              </CardThumbnail>
              <CardBody>
                <h3>{item.title}</h3>
                <p>{item.studentName}</p>
              </CardBody>
            </MediaCard>
          ))}
        </MediaGrid>
      )}

      {expandedItem && (
        <ExpandedViewBackdrop onClick={handleClose}>
          <ExpandedWrapper>
            <CloseButton onClick={handleClose}>&times;</CloseButton>
            <ExpandedCard onClick={(e) => e.stopPropagation()}>
              <PlayerContainer>
                {expandedItem.category === 'Video' && expandedItem.mediaFile ? (
                  <video src={expandedItem.mediaFile} controls autoPlay />
                ) : (
                  <img src={expandedItem.coverImage} alt={expandedItem.title} />
                )}
              </PlayerContainer>
              <ExpandedBody>
                <h3>{expandedItem.title}</h3>
                <p className="artist">{expandedItem.studentName}</p>
                {(expandedItem.category === 'Recording' || expandedItem.category === 'Album') && expandedItem.mediaFile && (
                  <audio src={expandedItem.mediaFile} controls autoPlay />
                )}
              </ExpandedBody>
            </ExpandedCard>
          </ExpandedWrapper>
        </ExpandedViewBackdrop>
      )}
    </PageContainer>
  );
};

export default PlaylistPage;
