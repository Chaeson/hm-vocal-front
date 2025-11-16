// frontend/src/components/home/PlaylistSection.js
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import TrackList from './TrackList.jsx';

// Data for Video Playlist
const videoPlaylistData = {
  title: '영상 자료',
  description: '참고용 영상 리스트입니다.',
  tracks: [
    { id: 1, title: 'For Bigger Blazes', artist: 'Blender Foundation', album: 'Elephants Dream', duration: '0:15', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', coverArt: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg', type: 'video' },
    { id: 2, title: 'Elephant\'s Dream', artist: 'Blender Foundation', album: 'Elephants Dream', duration: '10:53', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', coverArt: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg', type: 'video' },
    { id: 3, title: 'For Bigger Fun', artist: 'Blender Foundation', album: 'Big Buck Bunny', duration: '0:15', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', coverArt: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg', type: 'video' },
  ],
};

// Data for Recording Playlist (with video)
const recordingPlaylistData = {
  title: '녹음 자료',
  description: '수강생들의 우수 녹음 및 영상 파일입니다.',
  tracks: [
    { id: 1, title: '첫 소절 (Audio)', artist: '김제미', album: '월말평가', duration: '3:12', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', coverArt: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1', type: 'audio' },
    { id: 2, title: 'My Dream (Video)', artist: '박노래', album: '월말평가', duration: '0:30', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', coverArt: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217', type: 'video' },
    { id: 3, title: '목소리 (Audio)', artist: '이보컬', album: '월말평가', duration: '4:02', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', coverArt: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1', type: 'audio' },
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
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: flex-start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const PlaylistWrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  overflow: hidden;
`;

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background: #000;
  
  video, img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaylistTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 600;
    padding: 1.5rem;
    margin: 0;
    border-bottom: 1px solid #eee;
`;

const MediaPlaylist = ({ playlist }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const videoRef = useRef(null);

  const currentTrack = playlist.tracks[currentTrackIndex];

  useEffect(() => {
    const isVideo = currentTrack.type === 'video';
    
    if (isVideo) {
      if (videoRef.current) videoRef.current.src = currentTrack.src;
      audioRef.current.pause();
    } else {
      audioRef.current.src = currentTrack.src;
      if (videoRef.current) videoRef.current.pause();
    }

    if (isPlaying) {
      const player = isVideo ? videoRef.current : audioRef.current;
      if (player) player.play().catch(e => console.error(`Autoplay failed: ${e.message}`));
    }
  }, [currentTrackIndex, playlist]);

  useEffect(() => {
    const isVideo = currentTrack.type === 'video';
    const player = isVideo ? videoRef.current : audioRef.current;
    if (!player) return;

    if (isPlaying) {
      player.play().catch(e => console.error(`Play failed: ${e.message}`));
    } else {
      player.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const handleSelectTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <PlaylistWrapper>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
      <PlaylistTitle>{playlist.title}</PlaylistTitle>
      
      <PlayerWrapper>
        {currentTrack.type === 'video' ? (
          <video 
            ref={videoRef} 
            src={currentTrack.src} 
            controls 
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <img src={currentTrack.coverArt} alt={currentTrack.title} />
        )}
      </PlayerWrapper>

      <div style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
        <h4>{currentTrack.title}</h4>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>{currentTrack.artist}</p>
        {currentTrack.type !== 'video' && (
          <button onClick={handlePlayPause}>{isPlaying ? 'PAUSE' : 'PLAY'}</button>
        )}
      </div>

      <TrackList 
        tracks={playlist.tracks} 
        currentTrackIndex={currentTrackIndex} 
        onSelectTrack={handleSelectTrack}
      />
    </PlaylistWrapper>
  );
};

const PlaylistSection = () => {
  return (
    <SectionBlock>
      <SectionTitle>수강생 작품</SectionTitle>
      <LayoutContainer>
        <MediaPlaylist playlist={videoPlaylistData} />
        <MediaPlaylist playlist={recordingPlaylistData} />
      </LayoutContainer>
    </SectionBlock>
  );
};

export default PlaylistSection;
