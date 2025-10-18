import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="multicolor-spinner"></div>
      <h2 className="loading-text">Loading...</h2>
    </div>
  );
};

export default Loading;
