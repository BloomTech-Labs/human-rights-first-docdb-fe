import React, { useState, useEffect } from 'react';
import Search from 'antd/es/input/Search';
import { Avatar, Layout, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './header.css';
import logo2 from '../../assets/HRF_Logo2.png';
import { useOktaAuth } from '@okta/okta-react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getDocs,
  searchDocs,
  displayListView,
  displayThumbnail,
  setCurrentSearch,
  searchOnly,
  searchResults,
  bookmarks,
  onLoadBookmarks,
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
    onLoadBookmarks,
    bookmarks,
    pageSize,
    pageType,
    currentSearch,
    searchResults,
    searchOnly,
  } = props;

  const {
    authService: { logout },
    authState,
  } = useOktaAuth();
  const { pathname } = useLocation();

  const bookmarksButton = () => {
    bookmarks();
    onLoadBookmarks(authState, 1, pageSize);
  };

  const searchButton = () => {
    searchOnly(pageSize);
  };

  if (pathname === '/login') return null;

  const onSearch = value => {
    if (!value) return alert('Search bar cannot be empty');
    searchResults();
    setCurrentSearch(value, 1, pageSize);
    searchDocs(value, authState, 1, pageSize);
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
        <>
          <img src={logo2} className="header_img" alt="HRF logo" />
          {pageType === 'searchOnly' ? (
            <></>
          ) : (
            <Search
              className="search_bar"
              placeholder="Search"
              onSearch={onSearch}
              defaultValue={pageType === 'bookmarks' ? '' : currentSearch}
            />
          )}
          <Button onClick={listView}>List</Button>
          <Button onClick={thumbnailView}>Thumbnail</Button>
          {pageType === 'bookmarks' ? (
            <Button onClick={searchButton}>Search</Button>
          ) : (
            <Button onClick={bookmarksButton} type="default">
              Bookmarks
            </Button>
          )}
        </>

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
  pageType: state.pageType,
  bookmarkedDocs: state.bookmarkedDocs,
  currentSearch: state.currentSearch,
});

export default connect(mapStateToProps, {
  getDocs,
  searchDocs,
  displayListView,
  displayThumbnail,
  setCurrentSearch,
  searchOnly,
  searchResults,
  bookmarks,
  onLoadBookmarks,
})(MainHeader);
