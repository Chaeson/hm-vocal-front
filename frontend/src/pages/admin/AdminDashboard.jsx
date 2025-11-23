// frontend/src/pages/admin/AdminDashboard.jsx
import React from 'react';
import styled from 'styled-components';

// --- 스타일 컴포넌트 ---
const DashboardContainer = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin: 0;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 2rem;
  border: 2px dashed #ccc;
  border-radius: 12px;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
`;

// --- 메인 컴포넌트 ---
const AdminDashboard = ({ onLogout }) => {
  return (
    <DashboardContainer>
      <Header>
        <Title>관리자 대시보드</Title>
        <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
      </Header>
      <Content>
        <p>이곳에 관리자 페이지의 실제 콘텐츠가 표시됩니다. (예: 공지사항 관리, 수강생 관리 등)</p>
      </Content>
    </DashboardContainer>
  );
};

export default AdminDashboard;
