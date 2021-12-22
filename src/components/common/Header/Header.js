import React, { useState, useEffect } from 'react';
import Search from 'antd/es/input/Search';
import { Tooltip, Avatar, Layout, Button } from 'antd';
import { UserOutlined, AppstoreFilled, BarsOutlined } from '@ant-design/icons';
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
import {
  searchDocs,
  setPageToSearchResults,
} from '../../../state/actions/searches';
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
    searchOnly,
    setPageToSearchResults,
    displayListView,
    displayThumbnail,
    bookmarks,
    bookmarkedDocs,
    docs,
    currentSearch,
    cardView,
    pageType,
    pageSize,
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
    setQuery('');
    bookmarks();
    getDocs(authState, 1, pageSize);
  };

  const searchButton = () => {
    searchOnly(pageSize);
  };

  if (pathname === '/login') return null;

  const onSearch = value => {
    if (!value) return alert('Search bar cannot be empty');
    setPageToSearchResults();
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
              {cardView ? (
                <><Tooltip placement="bottom" title={'Grid View'}>
                  <Avatar size={40} icon={<AppstoreFilled style={{ color: '#696969' }} />} onClick={thumbnailView} />
                </Tooltip>
                  <Tooltip placement="bottom" title={'List View'}>
                    <Avatar size={40} icon={<BarsOutlined />} onClick={listView} />
                  </Tooltip></>
              ) : (
                <><Tooltip placement="bottom" title={'Grid View'}>
                  <Avatar size={40} icon={<AppstoreFilled />} onClick={thumbnailView} />
                </Tooltip>
                  <Tooltip placement="bottom" title={'List View'}>
                    <Avatar size={40} icon={<BarsOutlined style={{ color: '#696969' }} />} onClick={listView} />
                  </Tooltip></>
              )}
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
              >
                Bookmarks
              </Button>
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
  currentSearch: state.searches.currentSearch,
  bookmarkedDocs: state.bookmarks.bookmarkedDocs,
  docs: state.docs.docs,
  pageType: state.docs.pageType,
  cardView: state.docs.cardView,
});

export default connect(mapStateToProps, {
  searchDocs,
  displayListView,
  displayThumbnail,
  searchOnly,
  bookmarks,
  getDocs,
  setPageToSearchResults,
})(MainHeader);
