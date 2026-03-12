import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import authService from '../../services/authService';
import '../../styles/dashboard.css';

const ClubHeadHome = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.role !== 'club_head') {
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
          <h1>Club Head Dashboard</h1>
          <p className="welcome-text">Welcome, {user.name}!</p>
        </div>
        <div className="main-section">
          <div className="construction-message">
            <h2>🚧 Still Under Construction</h2>
            <p>
              Your Club Dashboard is currently being built. You'll be able to:
            </p>
            <ul>
              <li>Create and manage events with posters and descriptions</li>
              <li>Apply for venues and dates (with conflict avoidance)</li>
              <li>Accept/reject student applications</li>
              <li>Manage club members</li>
              <li>Track approval status of your events</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubHeadHome;
