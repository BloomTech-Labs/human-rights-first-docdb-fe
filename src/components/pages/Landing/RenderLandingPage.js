import React from 'react';
import { ReduxList } from '../../common';
import { connect } from 'react-redux';
import { getDocs } from '../../../state/actions';
import LandingCardList from './LandingCardList';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { Spin } from 'antd';

function RenderLandingPage(props) {
  const { isFetching } = props;

  return (
    <div>
      <ReduxList
        RenderItems={LandingCardList}
        LoadingComponent={() => <Spin size="large" />}
        isFetching={isFetching}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  pageSize: state.pageSize,
  currentPage: state.currentPage,
  bookmarkedDocs: state.bookmarkedDocs,
});

export default connect(mapStateToProps, { getDocs })(RenderLandingPage);
