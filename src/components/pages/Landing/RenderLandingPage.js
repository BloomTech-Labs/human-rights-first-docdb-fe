import React from 'react';
import { Link } from 'react-router-dom';
import { LoadingComponent, ReduxList } from '../../common';
import { connect } from 'react-redux';
import { getDocs } from '../../../state/actions';
import LandingCardList from './LandingCardList';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';

function RenderLandingPage(props) {
  const { getDocs } = props;
  const { authState } = useOktaAuth();
  return (
    <div>
      <h1>Welcome to Labs Basic SPA</h1>
      <div>
        <p>
          This is an example of how we'd like for you to approach page/routable
          components.
        </p>
        <p>
          <Link to="/document-list">Documents</Link>
        </p>
      </div>
      <ReduxList
        getItemsData={() => getDocs(authState)}
        RenderItems={LandingCardList}
        LoadingComponent={() => <LoadingComponent message="...Loading" />}
      />
    </div>
  );
}

export default connect(null, { getDocs })(RenderLandingPage);
