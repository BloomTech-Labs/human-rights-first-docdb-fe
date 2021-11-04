import React from 'react';
import LandingCard from './LandingCard';
import { connect } from 'react-redux';

function LandingCardList(props) {
  const { docs } = props;
  return (
    <div>
      {docs.map(doc => (
        <LandingCard {...doc} />
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  docs: state.docs,
});

export default connect(mapStateToProps)(LandingCardList);
