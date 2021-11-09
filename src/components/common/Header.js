import React from 'react';
import { Layout } from 'antd';
import Search from 'antd/es/input/Search';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './header.css';
import logo from '../../assets/HRF_Logo.jpg';
import { useOktaAuth } from '@okta/okta-react';
import { useLocation } from 'react-router-dom';

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
        <Avatar className="avatars" size={45} icon={<UserOutlined />} />
      </Header>
    </Layout>
  );
}
export default MainHeader;
