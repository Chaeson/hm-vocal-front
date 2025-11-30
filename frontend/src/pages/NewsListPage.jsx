import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ITEMS_PER_PAGE = 10;

// 날짜 포맷팅 유틸리티 함수
const formatDate = (timestamp) => {
  if (!timestamp || !timestamp._seconds) return '날짜 미상';
  const date = new Date(timestamp._seconds * 1000);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\. /g, '-').replace(/\.$/, '');
};

// --- 레이아웃 스타일 ---
const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
`;

const LayoutContainer = styled.div`
  display: flex;
  gap: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SideMenu = styled.aside`
  width: 200px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    gap: 1rem;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 2rem;
  }
`;

const MenuButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: left;
  background: ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : '#f0f0f0'};
  }

  @media (max-width: 768px) {
    text-align: center;
    flex-grow: 1;
  }
`;

const ContentContainer = styled.main`
  flex-grow: 1;
`;

// --- 게시판 리스트 스타일 (기존과 유사) ---
const PostListContainer = styled.div`
  width: 100%;
  border-top: 2px solid var(--primary-color);
  min-height: 500px;
`;

const PostItem = styled.div`
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
  padding: 2rem;
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
  padding: 2rem 0;
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

const boards = {
  announcements: {
    title: '공지사항',
    apiUrl: '/api/announcements',
  },
  community: {
    title: '자유 게시판',
    apiUrl: '/api/community', // 자유게시판 API 엔드포인트 (가정)
  },
};

const NewsListPage = () => {
  const [activeBoard, setActiveBoard] = useState('announcements');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const board = boards[activeBoard];
        const apiUrl = `http://localhost:8080${board.apiUrl}`;
        const response = await axios.get(apiUrl);
        setPosts(response.data);
        setCurrentPage(1); // 게시판 변경 시 1페이지로 초기화
        setActiveIndex(null); // 열려있는 항목 초기화
      } catch (err) {
        console.error(`Failed to fetch ${activeBoard}:`, err);
        setPosts([]); // 에러 발생 시 게시글 목록 비우기
        setError(`${boards[activeBoard].title}을(를) 불러오는 데 실패했습니다.`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [activeBoard]); // activeBoard가 변경될 때마다 데이터 다시 불러오기

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const currentItems = posts.slice(
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
      <PageTitle>{boards[activeBoard].title}</PageTitle>
      <LayoutContainer>
        <SideMenu>
          {Object.keys(boards).map(boardKey => (
            <MenuButton
              key={boardKey}
              active={activeBoard === boardKey}
              onClick={() => setActiveBoard(boardKey)}
            >
              {boards[boardKey].title}
            </MenuButton>
          ))}
        </SideMenu>

        <ContentContainer>
          {loading ? (
            <p>로딩 중...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <>
              <PostListContainer>
                {currentItems.length > 0 ? (
                  currentItems.map(item => (
                    <PostItem key={item.id}>
                      <ItemHeader onClick={() => handleItemClick(item.id)}>
                        <h3>{item.title}</h3>
                        <span>{formatDate(item.createdAt)}</span>
                      </ItemHeader>
                      {activeIndex === item.id && (
                        <ItemContent>{item.content}</ItemContent>
                      )}
                    </PostItem>
                  ))
                ) : (
                  <p style={{ textAlign: 'center', padding: '2rem' }}>게시글이 없습니다.</p>
                )}
              </PostListContainer>

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
            </>
          )}
        </ContentContainer>
      </LayoutContainer>
    </PageContainer>
  );
};

export default NewsListPage;
