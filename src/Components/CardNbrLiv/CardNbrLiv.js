import React from 'react';
import { useSelector } from 'react-redux';
import { FaBox, FaCheckCircle, FaTimesCircle, FaTruck, FaUsers } from 'react-icons/fa';

const CardNbrLiv = () => {
  const commands = useSelector((state) => state.command.commands);
  const livraisonsAaccepter = commands.filter(command => command.status === 'EnAttente').length;
  const colisAuDepot = commands.filter(command => command.status === 'AuDepot').length;
  const livraisonsEffectuees = commands.filter(command => command.status === 'Livre').length;
  const livraisonsAnnulees = commands.filter(command => command.status === 'Annuler').length;
  const vendeurCount=useSelector((state)=>state.vendeurs.data.length)
  const cardData = [
    { title: 'Livraisons à accepter', count: livraisonsAaccepter, color: 'bg-blue-400', icon: <FaBox /> },
    { title: 'Colis au dépôt', count: colisAuDepot, color: 'bg-green-400', icon: <FaCheckCircle />  },
    { title: 'Livraisons effectuées', count: livraisonsEffectuees, color: 'bg-teal-400', icon:<FaTruck /> },
    { title: 'Livraisons annulées', count: livraisonsAnnulees, color: 'bg-red-400', icon: <FaTimesCircle /> },
    { title: 'Total Fournisseurs', count:  vendeurCount, color: 'bg-purple-400', icon: <FaUsers /> },
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

export default CardNbrLiv;
