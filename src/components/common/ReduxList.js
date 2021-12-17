import React from 'react';
import PropTypes from 'prop-types';

const ReduxList = props => {
  const { LoadingComponent, RenderItems, isFetching } = props;
  return isFetching ? <LoadingComponent /> : <RenderItems />;
};

ReduxList.propTypes = {
  LoadingComponent: PropTypes.func.isRequired,
  RenderItems: PropTypes.any.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default ReduxList;
