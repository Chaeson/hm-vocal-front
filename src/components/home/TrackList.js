// frontend/src/components/home/TrackList.js
import React from 'react';
import styled from 'styled-components';

const TrackListBlock = styled.div`
  width: 100%;
`;

const TrackItem = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 1fr 50px; /* 번호, 제목/아티스트, 앨범, 시간 */
  gap: 1rem;
  align-items: center;
  padding: 0.8rem;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: #e0e8ff;
    color: var(--primary-color);
  }
`;

const TrackNumber = styled.span`
  color: #888;
  font-weight: 500;
`;

const TrackInfo = styled.div`
  p {
    margin: 0;
  }
  .title {
    font-weight: 600;
  }
  .artist {
    font-size: 0.9rem;
    color: #555;
  }
`;

const TrackAlbum = styled.span`
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackDuration = styled.span`
  color: #888;
  font-weight: 500;
`;

const TrackList = ({ tracks, currentTrackIndex, onSelectTrack }) => {
  return (
    <TrackListBlock>
      {tracks.map((track, index) => (
        <TrackItem 
          key={track.id} 
          className={index === currentTrackIndex ? 'active' : ''}
          onClick={() => onSelectTrack(index)}
        >
          <TrackNumber>{index + 1}</TrackNumber>
          <TrackInfo>
            <p className="title">{track.title}</p>
            <p className="artist">{track.artist}</p>
          </TrackInfo>
          <TrackAlbum>{track.album}</TrackAlbum>
          <TrackDuration>{track.duration}</TrackDuration>
        </TrackItem>
      ))}
    </TrackListBlock>
  );
};

export default TrackList;