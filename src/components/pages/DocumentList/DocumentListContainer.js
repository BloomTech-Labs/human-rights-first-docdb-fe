import React from 'react';
import { LoadingComponent, ReduxList } from '../../common';
import DocumentCardList from './DocumentCardList';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { getDocs } from '../../../state/actions';
import { connect } from 'react-redux';

//This is where our ant design will go. We might need to make another file to fetch the data
export const DocumentList = props => {
  const { getDocs, isFetching } = props;
  const { authState } = useOktaAuth();

  return (
    <ReduxList
      getItemsData={() => getDocs(authState)}
      RenderItems={DocumentCardList}
      LoadingComponent={() => <LoadingComponent message="...Loading" />}
      isFetching={isFetching}
    />
  );
};

const mapStateToProps = state => ({
  isFetching: state.isFetching,
});

export default connect(mapStateToProps, { getDocs })(DocumentList);
