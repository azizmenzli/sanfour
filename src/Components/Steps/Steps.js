import React from 'react';
import { Timeline } from 'antd';
import { FcInTransit, FcSynchronize, FcShop } from "react-icons/fc";
import { CheckCircleOutlined } from '@ant-design/icons';

const getStepIcon = (status) => {
  switch (status) {
    case 'Remis au transporteur':
      return <FcSynchronize className="text-2xl" />;
    case 'Au dépôt':
      return <FcShop className="text-2xl" />;
    case 'En cours de livraison':
      return <FcInTransit className="text-2xl" />;
    case 'Livré':
      return <CheckCircleOutlined className="text-2xl text-green-500" />;
    default:
      return null;
  }
};

const StepsComponent = ({ livraison }) => {
  const steps = [
    { title: 'Remis au transporteur', description: `${livraison?.dateTransporteur} - ${livraison?.villeTransporteur}`, status: 'Remis au transporteur' },
    { title: 'Au dépôt', description: `${livraison?.dateDepot} - ${livraison?.villeDepot}`, status: 'Au dépôt' },
    { title: 'En cours de livraison', description: `${livraison?.dateEnCours} - ${livraison?.villeEnCours}`, status: 'En cours de livraison' },
    { title: 'Livré', description: `${livraison?.dateLivraison} - ${livraison?.villeLivraison}`, status: 'Livré' },
  ];

  return (
    <Timeline className="custom-timeline">
      {steps.map((step, index) => (
        <Timeline.Item key={index} dot={getStepIcon(step.status)}>
          <div className="ml-4">
            <p className="text-sm text-gray-500">{step.description}</p>
            <p className="font-medium">{step.title}</p>
          </div>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default StepsComponent;
