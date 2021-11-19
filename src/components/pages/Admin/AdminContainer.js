import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

import { createBackendApi } from '../../../api';

import { List } from '../../common';

import RenderAdmin from './RenderAdmin';

// Here is an example of using our reusable List component to display some list data to the UI.
const Admin = () => {
  const { authState } = useOktaAuth();

  return (
    <List
      // Here we are passing our Axios request helper function as a callback.
      getItemsData={() => createBackendApi(authState)}
      // Here we are passing in a component we want to show whilst waiting for our API request
      // to complete.
      LoadingComponent={() => <div>Loading Profiles...</div>}
      // Here we are passing in a component that receives our new data and returns our JSX elements.
      RenderItems={RenderAdmin}
    />
  );
};

export default Admin;
