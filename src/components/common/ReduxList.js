import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ReduxList = props => {
  const { LoadingComponent, RenderItems, getItemsData } = props;
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    getItemsData()
      .catch(console.error)
      .finally(() => {
        setFetching(false);
      });
  }, [getItemsData]);

  return isFetching ? <LoadingComponent /> : <RenderItems />;
};

ReduxList.propTypes = {
  LoadingComponent: PropTypes.func.isRequired,
  RenderItems: PropTypes.func.isRequired,
  getItemsData: PropTypes.func.isRequired,
  reduxState: PropTypes.array.isRequired,
};

export default ReduxList;
