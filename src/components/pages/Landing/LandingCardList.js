import React from 'react';
import LandingCard from './LandingCard';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

function LandingCardList(props) {
  const { docs } = props;
  return (
    <Row gutter={[48, 40]}>
      {docs.map(doc => (
        <Col xs={24} md={12} lg={6} key={doc.box_id}>
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
