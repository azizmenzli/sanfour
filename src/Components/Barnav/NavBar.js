import React from 'react';
import { Navbar, Nav } from 'rsuite';
import { FaRegUserCircle } from "react-icons/fa";
import logo from '../../assets/images/logo.png';
import { NavLink, useNavigate } from "react-router-dom"; // Make sure react-router-dom is installed
import { useDispatch } from 'react-redux';
import { logout } from '../../features/slices/authSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    // Optionally, redirect to the login page or home page after logout
    navigate('/'); // Adjust as necessary based on your routing
  };
  return (
  <Navbar appearance="inverse" style={{ position: 'fixed', width: '100%', zIndex: 1000, display: 'flex' }}>
    <NavLink to="/">
      <img src={logo} alt='logo' style={{ width: '150px', marginLeft: '50px' }} />
    </NavLink>
    <Nav pullRight style={{ marginLeft: 'auto' }}>
      <Nav.Menu icon={<FaRegUserCircle />}>
        <Nav.Item>Profil</Nav.Item>
        <Nav.Item onSelect={handleLogout}>Se déconnecter</Nav.Item>
      </Nav.Menu>
    </Nav>
  </Navbar>
)};

export default NavBar;
