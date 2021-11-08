import React from 'react';
import { Layout } from 'antd';
import Search from 'antd/es/input/Search';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './header.css';
import logo from '../../assets/HRF_Logo.webp';
import { useLocation } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

function MainHeader(props) {
  const { pathname } = useLocation();
  const {
    authService: { logout },
  } = useOktaAuth();

  if (pathname === '/login') return null;

  return (
    <Layout>
      <Layout.Header className="header_div">
        <img src={logo} className="header_img" alt="HRF logo"></img>
        {pathname === '/document-list' && (
          <Search className="search_bar" placeholder="Search" />
        )}
        <Button onClick={logout} className="logout_button" type="default">
          Logout
        </Button>
        <Avatar className="avatars" size={45} icon={<UserOutlined />} />
      </Layout.Header>
    </Layout>
  );
}
export default MainHeader;
