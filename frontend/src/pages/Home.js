import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="hero-section">
          <h1>Campus Events Management System</h1>
          <p className="hero-subtitle">
            Discover, create, and manage campus events
          </p>

          <div className="cta-buttons">
            <Link to="/login" className="btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn-secondary">
              Register
            </Link>
          </div>
        </div>

        <div className="features-section">
          <h2>How Roles Work</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Student</h3>
              <p>
                Email ending with <strong>@student.com</strong>
              </p>
              <p>View events and register for activities</p>
            </div>

            <div className="feature-card">
              <h3>Admin</h3>
              <p>
                Email ending with <strong>@admin.com</strong>
              </p>
              <p>Manage events, users, and system settings</p>
            </div>

            <div className="feature-card">
              <h3>Club Head</h3>
              <p>
                Email ending with <strong>@head.com</strong>
              </p>
              <p>Create and manage events for your club</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
