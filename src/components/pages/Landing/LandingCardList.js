import React from 'react';
import LandingCard from './LandingCard';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

function LandingCardList(props) {
  const { docs } = props;
  return (
    <Row>
      {docs.map(doc => (
        <Col span={6} key={doc.box_id}>
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
