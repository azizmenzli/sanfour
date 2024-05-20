import React from "react";
import { useNavigate } from "react-router-dom";
import Tablev from "../Components/Tables/Tables";
import CardNbrLiv from "../Components/CardNbrLiv/CardNbrLiv";
import mockUsers from "../assets/data/data"; // Ensure the path is correct

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex flex-col flex-1 mt-5">
        <h1 className="text-4xl text-gray-800 mb-8">Tableau de bord</h1>
        <CardNbrLiv />
        <div className="my-8">
          <h2 className="text-2xl text-gray-800 mb-4">Historique des livraisons</h2>
          <Tablev navigate={navigate} newStatus="AuDepot" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
