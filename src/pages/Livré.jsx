import React from 'react';
import Tablev from "../Components/Tables/Tables";
import { useSelector } from 'react-redux';

const Livré = () => {
  const { commands } = useSelector((state) => state.command);

  // Filter deliveries with the status "En cours de livraison"
  const livraisonsLivré = commands.filter(livraison => livraison.StatutDeLivraison === "En cours de livraison");

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mt-5">
        <h1 className="text-4xl text-gray-800 mb-5 text-center">Marquer comme livré</h1>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl text-gray-800 mb-5">Confirmer les livraisons terminées</h2>
          <Tablev statusFilter="Livre" />
        </div>
      </div>
    </div>
  );
};

export default Livré;
