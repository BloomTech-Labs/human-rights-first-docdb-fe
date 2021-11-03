import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const AvatarButton = () => {
  return (
    <div>
      <Avatar size={64} icon={<UserOutlined />} />
    </div>
  );
};

export default AvatarButton;
