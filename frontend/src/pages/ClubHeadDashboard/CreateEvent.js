import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import authService from '../../services/authService';
import '../../styles/dashboard.css';

const CreateEvent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'club_head') {
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
          <h1>Create Event</h1>
          <p className="subtitle">Create a new event for your club</p>
        </div>
        <div className="main-section">
          <div className="construction-message">
            <h2>🚧 Still Under Construction</h2>
            <p>Create Event page is currently being built.</p>
            <p>
              You'll be able to create events with title, description, poster,
              required skills, and capacity. Then you'll apply for venue and
              date, which will be reviewed by admin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
