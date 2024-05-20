import React from 'react';
import Tablev from "../Components/Tables/Tables";
import { useSelector } from 'react-redux';

const LivraisonAaccepter = () => {
  const { commands } = useSelector((state) => state.command);

  // Filter the deliveries with the status "En attente"
  const livraisonsEnAttente = commands.filter(livraison => livraison.StatutDeLivraison === "EnAttente");

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mt-5">
        <h1 className="text-4xl text-gray-800 mb-5 text-center">Déposer les colis au dépôt</h1>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl text-gray-800 mb-5">Pointage des colis entrants au dépôt</h2>
          <Tablev statusFilter="AuDepot" newStatus='Expedier' />
        </div>
      </div>
    </div>
  );
};

export default LivraisonAaccepter;
