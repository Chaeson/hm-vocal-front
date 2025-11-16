// frontend/src/pages/admin/AdminPage.jsx
import React, { useState } from 'react';
import LoginPage from './LoginPage.jsx'; // 경로 수정
import AdminDashboard from './AdminDashboard.jsx'; // 경로 수정

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default AdminPage;
