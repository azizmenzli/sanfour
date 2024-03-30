import React from 'react';
import { Panel, Row, Col } from 'rsuite';
import mockUsers from '../../assets/data/data'; // Assurez-vous que ce chemin d'importation est correct

const CardNbrLiv = () => {
  // Calcul des nombres pour chaque statut
  const livraisonsAaccepter = mockUsers.filter(user => user.StatutDeLivraison === 'En attente').length;
  const colisAuDepot = mockUsers.filter(user => user.StatutDeLivraison === 'Au dépôt').length;
  const livraisonsEffectuees = mockUsers.filter(user => user.StatutDeLivraison === 'Livré').length;
  const livraisonsAnnulees = mockUsers.filter(user => user.StatutDeLivraison === 'Annulé').length; // Ajouté si vous avez des données pour ce statut

  return (
    <Row style={{display:'flex',margin:'10px'}}>
      <Col >
        <Panel bordered header="Livraisons à accepter" style={{borderColor:'black'}}>
          <text style={{fontSize:'40px',color:'#2e2c2c'}}>{livraisonsAaccepter}</text>
        </Panel>
      </Col>
      <Col >
        <Panel bordered header="Colis au dépôt" style={{borderColor:'black'}}>
          <text style={{fontSize:'40px',color:'green'}}>{colisAuDepot}</text>
        </Panel>
      </Col>
      <Col >
        <Panel bordered header="Livraisons effectuées" style={{borderColor:'black'}}>
          <text style={{fontSize:'40px'}}>{livraisonsEffectuees}</text>
        </Panel>
      </Col>
      <Col >
        <Panel bordered header="Livraisons annulées" style={{borderColor:'black'}}>
          <text style={{fontSize:'40px'}}>{livraisonsAnnulees}</text>
        </Panel>
      </Col>
    </Row>
  );
};

export default CardNbrLiv;
