import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// --- 임시 데이터 (src, type 추가) ---
const videoPlaylistData = {
  title: '영상 자료',
  tracks: [
    { id: 1, title: 'For Bigger Blazes', artist: 'Blender Foundation', type: 'video', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', coverArt: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg' },
    { id: 2, title: 'Elephant\'s Dream', artist: 'Blender Foundation', type: 'video', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', coverArt: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg' },
    { id: 3, title: 'For Bigger Fun', artist: 'Blender Foundation', type: 'video', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', coverArt: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg' },
  ],
};

const recordingPlaylistData = {
  title: '녹음 자료',
  tracks: [
    { id: 1, title: '첫 소절 (Audio)', artist: '김제미', type: 'audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', coverArt: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 2, title: 'My Dream (Video)', artist: '박노래', type: 'video', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', coverArt: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217' },
    { id: 3, title: '목소리 (Audio)', artist: '이보컬', type: 'audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', coverArt: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ],
};

const bgImages = [
  'https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

// --- 스타일 컴포넌트 ---
const fadeIn = keyframes` from { opacity: 0; } to { opacity: 1; }`;
const HeroLayout = styled.section`
  position: relative; 
  display: flex; 
  align-items: center; 
  height: 100vh; 
  padding: 0 550px 0 6rem; // 오른쪽 패딩으로 InteractiveArea 공간 확보
  color: white;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props => props.bgImage}) center/cover no-repeat;
  transition: background-image 1s ease-in-out; 
  overflow: hidden; 
  width: 100%;
  
  @media (max-width: 1024px) { 
    padding: 0 450px 0 3rem; // 태블릿 사이즈에 맞게 패딩 조정
  }
  @media (max-width: 768px) { 
    flex-direction: column; 
    justify-content: center; 
    height: auto; 
    min-height: 100vh; 
    padding: 5rem 2rem; // 모바일에서는 패딩 리셋
    text-align: center; 
  }
`;
const Content = styled.div`
  animation: ${fadeIn} 1s ease-out;
  z-index: 2;
  width: 100%; // 확보된 공간을 모두 사용
  text-align: center;

  @media (max-width: 768px) {
    width: auto; // 모바일에서는 자동 너비
    margin-bottom: 3rem;
  }
`;
const Title = styled.h1`
  font-size: 3.5rem; font-weight: 700; margin-bottom: 1rem; text-shadow: 0 2px 8px rgba(0,0,0,0.7);
`;
const Subtitle = styled.p`
  font-size: 1.5rem; font-weight: 300; text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`;
const InteractiveArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 500px;
  
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px) saturate(180%);
  
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 3;
  
  @media (max-width: 1024px) {
    width: 400px;
  }
  @media (max-width: 768px) {
    position: static;
    width: 100%;
    height: auto;
    max-height: 400px;
    background-color: #ffffff;
    backdrop-filter: none;
  }
`;
const TabMenu = styled.div`
  display: flex; justify-content: center; border-bottom: 1px solid rgba(0, 0, 0, 0.1); flex-shrink: 0;
`;
const TabButton = styled.button`
  padding: 1rem 1.5rem; font-size: 1rem; font-weight: 600; background: none; border: none; cursor: pointer;
  color: ${props => props.active ? '#007bff' : '#333'}; border-bottom: 3px solid ${props => props.active ? '#007bff' : 'transparent'};
  transition: all 0.2s ease-in-out;
  &:hover { color: #007bff; background-color: rgba(0, 0, 0, 0.05); }
`;
const ContentPanel = styled.div`
  flex-grow: 1; overflow-y: auto; padding: 1rem;
`;
const PreviewItem = styled.div`
  display: flex; align-items: center; margin: 0.5rem; padding: 0.75rem; border-radius: 8px;
  transition: background-color 0.2s; cursor: pointer;
  &:hover { background-color: rgba(0, 0, 0, 0.05); }
  img { width: 50px; height: 50px; object-fit: cover; border-radius: 4px; margin-right: 1rem; flex-shrink: 0; }
  div { p { margin: 0; color: #333; } .title { font-weight: 600; } .artist { font-size: 0.9rem; color: #666; } }
`;

// --- 모달 스타일 ---
const ModalBackdrop = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s;
`;
const ModalContent = styled.div`
  background: white; border-radius: 16px; padding: 1rem;
  max-width: 900px; width: 90%;
  position: relative;
`;
const CloseButton = styled.button`
  position: absolute; top: -40px; right: 0;
  background: none; color: white; border: none;
  font-size: 2.5rem; cursor: pointer;
`;
const PlayerWrapper = styled.div`
  width: 100%;
  video, audio { width: 100%; border-radius: 8px; }
`;

// --- 컴포넌트 ---
const DataPreview = ({ tracks, onItemClick }) => (
  <div>
    {tracks.map(track => (
      <PreviewItem key={track.id} onClick={() => onItemClick(track)}>
        <img src={track.coverArt} alt={track.title} />
        <div>
          <p className="title">{track.title}</p>
          <p className="artist">{track.artist}</p>
        </div>
      </PreviewItem>
    ))}
  </div>
);

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('video');
  const [modalItem, setModalItem] = useState(null);
  const isScrolling = useRef(false);

  useEffect(() => { /* 이미지 슬라이더 로직 */
    const interval = setInterval(() => { setCurrentImageIndex(prev => (prev + 1) % bgImages.length); }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { /* 스크롤 이벤트 로직 */
    const handleWheel = (e) => {
      if (isScrolling.current) return;
      if (window.scrollY < window.innerHeight && e.deltaY > 0 && window.scrollY < 10) {
        e.preventDefault();
        isScrolling.current = true;
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        setTimeout(() => { isScrolling.current = false; }, 1000);
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <>
      <HeroLayout bgImage={bgImages[currentImageIndex]}>
        <Content>
          <Title>당신의 목소리가 작품이 되는 곳</Title>
          <Subtitle>최고의 강사진과 함께 꿈을 현실로 만드세요.</Subtitle>
        </Content>
        <InteractiveArea>
          <TabMenu>
            <TabButton active={activeTab === 'video'} onClick={() => setActiveTab('video')}>영상 자료</TabButton>
            <TabButton active={activeTab === 'audio'} onClick={() => setActiveTab('audio')}>녹음 자료</TabButton>
          </TabMenu>
          <ContentPanel>
            {activeTab === 'video' ? (
              <DataPreview tracks={videoPlaylistData.tracks} onItemClick={setModalItem} />
            ) : (
              <DataPreview tracks={recordingPlaylistData.tracks} onItemClick={setModalItem} />
            )}
          </ContentPanel>
        </InteractiveArea>
      </HeroLayout>

      {/* 모달 렌더링 */}
      {modalItem && (
        <ModalBackdrop onClick={() => setModalItem(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setModalItem(null)}>&times;</CloseButton>
            <PlayerWrapper>
              {modalItem.type === 'video' ? (
                <video src={modalItem.src} controls autoPlay />
              ) : (
                <audio src={modalItem.src} controls autoPlay />
              )}
            </PlayerWrapper>
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
};

export default HeroSection;
