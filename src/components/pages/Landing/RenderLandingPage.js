import React from 'react';
import { ReduxList } from '../../common';
import { connect } from 'react-redux';
import LandingCardList from './LandingCardList';
import { Spin } from 'antd';

function RenderLandingPage(props) {
  const { isFetching } = props;

  return (
    <div>
      <ReduxList
        RenderItems={LandingCardList}
        LoadingComponent={() => <div style={{height: '100vh',
                                             display: 'flex',
                                             alignItems: 'center',
                                             justifyContent: 'center'}}><Spin size="large" /></div>}
        isFetching={isFetching}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  isFetching: state.isFetching,
});

export default connect(mapStateToProps)(RenderLandingPage);
