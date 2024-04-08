import React from 'react';
import Tablev from "../Components/Tables/Tables";
import NavBar from "../Components/Barnav/NavBar";
import SideNav from "../Components/SideNav/SideNav";
import mockUsers from '../assets/data/data';

const Livré = () => {
  const livraisonsLivré = mockUsers.filter(livraison => livraison.StatutDeLivraison === "En cours de livraison");

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
        ><br/>
          <h1 style={{ fontSize: "35px", color: "#2e2c2c", margin: "20px 0", textAlign:'center' }}>
            Marquer comme livré
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "20px 0" }}>
              <h2 style={{ fontSize: "20px", color: "#2e2c2c" }}>
                Confirmer les livraisons terminées
              </h2>
            </div>
            {/* Tableau affiché ici */}
            <Tablev statusFilter="En cours de livraison"/>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Livré;