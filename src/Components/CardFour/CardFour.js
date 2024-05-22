import React from 'react';
import { useSelector } from 'react-redux';
import { FaBox, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const CardFour = ({commands}) => {
  // const commands = useSelector((state) => state.command.commands);

  const livraisonsAaccepter = commands.filter(user => user.status === 'EnAttente').length;
  const livraisonsEffectuees = commands.filter(user => user.status === 'Livre').length;
  const livraisonsAnnulees = commands.filter(user => user.status === 'Annuler').length;

  const cardData = [
    { title: 'Livraisons en attente', count: livraisonsAaccepter, color: 'bg-blue-500', icon: <FaBox /> },
    { title: 'Livraisons effectuées', count: livraisonsEffectuees, color: 'bg-green-500', icon: <FaCheckCircle /> },
    { title: 'Livraisons annulées', count: livraisonsAnnulees, color: 'bg-red-500', icon: <FaTimesCircle /> },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`relative bg-white shadow-md rounded-lg p-6 w-64 text-center transform transition-transform hover:scale-105 hover:shadow-lg ${card.color} text-white`}
        >
          <div className="absolute top-4 right-4 text-2xl">
            {card.icon}
          </div>
          <h3 className="text-lg font-medium mb-2">{card.title}</h3>
          <span className="text-4xl font-bold">{card.count}</span>
        </div>
      ))}
    </div>
  );
};

export default CardFour;
