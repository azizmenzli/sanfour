import React from 'react';
import { Panel, Row, Col } from 'rsuite';
import mockUsers from '../../assets/data/data'; // Assurez-vous que ce chemin d'importation est correct
import { useSelector } from 'react-redux';
const CardNbrLiv = () => {
  const commands = useSelector((state) => state.command.commands);
  // Calcul des nombres pour chaque statut
  const livraisonsAaccepter = commands.filter(command => command.status === 'EnAttente').length;
  const colisAuDepot = commands.filter(command => command.status === 'AuDepot').length; // Ensure the status matches your enum values exactly
  const livraisonsEffectuees = commands.filter(command => command.status === 'Livre').length;
  const livraisonsAnnulees = commands.filter(command => command.status === 'Annuler').length;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
      <div className="card" style={{ textAlign: 'center', backgroundColor: '#f7f7f7', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '200px', borderRadius: '10px', padding: '20px' }}>
        <h3>Livraisons à accepter</h3>
        <span style={{ fontSize: '40px', color: '#007bff' }}>{livraisonsAaccepter}</span>
      </div>
      <div className="card" style={{ textAlign: 'center', backgroundColor: '#f7f7f7', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '200px', borderRadius: '10px', padding: '20px' }}>
        <h3>Colis au dépôt</h3>
        <span style={{ fontSize: '40px', color: '#28a745' }}>{colisAuDepot}</span>
      </div>
      <div className="card" style={{ textAlign: 'center', backgroundColor: '#f7f7f7', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '200px', borderRadius: '10px', padding: '20px' }}>
        <h3>Livraisons effectuées</h3>
        <span style={{ fontSize: '40px', color: '#17a2b8' }}>{livraisonsEffectuees}</span>
      </div>
      <div className="card" style={{ textAlign: 'center', backgroundColor: '#f7f7f7', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '200px', borderRadius: '10px', padding: '20px' }}>
        <h3>Livraisons annulées</h3>
        <span style={{ fontSize: '40px', color: '#dc3545' }}>{livraisonsAnnulees}</span>
      </div>
    </div>
  );
};

export default CardNbrLiv;
