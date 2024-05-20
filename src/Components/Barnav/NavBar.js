// src/components/NavBar/NavBar.jsx

import React from 'react';
import { Menu, Dropdown, Layout, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo.png';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../features/slices/authSlice';

const { Header } = Layout;

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to login page after logout
  };

  const handleProfileClick = () => {
    navigate('/change-password'); // Redirect to change password page
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={handleProfileClick}>
        <UserOutlined />
        Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <img src={logo} alt='logo' style={{ width: '150px', cursor: 'pointer' }} onClick={() => navigate('/')} />
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
      </Dropdown>
    </Header>
  );
};

export default NavBar;
