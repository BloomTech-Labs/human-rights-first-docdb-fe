import React from 'react';
import LandingCard from './LandingCard';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

function LandingCardList(props) {
  const { docs } = props;
  return (
    <Row>
      {docs.map((doc, index) => (
        <Col span={6} key={index}>
          <LandingCard {...doc} />
        </Col>
      ))}
    </Row>
  );
}

const mapStateToProps = state => ({
  docs: state.docs,
});

export default connect(mapStateToProps)(LandingCardList);
