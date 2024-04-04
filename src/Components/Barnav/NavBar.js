import React from 'react';
import { Navbar, Nav } from 'rsuite';
import { CiPower } from "react-icons/ci";
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
        margin-left:auto;
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
    <Navbar className="custom-navbar" style={{
  boxShadow: '0 2px 4px rgba(0,0,0,.1)', // Ombre légère pour un effet en profondeur
}}>
  <NavLink to="/" style={{
    display: 'flex', // Affiche les éléments de la nav en ligne
    alignItems: 'center', // Centre les éléments verticalement
  }}>
    <img src={logo} alt="logo" className="nav-logo" style={{
      height: '50px', // Hauteur fixe pour le logo pour une apparence uniforme
    }} />
  </NavLink>
  <div className="nav-right" style={{
    display: 'flex', // Affiche les éléments de la nav en ligne
    alignItems: 'center', // Centre les éléments verticalement
    gap: '20px', // Espacement entre les éléments de la nav
  }}>
    <CiPower size="2em" style={{
      color: "#e72d2d", // Icone de déconnexion en rouge
      cursor: 'pointer', // Change le curseur en main au survol
    }}/>
    <NavLink to="/deconnexion" className="nav-link" style={{
      color: "#e72d2d", // Texte de déconnexion en rouge
      textDecoration: 'none', // Supprime le soulignement par défaut des liens
      fontSize: '15px', // Taille de police standard pour la nav
      cursor: 'pointer', // Change le curseur en main au survol
    }}>
      Se déconnecter
    </NavLink>
  </div>
</Navbar>

  </>
);

export default NavBar;
