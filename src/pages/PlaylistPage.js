// frontend/src/pages/PlaylistPage.js
import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaPlay, FaPause } from 'react-icons/fa';

// --- 데이터 정의 ---
const studentVideoData = [
  {
    id: 'student-video1', category: 'student', type: 'video', title: '팝송 커버', artist: '김제미',
    description: '오디션반 수강생의 팝송 커버 영상입니다.',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    coverArt: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'student-video2', category: 'student', type: 'video', title: 'My Dream (Cover)', artist: '박노래',
    description: '오디션반 수강생의 커버 영상입니다.',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    coverArt: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
  },
];

const lessonAudioData = {
  mainCover: 'https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  tracks: [
    { id: 'lesson-audio1', type: 'audio', title: '첫 소절', artist: '김제미', duration: '3:12', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 'lesson-audio2', type: 'audio', title: '목소리', artist: '이보컬', duration: '4:02', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 'lesson-audio3', type: 'audio', title: '연습일지', artist: '정연습', duration: '2:49', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  ]
};

// --- 스타일 컴포넌트 ---
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const PageContainer = styled.div` display: flex; flex-direction: column; align-items: center; gap: 1.5rem; padding-top: 1rem; `;
const TabNav = styled.nav` display: flex; justify-content: center; gap: 2rem; width: 100%; border-bottom: 1px solid #e0e0e0; `;
const TabButton = styled.button`
  padding: 1rem; font-size: 1.2rem; font-weight: 600; background: none; border: none; cursor: pointer; color: #888;
  border-bottom: 3px solid transparent; margin-bottom: -1px; transition: all 0.3s ease;
  &.active { color: var(--primary-color); border-bottom-color: var(--primary-color); }
  &:hover { color: var(--primary-color); }
`;
const WeekInfo = styled.p` font-size: 1rem; color: #777; margin: 0; `;

// --- 비디오 그리드 스타일 ---
const VideoGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2.5rem; width: 100%; animation: ${fadeIn} 0.5s; `;
const VideoCard = styled.div`
  border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.08); overflow: hidden; cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  &:hover { transform: translateY(-5px); box-shadow: 0 12px 24px rgba(0,0,0,0.12); }
`;

const CardThumbnailWrapper = styled.div`
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
`;

const PlayIcon = styled(FaPlay)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: white;
  opacity: 0.8;
  transition: opacity 0.2s;
  ${VideoCard}:hover & {
    opacity: 1;
  }
`;

const CardBody = styled.div` padding: 1.2rem; h3 { font-size: 1.3rem; margin-bottom: 0.5rem; } p { font-size: 0.9rem; color: #666; } `;

// --- 음원 플레이어 스타일 ---
const AudioPlayerLayout = styled.div`
  display: grid; grid-template-columns: 1fr 1.2fr; gap: 3rem; width: 100%; animation: ${fadeIn} 0.5s;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;
const CoverWrapper = styled.div`
  position: relative; cursor: pointer; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  img { display: block; width: 100%; }
`;
const PlayButtonOverlay = styled.div`
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3);
  display: flex; justify-content: center; align-items: center; opacity: ${props => props.show ? 1 : 0}; transition: opacity 0.3s ease;
  ${CoverWrapper}:hover & { opacity: 1; }
  svg { font-size: 4rem; color: white; filter: drop-shadow(0 0 10px rgba(0,0,0,0.5)); }
`;
const TrackList = styled.ul` list-style: none; padding: 0; margin: 0;`;
const soundWave = keyframes` 0%, 100% { transform: scaleY(0.2); } 50% { transform: scaleY(1); } `;
const SoundWaveWrapper = styled.div`
  display: flex; align-items: flex-end; gap: 2px; width: 20px; height: 16px;
  div { background: var(--primary-color); width: 3px; height: 100%; animation: ${soundWave} 1.2s ease-in-out infinite; }
  div:nth-child(2) { animation-delay: -1.0s; }
  div:nth-child(3) { animation-delay: -0.8s; }
  div:nth-child(4) { animation-delay: -0.6s; }
