import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FcComboChart, FcInTransit, FcPlus,FcFilingCabinet, FcOk,FcTodoList  } from "react-icons/fc";
import { BiBarcodeReader } from "react-icons/bi";

const SideNav = ({ children, role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  let menuItems;
  if (role === "Fournisseur") {
     menuItems = [
    { path: "/Dashboard", name: "Dashboard", icon: <FcComboChart /> },
    { path: "/Nv-expedition", name: "Nv expedition", icon: <FcPlus /> },
    { path: "/", name: "Suivi de colis", icon: <FcInTransit /> },
  ]
} else {
  menuItems =[
    { path: "/Dashboard", name: "Dashboard", icon: <FcComboChart /> },
    { path: "/Nv-expedition", name: "Nv expedition", icon: <FcPlus /> },
    { path: "/", name: "Suivi de colis", icon: <FcInTransit /> },
    
    { path: "/fournisseur-dashboard", name: "FourDash", icon: <FcComboChart /> },
    {
      path: "/Livraisonaaccepter",
      name: "Livraison à accepter",
      icon: <FcTodoList />      ,
    },
    { path: "/Livraison-accepte", name: "Déposer Au dépôt", icon: <FcFilingCabinet /> }, // Utilisez l'icône appropriée
    {
      path: "/En-cours-de-livraison",
      name: "Rendre En cours de livraison",
      icon: <FcInTransit />,
    }, // Utilisez l'icône appropriée
    { path: "/Livraison-Livré", name: "Marquer Livré", icon: <FcOk /> }, // Utilisez l'icône appropriée
    { path: "/Runsheet", name: "Runsheet", icon: <BiBarcodeReader />
    }, // Utilisez l'icône appropriée
    { path: "/Ajouter-admin", name: "Ajouter un admin", icon: <FcPlus /> },
    {
      path: "/Ajouter-fournisseur",
      name: "Ajouter un fournisseur",
      icon: <FcPlus />,
    },
  ];
}

  return (
    <div className="container">
      <div className="sidebar" style={{ width: isOpen ? "250px" : "50px",position: "fixed" }}>
        <div
          className="top_section"
          style={{ justifyContent: isOpen ? "space-between" : "center" }}
        >
          <h1 style={{ display: isOpen ? "block" : "none", fontSize: "15px" }}>
            Admin
          </h1>
          <FaBars onClick={toggle} />
        </div>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
            style={{ padding: isOpen ? "10px" : "10px 0px" }}
          >
            <div className="icon">{item.icon}</div>
            {isOpen && <div className="link_text">{item.name}</div>}
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default SideNav;
