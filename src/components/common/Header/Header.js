import React, { useState, useEffect } from 'react';
import Search from 'antd/es/input/Search';
import { Avatar, Layout, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './header.css';
import logo2 from '../../../assets/HRF_Logo2.png';
import { useOktaAuth } from '@okta/okta-react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getDocs,
  displayListView,
  displayThumbnail,
  searchOnly,
} from '../../../state/actions/docs';
import { searchDocs, setCurrentSearch } from '../../../state/actions/searches';
import { bookmarks } from '../../../state/actions/bookmarks';
import { debounce } from '../../../utils/debounce';

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
    getDocs,
    searchDocs,
    setCurrentSearch,
    displayListView,
    displayThumbnail,
    currentSearch,
    bookmarks,
    bookmarkedDocs,
    docs,
    cardView,
    pageType,
    pageSize
  } = props;

  useEffect(() => {
    if (pageType !== 'bookmarks') {
      setQuery(currentSearch);
    } else {
      setQuery('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSearch]);

  const changeHandler = e => {
    setQuery(e.target.value);
  };

  const {
    authService: { logout },
    authState,
  } = useOktaAuth();
  const { pathname } = useLocation();

  const bookmarksButton = () => {
    bookmarks();
    console.log(pageType);
    getDocs(authState, 1, pageSize);
  };

  const searchButton = () => {
    searchOnly(pageSize);
  };

  if (pathname === '/login') return null;

  const onSearch = value => {
    if (!value) return alert('Search bar cannot be empty');
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
            <>
              <Search
            style={{
              visibility:
                bookmarkedDocs.length === 0 && docs.length === 0
                  ? 'hidden'
                  : 'visible',
            }}
            className="search_bar"
            placeholder="Search"
            onSearch={onSearch}
            value={query}
            onChange={changeHandler}
          />
              <Button
              style={{
                visibility:
                  (bookmarkedDocs.length === 0 && docs.length === 0) ||
                  !cardView
                    ? 'hidden'
                    : 'visible',
              }}
              onClick={listView}
            >
              List
            </Button>
            <Button
              style={{
                visibility:
                  (bookmarkedDocs.length === 0 && docs.length === 0) || cardView
                    ? 'hidden'
                    : 'visible',
              }}
              onClick={thumbnailView}
            >
              Thumbnail
            </Button>
            </>
          )}
          {pageType === 'bookmarks' ? (
            <Button onClick={searchButton}>Home</Button>
          ) : (
            bookmarkedDocs.length > 0 && (
              <Button
            style={{
              visibility:
                bookmarkedDocs.length === 0 && docs.length === 0
                  ? 'hidden'
                  : 'visible',
            }}
            onClick={bookmarksButton}
            type="default"
          >Bookmarks</Button>
            )
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
  pageSize: state.searches.pageSize,
  page: state.bookmarks.page,
  currentSearch: state.searches.currentSearch,
  bookmarkedDocs: state.bookmarks.bookmarkedDocs,
  docs: state.docs.docs,
  pageType: state.bookmarks.pageType,
  cardView: state.docs.cardView,
});

export default connect(mapStateToProps, {
  searchDocs,
  displayListView,
  displayThumbnail,
  searchOnly,
  bookmarks,
  getDocs,
})(MainHeader);
