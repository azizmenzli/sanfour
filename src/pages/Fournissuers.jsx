import React, { useEffect, useState } from 'react';
import { Popconfirm, Button,Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ApiService from '../Services/Api/ApiService';
import { useDispatch,useSelector } from "react-redux";
import { fetchVendeurs } from '../features/slices/vendeursSlice';
export default function Fournissuers() {
  const [four, setFour] = useState([]);
  const dispatch = useDispatch();
  const vendeurs = useSelector((state) => state.vendeurs.data);
  const vendeursStatus = useSelector((state) => state.vendeurs.status);
  const error = useSelector((state) => state.vendeurs.error);
  useEffect(() => {
    if (vendeursStatus === 'idle') {
      dispatch(fetchVendeurs());
    }
  }, [vendeursStatus, dispatch]);

  const columns = [
    { title: 'Nom Fournisseur', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Telephone', dataIndex: 'telephone', key: 'telephone' },
    { title: 'Adresse', dataIndex: 'Adress', key: 'Adress' },
    { title: 'Nombre de Commandes', dataIndex: 'commandsCount', key: 'commandsCount' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        
        return(
        <Popconfirm
          title="Are you sure you want to delete this vendor?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} type="danger" />
        </Popconfirm>
      )},
    },
  ];
  const handleDelete = async (id) => {
    
    try {
      await ApiService.deleteUser(id); // Ensure this method and endpoint are correct.
      dispatch(fetchVendeurs()); // Refetch the vendor list to update the table.
    } catch (error) {
      console.error('Failed to delete vendor:', error);
      // Optionally display an error message to the user
    }
  };
  // Transform the data to include the commands count
  const dataSource = vendeurs.map((f) => ({
    key: f.id,
    name: f.name,
    email: f.email,
    telephone: f.telephone,
    Adress: f.Adress,
    commandsCount: f._count.commands,
  }));
  if (vendeursStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (vendeursStatus === 'failed') {
    return <div>{error}</div>;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Fournisseurs</h2>
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          pagination={{ pageSize: 10 }} 
          className="w-full bg-white"
        />
      </div>
    </div>
  );
}
