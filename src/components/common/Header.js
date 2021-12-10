import React, { useEffect, useState } from 'react';
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
} from '../../state/actions';

const { Header } = Layout;

function MainHeader(props) {
  const { searchDocs, displayListView, displayThumbnail } = props;
  const {
    authService: { logout },
    authState,
  } = useOktaAuth();
  const { pathname } = useLocation();

  if (pathname === '/login') return null;

  const onSearch = value => {
    if (!value) return alert('Search bar cannot be empty');
    searchDocs(value, authState);
  };

  //Buttons For Display modes
  const thumbnailView = () => {
    displayThumbnail();
  };
  const listView = () => {
    displayListView();
  };

  return (
    <Layout id="layout">
      <Header className={`header_div`}>
        <img src={logo2} className="header_img" alt="HRF logo" />
        <Search
          className="search_bar"
          placeholder="Search"
          onSearch={onSearch}
        />
        <Button onClick={listView}>List</Button>
        <Button onClick={thumbnailView}>Thumbnail</Button>
        {/* <Link to="/">
          <Button className="bookmark_button" type="default">
            Bookmarks
          </Button>
        </Link> */}
        <Button onClick={logout} className="logout_button" type="default">
          Logout
        </Button>
        <Avatar className="avatars" size={45} icon={<UserOutlined />} />
      </Header>
    </Layout>
  );
}
export default connect(null, { searchDocs, displayListView, displayThumbnail })(
  MainHeader
);
