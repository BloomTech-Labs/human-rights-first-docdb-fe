import React from 'react';
import LandingCard from './LandingCard';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

function LandingCardList(props) {
  const { docs } = props;
  return (
    <Row gutter={{ xs: 16, sm: 24, md: 32, lg: 48 }} justify="center">
      {docs.map(doc => (
        <Col className="gutter-row" key={doc.box_id}>
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
