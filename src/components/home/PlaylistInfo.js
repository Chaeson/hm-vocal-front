// frontend/src/components/home/PlaylistInfo.js
import React from 'react';
import styled from 'styled-components';

const PlaylistInfoBlock = styled.div`
  text-align: center;
`;

const CoverArt = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
`;

const PlaylistTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const PlaylistDescription = styled.p`
  font-size: 1rem;
  color: #888;
  margin-bottom: 1.5rem;
`;

const PlayButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 500px;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const PlaylistInfo = ({ playlist, isPlaying, onPlayPause }) => {
  return (
    <PlaylistInfoBlock>
      <CoverArt src={playlist.coverArt} alt={playlist.title} />
      <PlaylistTitle>{playlist.title}</PlaylistTitle>
      <PlaylistDescription>{playlist.description}</PlaylistDescription>
      <PlayButton onClick={onPlayPause}>
        {isPlaying ? '❚❚ 일시정지' : '▶︎ 전체 재생'}
      </PlayButton>
    </PlaylistInfoBlock>
  );
};

export default PlaylistInfo;
