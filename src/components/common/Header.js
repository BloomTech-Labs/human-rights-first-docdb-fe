import React from 'react';
import Search from 'antd/es/input/Search';
import { Avatar, Layout, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './header.css';
import logo from '../../assets/HRF_Logo.webp';
import { useOktaAuth } from '@okta/okta-react';
import { useLocation, Link } from 'react-router-dom';

const { Header } = Layout;

function MainHeader(props) {
  const { logout } = useOktaAuth().authService;
  const { pathname } = useLocation();

  if (pathname === '/login') return null;

  return (
    <Layout>
      <Header className="header_div">
        <img src={logo} className="header_img" alt="HRF logo" />
        <Search className="search_bar" placeholder="Search" />
        <Button onClick={logout} className="logout_button" type="default">
          Logout
        </Button>
        <Link to="/">
          <Button className="bookmark_button" type="default">
            Bookmarks
          </Button>
        </Link>
        <Avatar className="avatars" size={45} icon={<UserOutlined />} />
      </Header>
    </Layout>
  );
}
export default MainHeader;
