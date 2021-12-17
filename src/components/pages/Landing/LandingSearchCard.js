import React from 'react';
import { Input } from 'antd';
import { searchDocs, setCurrentSearch } from '../../../state/actions/searches';
import { useOktaAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import logo2 from '../../../assets/HRF_Logo2.png';

const { Search } = Input;

const landingSearchStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#f7ede2',
  height: '100vh',
};

function LandingSearchCard(props) {
  const { searchDocs, pageSize } = props;
  const { authState } = useOktaAuth();

  const onSearch = value => {
    if (!value) return alert('Search bar cannot be empty');
    searchDocs(value, authState, 1, pageSize);
    setCurrentSearch(value, 1, props.pageSize);
  };

  return (
    <div style={{ ...landingSearchStyle }}>
      <img
        src={logo2}
        className="header_img"
        alt="HRF logo"
        style={{ margin: '10rem 0 2rem 0' }}
      />
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 500 }}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  page: state.bookmarks.page,
  pageSize: state.searches.pageSize,
});

export default connect(mapStateToProps, { searchDocs, setCurrentSearch })(
  LandingSearchCard
);
