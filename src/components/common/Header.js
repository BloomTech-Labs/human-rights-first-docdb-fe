import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Input, Divider, Space } from 'antd';
import Search from 'antd/es/input/Search';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './header.css';
import logo from '../../assets/HRF_Logo.webp';

function MainHeader(props) {
  return (
    <div className="App">
      <Divider />
      <Layout>
        <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="HRF logo"></img>
          <Search />
          <Button className="logout_button" type="default">
            Logout
          </Button>
          <Avatar className="avatars" size={35} icon={<UserOutlined />} />
        </Layout.Header>
      </Layout>
      <Divider />
    </div>
  );
}
export default MainHeader;
