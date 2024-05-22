import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Table, message } from 'antd';
import { debounce } from 'lodash';
import ApiService from '../Services/Api/ApiService';

const Runsheet = () => {
  const [idSearch, setIdSearch] = useState('');
  const [commandData, setCommandData] = useState([]);
  const inputRef = useRef(null);
  function extractBarcode(scannedBarcode){
    // Remove the '#' and ',' characters from the barcode
    return scannedBarcode.replace(/[#,]/g, '');
  }
  const actualBarcode = extractBarcode(idSearch);
  const handleSearch = async () => {
    const encodedBarcode = encodeURIComponent(actualBarcode);
    try {
      const data = await ApiService.getCommandByBarcode(encodedBarcode);
      setCommandData(prevData => [...prevData, data]);
      setIdSearch(''); // Clear the input after search
    } catch (error) {
      message.error("Failed to fetch command data.");
      console.error("Failed to fetch command data:", error);
    } finally {
      inputRef.current.focus(); // Auto-focus the input field after search
    }
  };

  const columns = [
    {
      title: 'Command ID',
      dataIndex: 'commandId',
      key: 'commandId',
    },
    {
      title: 'Article Name',
      dataIndex: 'articleName',
      key: 'articleName',
    },
    {
      title: 'Nom du Client',
      dataIndex: ['command', 'clientName'],
      key: 'clientName',
      render: (text, record) => record.command.clientName,
    },
    {
      title: 'Telephone Vendeur',
      dataIndex: ['command', 'telephoneVendeur'],
      key: 'telephoneVendeur',
      render: (text, record) => record.command.telephoneVendeur,
    },
    {
      title: 'Telephone Client',
      dataIndex: ['command', 'telephoneClient'],
      key: 'telephoneClient',
      render: (text, record) => record.command.telephoneClient,
    },
    {
      title: 'Adresse Client',
      dataIndex: ['command', 'adresseClient'],
      key: 'adresseClient',
      render: (text, record) => record.command.adresseClient,
    },
    {
      title: 'Ville Client',
      dataIndex: ['command', 'villeClient'],
      key: 'villeClient',
      render: (text, record) => record.command.villeClient,
    },
    {
      title: 'Nombre de colis',
      dataIndex: 'totalParcels',
      key: 'totalParcels',
    },
  ];

  const handleReset = () => {
    setIdSearch('');
    setCommandData([]);
    inputRef.current.focus(); // Auto-focus the input field after reset
  };

  const debouncedSearch = debounce(() => {
    handleSearch();
  }, 300);

  useEffect(() => {
    if (idSearch) {
      debouncedSearch();
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [idSearch]);

  useEffect(() => {
    inputRef.current.focus(); // Auto-focus the input field when the component mounts
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mt-5 items-center">
        <h2 className="text-3xl text-gray-800 mb-5">Runsheet</h2>
        <Form className="w-full max-w-lg" layout="vertical">
          <Form.Item label="Id colis">
            <Input ref={inputRef} value={idSearch} onChange={e => setIdSearch(e.target.value)} />
          </Form.Item>
          <div className="flex justify-center mt-4">
            <Button type="primary" onClick={handleSearch}>Search</Button>
            <Button onClick={handleReset} className="ml-4">Reset</Button>
          </div>
        </Form>
        <Table dataSource={commandData} columns={columns} rowKey="id" className="mt-8 w-full" />
      </div>
    </div>
  );
};

export default Runsheet;
