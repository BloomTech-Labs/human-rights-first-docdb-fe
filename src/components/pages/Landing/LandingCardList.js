import React from 'react';
import LandingCard from './LandingCard';
import { connect } from 'react-redux';
import { displayListView, displayThumbnail } from '../../../state/actions';
import { Row, Col, Switch } from 'antd';

function LandingCardList(props) {
  const { docs, displayListView, displayThumbnail } = props;

  function onChange(cardView) {
    if (cardView === true) {
      displayThumbnail();
    } else {
      displayListView();
    }
  }

  return (
    <Row>
      <Switch onChange={onChange} />
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

export default connect(mapStateToProps, { displayListView, displayThumbnail })(
  LandingCardList
);
