import React from 'react';
import '../styles/ProgressBar.css'; // For custom styles

const ProgressBar = ({ progress }) => {
  const progressPercentage = Math.min(Math.max(progress, 0), 100); // Clamp value between 0 and 100

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-background">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
