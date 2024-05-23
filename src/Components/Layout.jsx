import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  DashboardOutlined,
  PlusCircleOutlined,
  InboxOutlined,
  HourglassOutlined,
  CheckOutlined,
  FileTextOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import {  FaUsers } from 'react-icons/fa';

import { logout } from '../features/slices/authSlice';
import logo from '../assets/images/logo.png';
import logo2 from '../assets/images/logo-sanfour.png';

const { Header, Content, Sider } = Layout;

const CommonLayout = ({ children }) => {
  const { role,user } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to login page after logout
  };

  const handleProfileClick = () => {
    navigate('/change-password'); // Redirect to change password page
  };

  const menu = (
    <Menu>
      {role === "ADMIN" && (
        <Menu.Item key="profile" onClick={handleProfileClick}>
          <UserOutlined />
          Profile
        </Menu.Item>
      )}
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );

  const menuItems = role === "VENDEUR" ? [
    { path: "/fournisseur-dashboard", name: "Dashboard", icon: <DashboardOutlined /> },
    { path: "/Nv-expedition", name: "Nouvelle Expedition", icon: <PlusCircleOutlined /> },
    { path: "/Suivi", name: "Suivi", icon: <UsergroupAddOutlined /> },
  ] : [
    { path: "/Dashboard", name: "Dashboard", icon: <DashboardOutlined /> },
    { path: "/Nv-expedition", name: "Nouvelle Expedition", icon: <PlusCircleOutlined /> },
    { path: "/Livraisonaaccepter", name: "Livraisons à Accepter", icon: <InboxOutlined /> },
    { path: "/En-cours-de-livraison", name: "Rendre En cours de livraison", icon: <HourglassOutlined /> },
    { path: "/Livraison-Livré", name: "Marquer Livré", icon: <CheckOutlined /> },
    { path: "/Runsheet", name: "Runsheet", icon: <FileTextOutlined /> },
    { path: "/Ajouter-admin", name: "Ajouter un admin", icon: <UserAddOutlined /> },
    { path: "/Ajouter-fournisseur", name: "Ajouter un fournisseur", icon: <UsergroupAddOutlined /> },
    { path: "/Fournisseur", name: "Ajouter un fournisseur", icon: <FaUsers /> },
   
    
  ];
  const handleLogoClick = () => {
    if (role === 'ADMIN') {
      navigate('/');
    } else if (role === 'VENDEUR') {
      navigate('/fournisseur-dashboard');
    }
  };
  return (
    <Layout className="min-h-screen">
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme="dark">
        <div className="logo p-4">
          <img src={logo2} alt="logo" className={`w-${collapsed ? '10' : '10'} transition-all`} />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
          {menuItems.map((item, index) => (
            <Menu.Item key={index} icon={item.icon}>
              <NavLink to={item.path} className={({ isActive }) => isActive ? "active" : undefined}>
                {item.name}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="bg-dark flex items-center justify-between px-4 shadow">
          <div className="flex items-center">
            <img src={logo} alt='logo' className="w-36 cursor-pointer" onClick={handleLogoClick} />
          </div>
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer" />
          </Dropdown>
        </Header>
        <Content className="p-6 bg-gray-200 overflow-auto">
          <div className="min-h-full">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;
