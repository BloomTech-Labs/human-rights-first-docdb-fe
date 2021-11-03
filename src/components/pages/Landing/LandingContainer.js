import React from 'react';
import RenderLandingPage from './RenderLandingPage';
import LandingCard from './LandingCard';

function LandingContainer({ LoadingComponent }) {
  return (
    <>
      <RenderLandingPage />
      <LandingCard
        title="test"
        preview="https://static8.depositphotos.com/1263295/875/i/600/depositphotos_8758503-stock-photo-any-questions.jpg"
        tags={['tag1', 'tag2', 'tag3']}
      />
    </>
  );
}

export default LandingContainer;
