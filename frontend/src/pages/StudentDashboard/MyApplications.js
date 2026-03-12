import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import authService from '../../services/authService';
import '../../styles/dashboard.css';

const MyApplications = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'student') {
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
          <h1>My Applications</h1>
          <p className="subtitle">Track your event applications</p>
        </div>
        <div className="main-section">
          <div className="construction-message">
            <h2>🚧 Still Under Construction</h2>
            <p>My Applications page is currently being built.</p>
            <p>
              You'll be able to view your application status, withdraw
              applications, and track responses from club heads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
