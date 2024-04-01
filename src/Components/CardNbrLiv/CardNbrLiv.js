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
