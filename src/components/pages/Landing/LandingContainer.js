import React from 'react';
import RenderLandingPage from './RenderLandingPage';

function LandingContainer() {
  return (
    <div
      style={{
        paddingTop: '80px',
        paddingLeft: '4%',
        backgroundColor: '#f7ede2',
        height: '100vh'
      }}
    >
      <RenderLandingPage />
    </div>
  );
}

export default LandingContainer;
