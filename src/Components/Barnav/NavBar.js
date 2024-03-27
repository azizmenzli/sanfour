import React from 'react';
import { Navbar, Nav } from 'rsuite';
import { FaRegUserCircle } from "react-icons/fa";
import logo from '../../assets/images/logo.png';
import { NavLink } from "react-router-dom"; // Assurez-vous que react-router-dom est installé

const NavBar = () => (
  <Navbar appearance="inverse" style={{ position: 'fixed', width: '100%', display: 'flex' }}>
    {/* Utilisez NavLink autour de l'image pour la navigation */}
    <NavLink to="/">
      <img src={logo} alt='logo' style={{ width: '150px', marginLeft: '50px' }} />
    </NavLink>
    <Nav pullRight style={{ marginLeft: 'auto' }}>
      <Nav.Menu icon={<FaRegUserCircle />}>
        <Nav.Item>Profil</Nav.Item>
        <Nav.Item>Se déconnecter</Nav.Item>
      </Nav.Menu>
    </Nav>
  </Navbar>
);

export default NavBar;