import React, { useState,useEffect } from 'react';
import { Table, TagPicker } from 'rsuite';
import { useNavigate,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import mockUsers from '../../assets/data/data';
import { fetchAllCommands, setStatusFilter } from '../../features/slices/commandSlice';
import ApiService from '../../Services/Api/ApiService';
const { Column, HeaderCell, Cell } = Table;

const Tablev = ({ statusFilter }) => {
  const location =useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();

console.log(location.pathname);
  const { id,commands, status,nomArticle, error} = useSelector((state) => state.command);
  useEffect(() => {
    dispatch(fetchAllCommands());
  }, [dispatch]);
  
  const defaultColumns = [
    { key: 'id', label: 'Id', fixed: true, width: 70 },
    { key: 'nomArticle', label: 'Produit', width: 110 },
    { key: 'prixTTC', label: 'Prix', width: 110 },
    { key: 'adresseClient', label: 'Client', width: 110 },
    { key: 'status', label: 'Statut de livraison', width: 130 },
    { key: 'actions', label: 'Actions', width: 170 }
  ];

  const [columnKeys, setColumnKeys] = useState(defaultColumns.map(column => column.key).filter(key => !defaultColumns.find(col => col.key === key).hidden));

  const CompactCell = ({ rowData, dataKey, ...props }) => <Cell {...props} style={{ padding: 4 }} />;
 
  
  const CompactHeaderCell = ({ rowData, dataKey, ...props }) => <HeaderCell {...props} style={{ padding: 4 }} />;
  const handleStatusChange = async (commandId, newStatus) => {
    console.log(commandId);
    try {
      const response = await ApiService.updateCommandStatus(commandId, newStatus);
      console.log('Status updated successfully', response);
      // After updating, you might want to refresh the commands list to show updated status
      dispatch(fetchAllCommands()); // Assuming fetchAllCommands will refresh the list
    } catch (error) {
      console.error('Failed to update status', error);
      // Handle error (e.g., show error message to the user)
    }
  };
  const ActionCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: '6px', display: 'flex', justifyContent: 'space-around' }}>
      <button style={{ marginRight: '10px', border: 'groove', borderColor: 'green',borderRadius:'5px', height: '25px' }} onClick={() => handleStatusChange(rowData.id, 'AuDepot')}>Confirmer</button>
      <button style={{ border: 'groove', borderColor: 'red',borderRadius:'5px', height: '25px' }} onClick={() => handleStatusChange(rowData.id, 'Annuler')}>Annuler</button>
    </Cell>
  );

  // Filtrer les données basées sur le statut passé en prop
  const filteredData = commands.filter(command =>
    statusFilter ? command.status === statusFilter : true
  )

  const IdCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 4, cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => navigate(`/BonDeLivraison?id=${rowData[dataKey]}`)}>
      {rowData[dataKey]}
    </Cell>
  );

  return (
    <div style={{ width: '700px' }}>
      <Table
        height={400}
        hover
        showHeader
        autoHeight
        data={filteredData}
        bordered
        cellBordered
        headerHeight={30}
        rowHeight={46}
        sortType='asc'
      >
        {defaultColumns.filter(column => columnKeys.includes(column.key)).map(column => (
          <Column key={column.key} width={column.width} fixed={column.fixed}>
            <HeaderCell>{column.label}</HeaderCell>
            {column.key === 'id' ? (
              <IdCell dataKey={column.key} />
            ) : column.key === 'actions' ? (
              <ActionCell dataKey={column.key} />
            ) : (
              <Cell dataKey={column.key} />
            )}
          </Column>
        ))}
      </Table>
    </div>
  );
};

export default Tablev;