`;
const TrackItem = styled.li`
  display: flex; align-items: center; justify-content: space-between; padding: 0.8rem 1rem; border-radius: 8px;
  cursor: pointer; transition: background-color 0.2s; 
  background-color: ${props => props.active ? '#f0f8ff' : 'transparent' };
  &:hover { background-color: #f7f7f7; }
  div > p { margin: 0; }
  p.title { font-weight: 600; color: ${props => props.active ? 'var(--primary-color)' : '#333'}; }
  p.artist { font-size: 0.9rem; color: #777; }
`;

// --- 모달 스타일 ---
const ModalBackdrop = styled.div` position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); display: flex; justify-content: center; align-items: center; z-index: 1000; `;
const modalShow = keyframes` from { opacity: 0; } to { opacity: 1; } `;
const ModalContent = styled.div` background: black; max-width: 900px; width: 90%; animation: ${modalShow} 0.3s; position: relative; `;
const CloseButton = styled.button` position: absolute; top: -40px; right: 0; background: none; color: white; border: none; font-size: 2rem; cursor: pointer; `;
const PlayerWrapper = styled.div` width: 100%; padding-top: 56.25%; position: relative; video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } `;

// --- 메인 컴포넌트 ---
const PlaylistPage = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [videoModalItem, setVideoModalItem] = useState(null);
  
  // 음원 플레이어 상태
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(lessonAudioData.tracks[0].src));

  useEffect(() => {
    audioRef.current.src = lessonAudioData.tracks[currentTrackIndex].src;
    if (isPlaying) audioRef.current.play().catch(e => console.error("Audio play failed", e));
  }, [currentTrackIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Audio play failed", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleSelectTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handleVideoCardClick = (item) => {
    console.info("Video card clicked. Item to show:", item);
    setVideoModalItem(item);
  };

  return (
    <PageContainer>
      <TabNav>
        <TabButton className={activeTab === 'student' ? 'active' : ''} onClick={() => setActiveTab('student')}>
          수강생 녹음
        </TabButton>
        <TabButton className={activeTab === 'lesson' ? 'active' : ''} onClick={() => setActiveTab('lesson')}>
          수강생 음원
        </TabButton>
      </TabNav>
      <WeekInfo>11월 4주차 업데이트</WeekInfo>

      {activeTab === 'student' && (
        <VideoGrid>
          {studentVideoData.map(item => (
            <VideoCard key={item.id} onClick={() => handleVideoCardClick(item)}>
              <CardThumbnailWrapper>
                <img src={item.coverArt} alt={item.title} />
                <PlayIcon />
              </CardThumbnailWrapper>
              <CardBody><h3>{item.title}</h3><p>{item.artist}</p></CardBody>
            </VideoCard>
          ))}
        </VideoGrid>
      )}

      {activeTab === 'lesson' && (
        <AudioPlayerLayout>
          <CoverWrapper onClick={handlePlayPause}>
            <img src={lessonAudioData.mainCover} alt="Album Cover" />
            <PlayButtonOverlay show={!isPlaying || true}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </PlayButtonOverlay>
          </CoverWrapper>
          <TrackList>
            {lessonAudioData.tracks.map((track, index) => (
              <TrackItem key={track.id} active={index === currentTrackIndex} onClick={() => handleSelectTrack(index)}>
                <div>
                  <p className='title'>{track.title}</p>
                  <p className='artist'>{track.artist}</p>
                </div>
                {index === currentTrackIndex && isPlaying ? (
                  <SoundWaveWrapper>
                    <div /><div /><div /><div />
                  </SoundWaveWrapper>
                ) : <p>{track.duration}</p>}
              </TrackItem>
            ))}
          </TrackList>
        </AudioPlayerLayout>
      )}

      {videoModalItem && (
        <ModalBackdrop onClick={() => setVideoModalItem(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setVideoModalItem(null)}>&times;</CloseButton>
            <PlayerWrapper>
              <video src={videoModalItem.src} controls autoPlay style={{ borderRadius: '8px' }} />
            </PlayerWrapper>
          </ModalContent>
        </ModalBackdrop>
      )}
    </PageContainer>
  );
};

export default PlaylistPage;
