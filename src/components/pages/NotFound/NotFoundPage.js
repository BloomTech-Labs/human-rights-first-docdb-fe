import React from 'react';
// import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { searchOnly } from '../../../state/actions/docs';
import './notFoundPage.less';

const NotFoundPage = (props) => {

  const { pageSize, searchOnly, currentSearch } = props;

  const searchButton = () => {
    console.log('Button pressed');
    searchOnly(pageSize);
  };

  return (
    <div className="notFoundContainer">
      <h1 className="noResultsHeader">No search results found for: <i>"{currentSearch}"</i></h1>
      <p className="noResultsText">Try another search, return <a onClick={searchButton}>home</a>, or click "Bookmarks" to return to your documents.</p>
    </div>
  );
};

const mapStateToProps = state => ({
  pageSize: state.searches.pageSize,
  currentSearch: state.searches.currentSearch,
});

export default connect(mapStateToProps, { searchOnly })(NotFoundPage);
