// frontend/src/pages/NewsListPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const newsData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `제 ${25 - i}회 정기 연주회 안내`,
  date: `2024-11-${String(25 - i).padStart(2, '0')}`,
  content: `안녕하세요, Vocal Academy입니다.\n\n제 ${25 - i}회 정기 연주회가 아래와 같이 개최됩니다.\n수강생 여러분들의 많은 관심과 참여 부탁드립니다.\n\n- 일시: 2024년 12월 20일 (금) 19:00\n- 장소: 본원 1층 콘서트홀\n- 참가 신청: 데스크 문의 (선착순 마감)`,
}));

const ITEMS_PER_PAGE = 10;

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
  const [newsItems, setNewsItems] = useState(newsData);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // API fetching logic would go here
  }, []);

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

  return (
    <PageContainer>
      <h1>📰 공지사항</h1>
      <NewsListContainer>
        {currentItems.map(item => (
          <NewsItem key={item.id}>
            <ItemHeader onClick={() => handleItemClick(item.id)}>
              <h3>{item.title}</h3>
              <span>{item.date}</span>
            </ItemHeader>
            {activeIndex === item.id && (
              <ItemContent>{item.content}</ItemContent>
            )}
          </NewsItem>
        ))}
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
