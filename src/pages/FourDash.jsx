import React from "react";
import Tablev from "../Components/Tables/Tables";
import CardFour from "../Components/CardFour/CardFour";

const FourDash = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-1 p-6">
        <h1 className="text-4xl text-gray-800 mb-8">Tableau de bord</h1>
        <div className="flex flex-col items-center">
          <CardFour />
          <div className="my-8">
            <h2 className="text-2xl text-gray-800 mb-4">Historique des livraisons</h2>
            <Tablev />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourDash;
