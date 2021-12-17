import React from 'react';
import LandingCard from './LandingCard';
import LandingListCard from './LandingListCard';
import LandingSearchCard from './LandingSearchCard';
import { setCurrentSearch, searchDocs } from '../../../state/actions';
import { connect } from 'react-redux';
import { Row, Col, Pagination } from 'antd';
import { useOktaAuth } from '@okta/okta-react';

function LandingCardList(props) {
  const {
    docs,
    cardView,
    total,
    currentSearch,
    setCurrentSearch,
    searchDocs,
    currentPage,
    bookmarkedDocs,
    pageType,
  } = props;

  const headerStyle = {
    fontSize: '2rem',
    padding: '2rem',
    textAlign: 'center',
  };

  const { authState } = useOktaAuth();

  const handleChange = (page, pageSize) => {
    // for when the page size stays the same
    if (pageSize === props.pageSize) {
      setCurrentSearch(currentSearch, page, pageSize);
      searchDocs(currentSearch, authState, page, pageSize);
    }
    // when page size changes, this keeps track of where you were
    else {
      const newPage =
        Math.floor(((currentPage - 1) * props.pageSize + 1) / pageSize) + 1;
      setCurrentSearch(currentSearch, newPage, pageSize);
      searchDocs(currentSearch, authState, newPage, pageSize);
    }
  };

  return (
    <>
      {(bookmarkedDocs.length === 0 && docs.length === 0) ||
      pageType === 'searchOnly' ? (
        <LandingSearchCard />
      ) : (
        <>
          <h1 style={{ ...headerStyle }}>
            {pageType === 'bookmarks'
              ? 'Bookmarks'
              : `Search results for "${currentSearch}"`}
          </h1>
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
          <Pagination
            current={currentPage}
            pageSize={props.pageSize}
            onChange={handleChange}
            total={total}
            pageSizeOptions={[10, 25, 50, 100]}
            hideOnSinglePage={true}
          />
        </>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  docs: state.docs,
  bookmarkedDocs: state.bookmarkedDocs,
  pageType: state.pageType,
  cardView: state.cardView,
  total: state.totalDocsCount,
  currentSearch: state.currentSearch,
  currentPage: state.currentPage,
  pageSize: state.pageSize,
});

export default connect(mapStateToProps, {
  searchDocs,
  setCurrentSearch,
})(LandingCardList);
