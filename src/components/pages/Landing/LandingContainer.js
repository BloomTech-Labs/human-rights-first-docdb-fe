import React from 'react';
import RenderLandingPage from './RenderLandingPage';

function LandingContainer() {
  return (
    <div
      style={{
        backgroundColor: '#f7ede2',
        // backgroundSize: 'cover',
        paddingTop: '80px',
        paddingLeft: '4%',
      }}
    >
      <RenderLandingPage />
    </div>
  );
}

export default LandingContainer;
