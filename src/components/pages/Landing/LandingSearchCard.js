import React from 'react';
import { Input } from 'antd';
import { searchDocs } from '../../../state/actions/searches';
import { useOktaAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import logo2 from '../../../assets/HRF_Logo2.png';

const { Search } = Input;

const landingSearchStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
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
      <h1 style={{ margin: '10rem 0 2rem 0', fontSize: "3rem" }}>Enter term to begin searching:</h1>
      <Search
        onSearch={onSearch}
        style={{ width: 500 }}
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
