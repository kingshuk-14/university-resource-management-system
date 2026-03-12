import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import authService from '../../services/authService';
import '../../styles/dashboard.css';

const AdminHome = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.role !== 'admin') {
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
          <h1>Admin Dashboard</h1>
          <p className="welcome-text">Welcome, Master Admin {user.name}!</p>
        </div>
        <div className="main-section">
          <div className="construction-message">
            <h2>🚧 Still Under Construction</h2>
            <p>
              The Admin Dashboard is currently being built. You'll be able to:
            </p>
            <ul>
              <li>
                Review and approve/reject event requests from club heads
              </li>
              <li>Provide alternate venue and date suggestions</li>
              <li>Request resubmission of event details</li>
              <li>Manage venues and time slots</li>
              <li>Avoid venue and time slot conflicts</li>
              <li>Manage all users and their roles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
