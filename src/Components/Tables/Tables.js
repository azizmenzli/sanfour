import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import { fetchAllCommands } from '../../features/slices/commandSlice';
import ApiService from '../../Services/Api/ApiService';

const statusMapping = {
  EnAttente: "En Attente",
  Remis: "Remis",
  AuDepot: "Au Dépôt",
  Expedier: "Expédié",
  Livre: "Livré",
  Annuler: "Annulé"
};
const Tablev = ({ statusFilter, newStatus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { commands } = useSelector(state => state.command);

  useEffect(() => {
    dispatch(fetchAllCommands());
  }, [dispatch]);
  
  const handleStatusChange = useCallback(async (commandId, status) => {
    try {
      const response = await ApiService.updateCommandStatus(commandId, status);
      
      dispatch(fetchAllCommands());
    } catch (error) {
      console.error('Failed to update status', error);
    }
  }, [dispatch]);

  const handleCancel = useCallback((commandId) => {
    handleStatusChange(commandId, 'Annuler');
  }, [handleStatusChange]);
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      render: text => <Button type="link" onClick={() => navigate(`/BonDeLivraison?id=${text}`)}>{text}</Button>
    },
    { title: 'Produit', dataIndex: 'nomArticle', key: 'nomArticle', width: 110 },
    { title: 'Prix', dataIndex: 'prixTTC', key: 'prixTTC', width: 110 },
    { title: 'Client', dataIndex: 'adresseClient', key: 'adresseClient', width: 110 },
    {
      title: 'Nom du Client',
      dataIndex:  'clientName',
      key: 'clientName',
      width:110,
    },
    { title: 'Statut de livraison', dataIndex: 'status', key: 'status', width: 130,render: (text) => statusMapping[text] || text },
    {
      title: 'Nombre de colis',
      dataIndex: 'parcelCount',
      key: 'parcelCount',
      width:110
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 170,
      render: (_, record) => (
        <>
          <Button onClick={() => handleStatusChange(record.id, newStatus)} style={{ marginRight: 8 }}>Confirmer</Button>
          <Button danger onClick={() => handleCancel(record.id)} disabled={record.status === 'Livre'}>Annuler</Button>
        </>
      ),
    }
  ];

  const filteredData = commands.filter(command => statusFilter ? command.status === statusFilter : true);



  return (
    <div style={{ width: 'auto' }}>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 50 }}
        scroll={{ y: 400 }}
      />
    </div>
  );
};

export default Tablev;
