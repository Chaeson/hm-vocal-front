import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

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
  padding: 0 550px 0 6rem;
  color: white;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props => props.bgImage}) center/cover no-repeat;
  transition: background-image 1s ease-in-out;
  overflow: hidden;
  width: 100%;

  @media (max-width: 1024px) {
    padding: 0 450px 0 3rem;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    height: auto;
    min-height: 100vh;
    padding: 5rem 2rem;
    text-align: center;
  }
`;
const Content = styled.div`
  animation: ${fadeIn} 1s ease-out;
  z-index: 2;
  width: 100%;
  text-align: center;

  @media (max-width: 768px) {
    width: auto;
    margin-bottom: 3rem;
  }
`;
const Title = styled.h1`
  font-size: 3rem; font-weight: 700; margin-bottom: 1rem; text-shadow: 0 2px 8px rgba(0,0,0,0.7);
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

  background-color: rgba(255, 255, 255, 0.6);
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
    border-radius: 16px;
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
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;

  p {
    text-align: center;
    color: #555;
    padding-top: 2rem;
  }
`;
const PreviewItem = styled.div`
  display: flex; align-items: center; margin: 0.5rem; padding: 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  img { width: 50px; height: 50px; object-fit: cover; border-radius: 4px; margin-right: 1rem; flex-shrink: 0; }
  div { p { margin: 0; color: #333; text-align: left; padding-top: 0; } .title { font-weight: 600; } .artist { font-size: 0.9rem; color: #666; } }
`;

// --- 컴포넌트 ---
const DataPreview = ({ tracks }) => (
  <div>
    {tracks.map(track => (
      <PreviewItem key={track.id}>
        <img src={track.coverImage} alt={track.title} />
        <div>
          <p className="title">{track.title}</p>
          <p className="artist">{track.studentName}</p>
        </div>
      </PreviewItem>
    ))}
  </div>
);

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Video');
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => { setCurrentImageIndex(prev => (prev + 1) % bgImages.length); }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        setLoading(true);
        const apiUrl = 'http://158.180.83.230:8080/api/student-works';
        const response = await axios.get(apiUrl);
        setPlaylist(response.data);
      } catch (err) {
        setError('데이터를 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, []);

  // [수정] category가 문자열 또는 배열인 경우 모두 처리하는 안전한 필터링 로직
  const filteredTracks = Array.isArray(playlist)
    ? playlist.filter(track => {
        if (!track || !track.category) {
          return false;
        }
        if (Array.isArray(track.category)) {
          return track.category.includes(activeTab);
        }
        if (typeof track.category === 'string') {
          return track.category === activeTab;
        }
        return false;
      })
    : [];

  const renderContentPanel = () => {
    if (loading) return <p>로딩 중...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (filteredTracks.length === 0) return <p>표시할 항목이 없습니다.</p>;
    return <DataPreview tracks={filteredTracks} />;
  };

  return (
    <HeroLayout bgImage={bgImages[currentImageIndex]}>
      <Content>
        <Title>당신의 목소리가 작품이 되는 곳</Title>
        <Subtitle>최고의 강사진과 함께 꿈을 현실로 만드세요.</Subtitle>
      </Content>
      <InteractiveArea>
        <TabMenu>
          <TabButton active={activeTab === 'Video'} onClick={() => setActiveTab('Video')}>영상</TabButton>
          <TabButton active={activeTab === 'Recording'} onClick={() => setActiveTab('Recording')}>음원</TabButton>
          <TabButton active={activeTab === 'Album'} onClick={() => setActiveTab('Album')}>앨범</TabButton>
        </TabMenu>
        <ContentPanel>
          {renderContentPanel()}
        </ContentPanel>
      </InteractiveArea>
    </HeroLayout>
  );
};

export default HeroSection;