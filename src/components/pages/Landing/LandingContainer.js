import React from 'react';
import RenderLandingPage from './RenderLandingPage';

function LandingContainer() {
  return (
    <div
      style={{
        backgroundColor: '#f7ede2',
        paddingTop: '80px',
        paddingLeft: '4%',
        height: '100vh',
      }}
    >
      <RenderLandingPage />
    </div>
  );
}

export default LandingContainer;
