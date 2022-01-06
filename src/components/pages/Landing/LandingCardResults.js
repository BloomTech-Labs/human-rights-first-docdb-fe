import React from 'react';
import LandingCard from './LandingCard';
import LandingSearchCard from './LandingSearchCard';
import { searchDocs } from '../../../state/actions/searches';
import TagModal from '../../common/TagModal';
import { connect } from 'react-redux';
import { Row, Col, Pagination, Tabs } from 'antd';
import { useOktaAuth } from '@okta/okta-react';
import {
  displayListView,
  displayThumbnail,
} from '../../../state/actions/docs';
import './LandingCard.css';

function LandingCardResults(props) {
  const {
    docs,
    total,
    currentSearch,
    searchDocs,
    currentPage,
    bookmarkedDocs,
    pageType,
    displayListView,
    displayThumbnail,
  } = props;

  const headerStyle = {
    fontSize: '2rem',
    padding: '2rem',
    textAlign: 'center',
    display: 'inline-block',
  };

  const { authState } = useOktaAuth();

  const { TabPane } = Tabs;

  const handleChange = (page, pageSize) => {
    // for when the page size stays the same
    if (pageSize === props.pageSize) {
      searchDocs(currentSearch, authState, page, props.pageSize, pageType);
    }
    // when page size changes, this keeps track of where you were
    else {
      const newPage =
        Math.floor(((currentPage - 1) * props.pageSize + 1) / pageSize) + 1;
      searchDocs(currentSearch, authState, newPage, pageSize, pageType);
    }
  };

  //Buttons For Display modes
  const thumbnailView = () => {
    displayThumbnail();
  };
  const listView = () => {
    displayListView();
  };

  const callback = (key) => {
    if (key === "1") {
      thumbnailView();
    } else if (key === "2") {
      listView();
    }
  };

  return (
    <>
      <TagModal />
      {(bookmarkedDocs.length === 0 && docs.length === 0) ||
        pageType === 'searchOnly' ? (
        <LandingSearchCard />
      ) : (
        <>
        <div className="sectionHeader">
          <h1 className="viewHeader">
            {pageType === 'bookmarks'
              ? 'Bookmarks'
              : `Search results for "${currentSearch}"`}
          </h1>
          <Tabs defaultActiveKey="1" size="large" onChange={callback} className="tabs">
            <TabPane tab="Grid View" key="1">
            </TabPane>
            <TabPane tab="List View" key="2">
            </TabPane>
          </Tabs>
        </div>
          <Pagination
            style={{ textAlign: 'center', paddingBottom: '2%' }}
            current={currentPage}
            pageSize={props.pageSize}
            onChange={handleChange}
            total={total}
            pageSizeOptions={[20, 40, 80]}
            hideOnSinglePage={true}
          />
          <Row gutter={{ xs: 16, sm: 24, md: 32, lg: 48 }} justify="center">
            {docs.map(doc => (
              <Col key={doc.box_id}>
                <LandingCard {...doc} />
              </Col>
            ))}
          </Row>
          <Pagination
            style={{ textAlign: 'center', paddingBottom: '2%' }}
            current={currentPage}
            pageSize={props.pageSize}
            onChange={handleChange}
            total={total}
            pageSizeOptions={[20, 40, 80]}
            hideOnSinglePage={true}
          />
        </>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  docs: state.docs.docs,
  bookmarkedDocs: state.bookmarks.bookmarkedDocs,
  pageType: state.docs.pageType,
  page: state.bookmarks.page,
  total: state.docs.totalDocsCount,
  currentSearch: state.searches.currentSearch,
  currentPage: state.searches.currentPage,
  pageSize: state.searches.pageSize,
  cardView: state.docs.cardView,
});

export default connect(mapStateToProps, {
  searchDocs,
  displayListView,
  displayThumbnail,
})(LandingCardResults);
