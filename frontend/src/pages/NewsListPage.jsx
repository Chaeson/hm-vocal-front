import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // axios import

const ITEMS_PER_PAGE = 10;

// 날짜 포맷팅 유틸리티 함수
const formatDate = (timestamp) => {
  if (!timestamp || !timestamp._seconds) return '날짜 미상';
  const date = new Date(timestamp._seconds * 1000);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\. /g, '-').replace(/\.$/, ''); // "YYYY-MM-DD" 형식으로
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
`;

const NewsListContainer = styled.div`
  width: 100%;
  max-width: 900px;
  border-top: 2px solid var(--primary-color);
  min-height: 500px;
`;

const NewsItem = styled.div`
  border-bottom: 1px solid #e0e0e0;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f9f9f9;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
  }

  span {
    font-size: 0.9rem;
    color: #888;
    flex-shrink: 0;
    margin-left: 1rem;
  }
`;

const ItemContent = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  white-space: pre-wrap;
  word-break: keep-all;
  background-color: #fdfdfd;
  border-top: 1px dashed #e0e0e0;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'white'};
  color: ${props => props.active ? 'white' : '#555'};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : '#f0f0f0'};
    border-color: ${props => props.active ? 'var(--primary-color)' : '#ccc'};
  }
`;

const NewsListPage = () => {
  const [newsItems, setNewsItems] = useState([]); // 초기값을 빈 배열로 변경
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/announcements');
        setNewsItems(response.data);
      } catch (err) {
        console.error("Failed to fetch announcements:", err);
        setError("공지사항을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);
  const currentItems = newsItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleItemClick = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setActiveIndex(null);
  };

  if (loading) {
    return (
      <PageContainer>
        <h1>📰 공지사항</h1>
        <p>로딩 중...</p>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <h1>📰 공지사항</h1>
        <p style={{ color: 'red' }}>{error}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1>공지사항</h1>
      <NewsListContainer>
        {currentItems.length > 0 ? (
          currentItems.map(item => (
            <NewsItem key={item.id}>
              <ItemHeader onClick={() => handleItemClick(item.id)}>
                <h3>{item.title}</h3>
                <span>{formatDate(item.createdAt)}</span> {/* 날짜 포맷팅 적용 */}
              </ItemHeader>
              {activeIndex === item.id && (
                <ItemContent>{item.content}</ItemContent>
              )}
            </NewsItem>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '2rem' }}>공지사항이 없습니다.</p>
        )}
      </NewsListContainer>

      {totalPages > 1 && (
        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <PageButton
              key={number}
              active={currentPage === number}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </PageButton>
          ))}
        </PaginationContainer>
      )}
    </PageContainer>
  );
};

export default NewsListPage;
