import React from 'react';
import RenderLandingPage from './RenderLandingPage';

function LandingContainer() {
  return (
    <div
      style={{
        backgroundColor: '#f7ede2',
        paddingTop: '80px',
        height: '100%',
      }}
    >
      <RenderLandingPage />
    </div>
  );
}

export default LandingContainer;
