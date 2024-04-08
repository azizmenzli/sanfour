import React from 'react';
import mockUsers from '../../assets/data/data'; // Assurez-vous que ce chemin d'importation est correct

const CardFour = () => {
  const livraisonsAaccepter = mockUsers.filter(user => user.StatutDeLivraison === 'En attente').length;
  const livraisonsEffectuees = mockUsers.filter(user => user.StatutDeLivraison === 'Livré').length;
  const livraisonsAnnulees = mockUsers.filter(user => user.StatutDeLivraison === 'Annulé').length;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
      <div className="card" style={{ textAlign: 'center', backgroundColor: '#f7f7f7', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '200px', borderRadius: '10px', padding: '20px' }}>
        <h3>Livraisons en attente</h3>
        <span style={{ fontSize: '40px', color: '#007bff' }}>{livraisonsAaccepter}</span>
      </div>
      <div className="card" style={{ textAlign: 'center', backgroundColor: '#f7f7f7', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '200px', borderRadius: '10px', padding: '20px' }}>
        <h3>Livraisons effectuées</h3>
        <span style={{ fontSize: '40px', color: '#28a745' }}>{livraisonsEffectuees}</span>
      </div>
      <div className="card" style={{ textAlign: 'center', backgroundColor: '#f7f7f7', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '200px', borderRadius: '10px', padding: '20px' }}>
        <h3>Livraisons annulées</h3>
        <span style={{ fontSize: '40px', color: '#dc3545' }}>{livraisonsAnnulees}</span>
      </div>
    </div>
  );
};

export default CardFour;
