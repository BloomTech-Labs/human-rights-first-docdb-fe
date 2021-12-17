import React from 'react';
import { ReduxList } from '../../common';
import { connect } from 'react-redux';
import { getDocs } from '../../../state/actions/docs';
import LandingCardResults from './LandingCardResults';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { Spin } from 'antd';

function RenderLandingPage(props) {
  const { getDocs, isFetching } = props;
  const { authState } = useOktaAuth();

  return (
    <ReduxList
      getItemsData={() => getDocs(authState)}
      RenderItems={LandingCardResults}
      LoadingComponent={() => (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spin size="large" />
        </div>
      )}
      isFetching={isFetching}
    />
  );
}

const mapStateToProps = state => ({
  isFetching: state.docs.isFetching,
});

export default connect(mapStateToProps, { getDocs })(RenderLandingPage);
