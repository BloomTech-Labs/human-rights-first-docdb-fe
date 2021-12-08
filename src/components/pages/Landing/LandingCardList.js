import React from 'react';
import LandingCard from './LandingCard';
import LandingListCard from './LandingListCard';
import { connect } from 'react-redux';
import { displayListView, displayThumbnail } from '../../../state/actions';
import { Row, Col, Switch,Pagination } from 'antd';

function LandingCardList(props) {
  const { docs, displayListView, cardView, displayThumbnail } = props;

  function onChange(cardView) {
    if (cardView === true) {
      displayThumbnail();
    } else {
      displayListView();
    }
  }

  return (
    <>
      <Row gutter={{ xs: 16, sm: 24, md: 32, lg: 48 }} justify="center">
        <Switch onChange={onChange} />
        {cardView
          ? //For the Thumbnail Display
            docs.map(doc => (
              <Col span={6} key={doc.box_id}>
                <LandingCard {...doc} />
              </Col>
            ))
          : //For the List Display
            docs.map(doc => (
              <Col span={19} key={doc.box_id}>
                <LandingListCard {...doc} />
              </Col>
            ))}
      </Row>
      <Pagination />
    </>
  );
}

const mapStateToProps = state => ({
  docs: state.docs,
  cardView: state.cardView,
});

export default connect(mapStateToProps, { displayListView, displayThumbnail })(
  LandingCardList
);
