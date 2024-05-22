import React from 'react';
import { Steps } from 'antd';
import { FcInTransit, FcSynchronize, FcShop } from "react-icons/fc";
import { CheckCircleOutlined } from '@ant-design/icons';

const getStepIcon = (status) => {
  switch (status) {
    case 'EnAttente':
      return <FcSynchronize className="text-2xl" />;
    case 'AuDepot':
      return <FcShop className="text-2xl" />;
    case 'Expedier':
      return <FcInTransit className="text-2xl" />;
    case 'Livre':
      return <CheckCircleOutlined className="text-2xl text-green-500" />;
    default:
      return null;
  }
};

const StepsComponent = ({ livraison }) => {
  const steps = [
    { title: 'Remis au transporteur', description: `${livraison?.adresseVendeur}`, status: 'EnAttente' },
    { title: 'Au dépôt', description: 'Résidence Farah Num61 Borj Cedria', status: 'AuDepot' },
    { title: 'En cours de livraison', description: '', status: 'Expedier' },
    { title: 'Livré', description: `${livraison?.adresseClient}`, status: 'Livre' },
  ];

  const currentStepIndex = steps.findIndex(step => step.status === livraison.status);

  return (
    <Steps
      progressDot
      current={currentStepIndex}
      items={steps.map(step => ({
        title: step.title,
        description: step.description,
        icon: getStepIcon(step.status),
      }))}
    />
  );
};

export default StepsComponent;
