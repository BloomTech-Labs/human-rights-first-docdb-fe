import React from 'react';
import RenderLandingPage from './RenderLandingPage';
import LandingCard from './LandingCard';
import { testDocument } from '../../../__mocks__';

function LandingContainer({ LoadingComponent }) {
  return (
    <>
      <RenderLandingPage />
      <LandingCard {...testDocument} />
    </>
  );
}

export default LandingContainer;
