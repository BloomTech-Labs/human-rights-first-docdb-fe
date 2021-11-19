import React, { useEffect } from 'react';
import { createDSApi } from '../../../api';
import { useOktaAuth } from '@okta/okta-react';

//This is where our ant design will go. We might need to make another file to fetch the data
const Search = () => {
  const { authState } = useOktaAuth();
  useEffect(() => {
    createDSApi(authState)
      .get('/search/London')
      .then(console.log)
      .catch(console.log);
  }, []); // eslint-disable-line

  return (
    <h1 style={{ color: '#9668ab' }}>
      This is where our A.N.T Design List will go
    </h1>
  );
};

export default Search;
