import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaPlay, FaHeadphones } from 'react-icons/fa';

// 1. 데이터 카테고리를 명확하게 분리
const playlistData = [
  {
    id: 'student-video-1', category: ['Video'], type: 'video', title: '팝송 커버', artist: '김제미',
    cardBio: '오디션반 수강생의 열정적인 팝송 커버 영상입니다.',
    longBio: 'Adele의 "Someone Like You"를 자신만의 감성으로 재해석했습니다. 수강 3개월 차의 놀라운 성장을 확인해보세요.',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    coverArt: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'student-video-2', category: ['Video'], type: 'video', title: 'My Dream (Cover)', artist: '박노래',
    cardBio: '프로반 수강생의 완성도 높은 커버 영상입니다.',
    longBio: '꿈을 향한 진솔한 마음을 담아 부른 곡입니다. 안정적인 발성과 섬세한 감정 표현이 돋보입니다.',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    coverArt: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
  },
  { id: 'lesson-audio-1', category: ['Recording'], type: 'audio', title: '첫 소절', artist: '김제미', cardBio: '기초 발성 연습 녹음 파일입니다.', longBio: '호흡과 발성의 기본기를 다지는 레슨의 실제 녹음 파일입니다. 레슨 전후의 변화를 느껴보세요.', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', coverArt: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'lesson-audio-2', category: ['Recording'], type: 'audio', title: '목소리', artist: '이보컬', cardBio: '고음역대 확장 훈련 녹음 파일입니다.', longBio: '믹스보이스를 활용하여 고음역대를 안정적으로 내는 훈련 과정의 일부입니다.', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', coverArt: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'lesson-audio-3', category: ['Recording'], type: 'audio', title: '연습일지', artist: '정연습', cardBio: '리듬감 향상 훈련 녹음 파일입니다.', longBio: '다양한 장르의 리듬에 맞춰 노래하는 연습을 통해 그루브와 표현력을 향상시키는 과정을 담았습니다.', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', coverArt: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'release-audio-1', category: ['Release'], type: 'audio', title: '자작곡 "새벽길"', artist: '김민영', cardBio: '작곡가반 김민영 수강생의 첫 디지털 싱글입니다.', longBio: '작사, 작곡, 편곡까지 모든 과정을 직접 소화한 곡입니다. 새벽의 감성을 담은 멜로디와 가사가 인상적입니다.', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', coverArt: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

// 2. 탭 레이블 맵
const tabLabels = {
  Video: '영상 자료',
  Recording: '수강생 녹음',
  Release: '음원 발매',
};

// --- 스타일 컴포넌트 (InstructorsPage와 동일 구조) ---
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

// --- 메인 컴포넌트 ---
const PlaylistPage = () => {
  const tabs = Object.keys(tabLabels);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [expandedItem, setExpandedItem] = useState(null);

  const filteredMedia = playlistData.filter(item => item.category.includes(activeTab));

  const handleCardClick = (item) => {
    setExpandedItem(item);
  };

  const handleClose = () => {
    setExpandedItem(null);
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

      <MediaGrid>
        {filteredMedia.map((item) => (
          <MediaCard key={item.id} onClick={() => handleCardClick(item)}>
            <CardThumbnail>
              <img src={item.coverArt} alt={item.title} />
              {item.type === 'video' ? <FaPlay /> : <FaHeadphones />}
            </CardThumbnail>
            <CardBody>
              <h3>{item.title}</h3>
              <p>{item.artist}</p>
            </CardBody>
          </MediaCard>
        ))}
      </MediaGrid>

      {expandedItem && (
        <ExpandedViewBackdrop onClick={handleClose}>
          <ExpandedWrapper>
            <CloseButton onClick={handleClose}>&times;</CloseButton>
            <ExpandedCard onClick={(e) => e.stopPropagation()}>
              <PlayerContainer>
                {expandedItem.type === 'video' ? (
                  <video src={expandedItem.src} controls autoPlay />
                ) : (
                  <img src={expandedItem.coverArt} alt={expandedItem.title} />
                )}
              </PlayerContainer>
              <ExpandedBody>
                <h3>{expandedItem.title}</h3>
                <p className="artist">{expandedItem.artist}</p>
                <p className="bio">{expandedItem.longBio || expandedItem.cardBio}</p>
                {expandedItem.type === 'audio' && (
                  <audio src={expandedItem.src} controls autoPlay />
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
