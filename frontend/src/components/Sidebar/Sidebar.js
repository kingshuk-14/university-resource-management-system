import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Sidebar.css';

const Sidebar = ({ role, userName }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const menuItems =
    role === 'student'
      ? [
          { label: 'Home', icon: '🏠', path: '/dashboard' },
          { label: 'Browse Events', icon: '📅', path: '/dashboard/student/events' },
          { label: 'My Applications', icon: '📋', path: '/dashboard/student/applications' },
          { label: 'My Schedule', icon: '⏰', path: '/dashboard/student/schedule' },
        ]
      : role === 'club_head'
      ? [
          { label: 'Home', icon: '🏠', path: '/dashboard' },
          { label: 'Create Event', icon: '➕', path: '/dashboard/club-head/create-event' },
          { label: 'My Events', icon: '📅', path: '/dashboard/club-head/my-events' },
          { label: 'Applications', icon: '📋', path: '/dashboard/club-head/applications' },
          { label: 'Club Members', icon: '👥', path: '/dashboard/club-head/members' },
        ]
      : role === 'admin'
      ? [
          { label: 'Home', icon: '🏠', path: '/dashboard' },
          { label: 'Pending Requests', icon: '⏳', path: '/dashboard/admin/pending-requests' },
          { label: 'All Events', icon: '📅', path: '/dashboard/admin/all-events' },
          { label: 'Venues', icon: '🏢', path: '/dashboard/admin/venues' },
          { label: 'Users', icon: '👥', path: '/dashboard/admin/users' },
        ]
      : [];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-title">
          {isOpen && <h2>Campus Events</h2>}
        </div>
        <button
          className="toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>

      <div className="user-section">
        <div className="user-avatar">
          {userName ? userName.charAt(0).toUpperCase() : 'U'}
        </div>
        {isOpen && (
          <div className="user-info">
            <p className="user-name">{userName || 'User'}</p>
            <p className="user-role">{role?.toUpperCase()}</p>
          </div>
        )}
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="menu-item"
            title={!isOpen ? item.label : ''}
          >
            <span className="menu-icon">{item.icon}</span>
            {isOpen && <span className="menu-label">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          onClick={handleLogout}
          className="logout-btn"
          title="Logout"
        >
          <span className="menu-icon">🚪</span>
          {isOpen && <span className="menu-label">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
