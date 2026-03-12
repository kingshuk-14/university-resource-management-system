import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import authService from '../../services/authService';
import '../../styles/dashboard.css';

const StudentHome = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.role !== 'student') {
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
          <h1>Student Dashboard</h1>
          <p className="welcome-text">Welcome, {user.name}!</p>
        </div>
        <div className="main-section">
          <div className="construction-message">
            <h2>🚧 Still Under Construction</h2>
            <p>
              The Student Dashboard is currently being built. You'll be able to:
            </p>
            <ul>
              <li>Browse events organized by club heads</li>
              <li>Filter events by skill set</li>
              <li>Apply for events</li>
              <li>Track your applications</li>
              <li>View your schedule</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
