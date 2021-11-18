import React from 'react';
import { ReduxList } from '../../common';
import { connect } from 'react-redux';
import { getDocs } from '../../../state/actions';
import LandingCardList from './LandingCardList';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { Spin } from 'antd';

function RenderLandingPage(props) {
  const { getDocs, isFetching } = props;
  const { authState } = useOktaAuth();
  return (
    <div>
      <ReduxList
        getItemsData={() => getDocs(authState)}
        RenderItems={LandingCardList}
        LoadingComponent={() => <Spin size="large" />}
        isFetching={isFetching}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  isFetching: state.isFetching,
});

export default connect(mapStateToProps, { getDocs })(RenderLandingPage);
