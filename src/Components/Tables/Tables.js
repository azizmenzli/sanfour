import React, { useState,useEffect } from 'react';
import { Table, TagPicker } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import mockUsers from '../../assets/data/data';
import { fetchAllCommands, setStatusFilter } from '../../features/slices/commandSlice';
const { Column, HeaderCell, Cell } = Table;

const Tablev = ({ statusFilter }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { id,commands, status,nomArticle, error} = useSelector((state) => state.command);
  useEffect(() => {
    dispatch(fetchAllCommands());
  }, [dispatch]);
  console.log(commands);
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
  const ActionCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: '6px', display: 'flex', justifyContent: 'space-around' }}>
      <button style={{ marginRight: '10px', border: 'groove', borderColor: 'green',borderRadius:'5px', height: '25px' }} onClick={() => console.log('Confirmer', rowData)}>Confirmer</button>
      <button style={{ border: 'groove', borderColor: 'red',borderRadius:'5px', height: '25px' }} onClick={() => console.log('Annuler', rowData)}>Annuler</button>
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
