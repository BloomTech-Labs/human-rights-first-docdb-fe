import React from 'react';
import { Input } from 'antd';
import { searchDocs } from '../../../state/actions/searches';
import { useOktaAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import './LandingCard.less';

const { Search } = Input;

const landingSearchStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '90vh',
};

function LandingSearchCard(props) {
  const { searchDocs, pageSize } = props;
  const { authState } = useOktaAuth();

  const onSearch = value => {
    if (!value) return alert('Search bar cannot be empty');
    searchDocs(value, authState, 1, pageSize);
  };

  return (
    <div style={{ ...landingSearchStyle }}>
      <h1 className="searchPageHeader">Search</h1>
      <p className="searchbarText">To get started, enter a search term or phrase.</p><p className="searchbarText2"> From there, bookmark relevant documents, or customize their tags for more useful searches.</p>
      <Search
        onSearch={onSearch}
        style={{ width: 500 }}
        placeholder="Search"
      />
    </div>
  );
}

const mapStateToProps = state => ({
  pageSize: state.searches.pageSize,
});

export default connect(mapStateToProps, {
  searchDocs,
})(LandingSearchCard);
