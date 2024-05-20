import React from 'react';
import NewOrder from '../Components/NewOrder/NewOrder';
import CommonLayout from '../Components/Layout';

const NvExpedition = () => {
  return (
    
      <div className="text-center mt-10">
        <h1 className="text-4xl text-gray-800">Nouvelle expédition</h1>
        <h2 className="text-2xl text-gray-800 mt-5">Créer une nouvelle livraison</h2>
        <NewOrder />
      </div>
    
  );
};

export default NvExpedition;
