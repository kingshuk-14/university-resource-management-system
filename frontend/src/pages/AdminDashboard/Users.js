import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import authService from '../../services/authService';
import '../../styles/dashboard.css';

const Users = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar role={user.role} userName={user.name} />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Users</h1>
          <p className="subtitle">Manage system users</p>
        </div>
        <div className="main-section">
          <div className="construction-message">
            <h2>🚧 Still Under Construction</h2>
            <p>Users page is currently being built.</p>
            <p>
              You'll be able to view all users, their roles, and manage user
              accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
