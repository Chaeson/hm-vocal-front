// frontend/src/pages/admin/AdminPage.jsx
import React, { useState } from 'react';
import LoginPage from './LoginPage.jsx'; // 경로 수정
import AdminDashboard from './AdminDashboard.jsx'; // 경로 수정

const AdminPage = () => {
  // 로그인 기능 임시 비활성화: 바로 대시보드 보여주기
  const handleLogout = () => {
    console.log("Logged out (simulated)");
  };

  return (
    <div>
      <AdminDashboard onLogout={handleLogout} />
    </div>
  );
};

export default AdminPage;
