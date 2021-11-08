import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ReduxList = props => {
  const { LoadingComponent, RenderItems, getItemsData, isFetching } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getItemsData, []);

  return isFetching ? <LoadingComponent /> : <RenderItems />;
};

ReduxList.propTypes = {
  LoadingComponent: PropTypes.func.isRequired,
  RenderItems: PropTypes.any.isRequired,
  getItemsData: PropTypes.func.isRequired,
};

export default ReduxList;
