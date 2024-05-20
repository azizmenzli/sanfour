import React from 'react';
import Tablev from "../Components/Tables/Tables";
import { useSelector } from 'react-redux';

const Encours = () => {
  const { commands } = useSelector((state) => state.command);

  // Filter deliveries with the status "Au dépôt"
  const livraisonsEnCours = commands.filter(livraison => livraison.StatutDeLivraison === "Au dépôt");

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mt-5">
        <h1 className="text-4xl text-gray-800 mb-5 text-center">Rendre en cours de livraison</h1>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl text-gray-800 mb-5">Pointage des colis sortants du dépôt</h2>
          <Tablev statusFilter="Expedier" newStatus="Livre" />
        </div>
      </div>
    </div>
  );
};

export default Encours;
