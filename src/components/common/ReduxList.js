import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { setCurrentSearch, getDocs } from '../../state/actions';
import { connect } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';

const ReduxList = props => {
  const {
    LoadingComponent,
    RenderItems,
    getDocs,
    setCurrentSearch,
    bookmarkedDocs,
    isFetching,
    pageSize,
  } = props;
  const { authState } = useOktaAuth();

  useEffect(() => {
    getDocs(authState, 1, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const joinedBookmarks = bookmarkedDocs.join(' ');
  setCurrentSearch(joinedBookmarks);

  return isFetching ? <LoadingComponent /> : <RenderItems />;
};

ReduxList.propTypes = {
  LoadingComponent: PropTypes.func.isRequired,
  RenderItems: PropTypes.any.isRequired,
  getItemsData: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  pageSize: state.pageSize,
  bookmarkedDocs: state.bookmarkedDocs,
});

export default connect(mapStateToProps, { setCurrentSearch, getDocs })(
  ReduxList
);
