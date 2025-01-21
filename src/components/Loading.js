import React from 'react';
import '../styles/Loading.css'; // Assuming you have a separate CSS file for styles

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-box">
        <div className="WH color l1"></div>
        <div className="ball color"></div>
        <div className="WH color l2"></div>
      </div>
    </div>
  );
};

export default Loading;
