import React, { useEffect } from 'react';
import { getDSData } from '../../../api';
import { useOktaAuth } from '@okta/okta-react';
//This is where our ant design will go. We might need to make another file to fetch the data
const Search = () => {
  const { authState } = useOktaAuth();
  useEffect(() => {
    getDSData('/search/London', authState)
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
