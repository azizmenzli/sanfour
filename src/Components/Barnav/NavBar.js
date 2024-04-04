import React from 'react';
import { Navbar, Nav } from 'rsuite';
import { FaRegUserCircle } from "react-icons/fa";
import logo from '../../assets/images/logo.png';
import { NavLink } from "react-router-dom";

const NavBar = () => (
  <>
    <style>{`
      .custom-navbar {
        background-color: #007bff; /* Une couleur de fond plus moderne */
        color: #ffffff;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px; /* Ajusté pour une meilleure répartition */
        z-index: 1050;
        box-shadow: 0 2px 4px rgba(0,0,0,.1); /* Ajout d'une ombre pour la profondeur */
      }
      .nav-logo {
        background-color: #007bff;
        height: 40px;
        cursor: pointer;
      }
      .nav-right {
        display: flex;
        align-items: right;
        gap: 30px;
      }
      .nav-link {
        color: #fff; /* Couleur du texte pour les liens */
        text-decoration: none; /* Supprimer le soulignement */
        margin-right: 15px; /* Espace entre les liens */
      }
      .nav-link:hover {
        text-decoration: underline; /* Soulignement au survol */
      }
    `}</style>
    <Navbar className="custom-navbar">
      <NavLink to="/">
        <img src={logo} alt="logo" className="nav-logo" />
      </NavLink>
      <div className="nav-right">
        <NavLink to="/profil" className="nav-link">
          Profil
        </NavLink>
        <NavLink to="/deconnexion" className="nav-link">
          Se déconnecter
        </NavLink>
        <FaRegUserCircle size="2em" />
      </div>
    </Navbar>
  </>
);

export default NavBar;
