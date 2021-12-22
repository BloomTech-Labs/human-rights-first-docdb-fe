import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDocs } from '../../state/actions/docs';
import { connect } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';

const ReduxList = props => {
  const { getDocs, LoadingComponent, RenderItems, isFetching } = props;
  const { authState } = useOktaAuth();

  useEffect(() => {
    getDocs(authState, 1, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isFetching ? <LoadingComponent /> : <RenderItems />;
};

ReduxList.propTypes = {
  LoadingComponent: PropTypes.func.isRequired,
  RenderItems: PropTypes.any.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  pageSize: state.searches.pageSize,
  bookmarkedDocs: state.bookmarks.bookmarkedDocs,
});

export default connect(mapStateToProps, { getDocs })(ReduxList);
