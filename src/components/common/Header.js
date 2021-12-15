import React, { useState, useEffect } from 'react';
import Search from 'antd/es/input/Search';
import { Avatar, Layout, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './header.css';
import logo2 from '../../assets/HRF_Logo2.png';
import { useOktaAuth } from '@okta/okta-react';
import { useLocation, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  searchDocs,
  displayListView,
  displayThumbnail,
  setCurrentSearch,
} from '../../state/actions';
import { debounce } from '../../utils/debounce';

const { Header } = Layout;

const scrollStyles = {
  position: 'fixed',
  width: '100%',
  transition: 'top ease-in 0.2s',
  zIndex: '9999',
};

function MainHeader(props) {
  const [oldScroll, setOldScroll] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [query, setQuery] = useState('');

  const handleScroll = debounce(() => {
    const scrollPos = window.scrollY;
    setShowHeader(oldScroll > scrollPos || scrollPos < 10);
    setOldScroll(scrollPos);
  }, 25);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [oldScroll, showHeader, handleScroll]);

  const {
    searchDocs,
    setCurrentSearch,
    displayListView,
    displayThumbnail,
    searchTerm,
  } = props;
  const {
    authService: { logout },
    authState,
  } = useOktaAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    setQuery(searchTerm);
  }, [searchTerm]);

  if (pathname === '/login') return null;

  const changeHandler = e => {
    setQuery(e.target.value);
  };

  const onSearch = (value, e) => {
    if (!value) return alert('Search bar cannot be empty');
    setCurrentSearch(value, 1, props.pageSize);
    searchDocs(value, authState, 1, props.pageSize);
    e.target.value = '';
  };

  //Buttons For Display modes
  const thumbnailView = () => {
    displayThumbnail();
  };
  const listView = () => {
    displayListView();
  };

  return (
    <Layout style={{ ...scrollStyles, top: showHeader ? '0' : '-115px' }}>
      <Header className="header_div">
        {props.page === 'bar' ? (
          <></>
        ) : (
          <>
            <img src={logo2} className="header_img" alt="HRF logo" />
            <Search
              className="search_bar"
              placeholder="Search"
              onSearch={onSearch}
              value={query}
              onChange={changeHandler}
            />
            <Button onClick={listView}>List</Button>
            <Button onClick={thumbnailView}>Thumbnail</Button>
            <Link to="/">
              <Button type="default">Bookmarks</Button>
            </Link>
          </>
        )}

        <Button onClick={logout} type="default">
          Logout
        </Button>
        <Avatar size={45} icon={<UserOutlined />} />
      </Header>
    </Layout>
  );
}

const mapStateToProps = state => ({
  pageSize: state.pageSize,
  page: state.page,
  searchTerm: state.searchTerm,
});

export default connect(mapStateToProps, {
  searchDocs,
  displayListView,
  displayThumbnail,
  setCurrentSearch,
})(MainHeader);
