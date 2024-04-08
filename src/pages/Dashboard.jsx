// src/pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Tablev from "../Components/Tables/Tables";
import CardNbrLiv from "../Components/CardNbrLiv/CardNbrLiv";
import NavBar from "../Components/Barnav/NavBar";
import SideNav from "../Components/SideNav/SideNav";
import mockUsers from "../assets/data/data"; // Assurez-vous que le chemin est correct après le déplacement du fichier

const Dashboard = () => {
  // Vous pouvez passer useNavigate à Tablev si nécessaire ou gérer la navigation ici selon votre architecture
  const navigate = useNavigate();

  // Supposons que vous voulez utiliser navigate dans Tablev, vous pouvez passer navigate comme prop
  // Ou vous pouvez utiliser navigate directement dans Dashboard selon vos besoins

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <NavBar />
      <div style={{ display: "flex", height: "calc(100% - 55px)" }}>
        <div
          style={{
            position: "fixed",
            top: "55px",
            left: 0,
            width: "250px",
            height: "calc(100vh - 55px)",
            overflowY: "auto",
          }}
        >
          <SideNav />
        </div>
        <div
          style={{
            marginLeft: "250px",
            width: "calc(100% - 250px)",
            paddingTop: "20px",
          }}
        >
          <br/>
          <h1 style={{ fontSize: "35px", color: "#2e2c2c", margin: "20px 0", textAlign:'center' }}>
            Tableau de bord
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardNbrLiv />
            <div style={{ margin: "20px 0" }}>
              <h2 style={{ fontSize: "20px", color: "#2e2c2c" }}>
                Historique des livraisons
              </h2>
            </div>
            {/* Passer navigate comme prop si vous voulez gérer la navigation dans Tablev */}
            <Tablev navigate={navigate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
