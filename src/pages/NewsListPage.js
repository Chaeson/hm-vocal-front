// frontend/src/pages/NewsListPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// ====================================================================
// TODO: API 연동 지점 (1)
// 아래 newsData는 임시 샘플 데이터입니다.
// 실제 프로덕션에서는 이 부분을 삭제하고, API 서버로부터 공지사항 목록을 받아와야 합니다.
// ====================================================================
const newsData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `제 ${25 - i}회 정기 연주회 안내`,
  date: `2024-11-${String(25 - i).padStart(2, '0')}`,
  content: `안녕하세요, Vocal Academy입니다.\n\n제 ${25 - i}회 정기 연주회가 아래와 같이 개최됩니다.\n수강생 여러분들의 많은 관심과 참여 부탁드립니다.\n\n- 일시: 2024년 12월 20일 (금) 19:00\n- 장소: 본원 1층 콘서트홀\n- 참가 신청: 데스크 문의 (선착순 마감)`,
}));

const ITEMS_PER_PAGE = 10; // 페이지당 보여줄 항목 수

// --- 스타일 컴포넌트 (이하 생략) ---
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
  min-height: 500px; // 페이지 변경 시 높이 변화 최소화
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

// --- 메인 컴포넌트 ---
const NewsListPage = () => {
  // ====================================================================
  // TODO: API 연동 지점 (2)
  // 현재는 newsItems 상태가 로컬 샘플 데이터(newsData)로 초기화되고 있습니다.
  // API 연동 시, 이 상태는 빈 배열([])로 초기화하고,
  // 아래 useEffect 훅 내부에서 API를 호출하여 받아온 데이터로 상태를 업데이트해야 합니다.
  // ====================================================================
  const [newsItems, setNewsItems] = useState(newsData);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // ====================================================================
  // TODO: API 연동 지점 (3)
  // 아래 useEffect는 컴포넌트가 처음 마운트될 때 API를 호출하는 예시입니다.
  // axios나 fetch를 사용하여 서버로부터 데이터를 받아와 setNewsItems로 상태를 업데이트하세요.
  // 로딩 상태를 관리하는 로직도 추가하면 좋습니다.
  // ====================================================================
  useEffect(() => {
    // 예시: fetch('/api/news')
    //   .then(res => res.json())
    //   .then(data => setNewsItems(data));
  }, []); // 빈 배열은 컴포넌트가 처음 렌더링될 때 한 번만 실행됨을 의미합니다.

  // 전체 페이지 수 계산 (API 연동 후에도 이 로직은 대부분 동일하게 사용됩니다)
  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);

  // 현재 페이지에 보여줄 데이터 계산
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
      <h1>공지사항</h1>
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
