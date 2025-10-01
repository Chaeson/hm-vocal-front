// frontend/src/components/home/PlaylistSection.js
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PlaylistInfo from './PlaylistInfo';
import TrackList from './TrackList';

// 임시 데이터 (각 트랙별 coverArt 추가)
const playlistData = {
  title: '수강생 녹음 과제',
  description: '2024년 1분기 우수 수강생들의 녹음 파일입니다.',
  coverArt: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
  tracks: [
    { id: 1, title: '첫 소절', artist: '김제미', album: '월말평가', duration: '3:12', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', coverArt: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1' },
    { id: 2, title: '목소리', artist: '이보컬', album: '월말평가', duration: '4:02', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', coverArt: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1' },
    { id: 3, title: 'My Dream', artist: '박노래', album: '월말평가', duration: '2:58', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', coverArt: 'https://images.pexels.com/photos/2253832/pexels-photo-2253832.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1' },
    { id: 4, title: '울림', artist: '최가수', album: '월말평가', duration: '3:45', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', coverArt: 'https://images.pexels.com/photos/2097616/pexels-photo-2097616.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1' },
    { id: 5, title: '연습일지', artist: '정연습', album: '월말평가', duration: '2:49', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', coverArt: 'https://images.pexels.com/photos/1816606/pexels-photo-1816606.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1' },
  ],
};

const SectionBlock = styled.section`
  padding: 4rem 2rem;
  background: #f9f9f9;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
`;

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlaylistSection = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(playlistData.tracks[0].src));

  useEffect(() => {
    audioRef.current.src = playlistData.tracks[currentTrackIndex].src;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleSelectTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // 현재 트랙의 커버아트를 포함한 새로운 playlist info 객체 생성
  const displayInfo = {
    ...playlistData,
    coverArt: playlistData.tracks[currentTrackIndex].coverArt,
  };

  return (
    <SectionBlock>
      <SectionTitle>수강생 작품</SectionTitle>
      <LayoutContainer>
        <PlaylistInfo 
          playlist={displayInfo} 
          isPlaying={isPlaying} 
          onPlayPause={handlePlayPause} 
        />
        <TrackList 
          tracks={playlistData.tracks} 
          currentTrackIndex={currentTrackIndex} 
          onSelectTrack={handleSelectTrack}
        />
      </LayoutContainer>
    </SectionBlock>
  );
};

export default PlaylistSection;