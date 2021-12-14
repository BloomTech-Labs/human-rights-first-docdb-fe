import React from 'react';
import LandingCard from './LandingCard';
import LandingListCard from './LandingListCard';
import { connect } from 'react-redux';
import { Row, Col, Pagination } from 'antd';
import LandingSearchCard from './LandingSearchCard';

function LandingCardList(props) {
  const { docs, bookmarkedDocs, page, cardView } = props;

  const headerStyle = {
    fontSize: '2rem',
    padding: '2rem',
    textAlign: 'center',
  };

  return (
    <>
      {bookmarkedDocs.length === 0 && docs.length === 0 ? (
        <LandingSearchCard />
      ) : (
        <>
          {page === 'bookmarks' ? (
            <h1 style={{ ...headerStyle }}>Bookmarks</h1>
          ) : (
            <h1 style={{ ...headerStyle }}>Directory</h1>
          )}
          <Row gutter={{ xs: 16, sm: 24, md: 32, lg: 48 }} justify="center">
            {cardView
              ? //For the Thumbnail Display
                docs.map(doc => (
                  <Col className="gutter-row" span={6} key={doc.box_id}>
                    <LandingCard {...doc} />
                  </Col>
                ))
              : //For the List Display
                docs.map(doc => (
                  <Col className="gutter-row" span={19} key={doc.box_id}>
                    <LandingListCard {...doc} />
                  </Col>
                ))}
          </Row>
          <Pagination />
        </>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  docs: state.docs,
  bookmarkedDocs: state.bookmarkedDocs,
  page: state.page,
  cardView: state.cardView,
});

export default connect(mapStateToProps)(LandingCardList);
