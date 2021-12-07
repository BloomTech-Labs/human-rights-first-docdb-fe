import React from 'react';
import LandingCard from './LandingCard';
import { connect } from 'react-redux';
import { Row, Col, Pagination } from 'antd';

function LandingCardList(props) {
  const { docs } = props;
  return (
    <>
      <Row gutter={[10, 10]}>
        {docs.map(doc => (
          <Col span={6} key={doc.box_id}>
            <LandingCard {...doc} />
          </Col>
        ))}
      </Row>
      <Pagination />
    </>
  );
}

const mapStateToProps = state => ({
  docs: state.docs,
});

export default connect(mapStateToProps)(LandingCardList);
