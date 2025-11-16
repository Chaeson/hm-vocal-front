// frontend/src/components/home/TrackList.js
import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Track = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  background-color: ${props => props.active ? '#e9f5ff' : 'transparent'};
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TrackNumber = styled.span`
  font-size: 0.9rem;
  color: #888;
  font-weight: 500;
`;

const TitleArtist = styled.div`
  .title {
    font-weight: 500;
    color: #333;
  }
  .artist {
    font-size: 0.85rem;
    color: #777;
  }
`;

const Duration = styled.span`
  font-size: 0.9rem;
  color: #888;
`;

const TrackList = ({ tracks, currentTrackIndex, onSelectTrack }) => {
  return (
    <List>
      {tracks.map((track, index) => (
        <Track 
          key={track.id} 
          active={index === currentTrackIndex}
          onClick={() => onSelectTrack(index)}
        >
          <TrackInfo>
            <TrackNumber>{index + 1}</TrackNumber>
            <TitleArtist>
              <div className="title">{track.title}</div>
              <div className="artist">{track.artist}</div>
            </TitleArtist>
          </TrackInfo>
          <Duration>{track.duration}</Duration>
        </Track>
      ))}
    </List>
  );
};

export default TrackList;
