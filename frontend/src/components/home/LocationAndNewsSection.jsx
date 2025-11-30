import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// --- Helper Functions ---
const formatDate = (timestamp) => {
  if (!timestamp || !timestamp._seconds) return '';
  const date = new Date(timestamp._seconds * 1000);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\. /g, '-').replace(/\.$/, '');
};

// --- Styled Components ---
const SectionBlock = styled.section`
  padding: 4rem 2rem;
  background: #fff;
`;

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div``;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NewsLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  border-radius: 12px;
  background-color: #f8f9fa;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    margin-right: 1rem;
  }

  span {
    font-size: 0.9rem;
    color: #888;
    flex-shrink: 0;
  }
`;

// --- NaverMap Component ---
const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 8px;
`;

const NaverMap = () => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(37.378910, 126.646182);
    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    const marker = new naver.maps.Marker({
      position: location,
      map: map,
    });
    const infoWindow = new naver.maps.InfoWindow({
      content: '<div style="padding:10px;font-weight:bold;">HM 보컬 아카데미</div>',
    });
    
    naver.maps.Event.addListener(marker, 'click', () => {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    });
    
    infoWindow.open(map, marker);
  }, []);

  return <MapContainer ref={mapElement} />;
};

// --- Main Component ---
const LocationAndNewsSection = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Naver Map Script Loader
  useEffect(() => {
    const clientId = '09se7npt2o';
    const scriptId = 'naver-maps-script';

    if (document.getElementById(scriptId)) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => console.error("네이버 지도 스크립트 로딩에 실패했습니다.");
    document.head.appendChild(script);
  }, []);

  // Latest News Fetcher
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setLoading(true);
        const apiUrl = 'http://158.180.83.230:8080/api/announcements';
        const response = await axios.get(apiUrl);
        if (response.data && response.data.length > 0) {
          setLatestPosts(response.data.slice(0, 4)); // 최대 3개의 최신 게시물
        }
      } catch (err) {
        setError('최신 소식을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <SectionBlock>
      <LayoutContainer>
        <Section>
          <SectionTitle>오시는 길</SectionTitle>
          {isScriptLoaded ? <NaverMap /> : <MapContainer style={{ background: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>지도 로딩 중...</p></MapContainer>}
        </Section>
        <Section>
          <SectionTitle>최신 소식</SectionTitle>
          {loading && <p>로딩 중...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && latestPosts.length > 0 && (
            <NewsList>
              {latestPosts.map(post => (
                <NewsLink key={post.id} href="/news">
                  <h3>{post.title}</h3>
                  <span>{formatDate(post.createdAt)}</span>
                </NewsLink>
              ))}
            </NewsList>
          )}
          {!loading && !error && latestPosts.length === 0 && (
            <p>최신 소식이 없습니다.</p>
          )}
        </Section>
      </LayoutContainer>
    </SectionBlock>
  );
};

export default LocationAndNewsSection;
