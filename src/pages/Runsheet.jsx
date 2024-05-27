import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Table, message } from 'antd';
import { debounce } from 'lodash';
import ApiService from '../Services/Api/ApiService';

const Runsheet = () => {
  const [idSearch, setIdSearch] = useState('');
  const [commandData, setCommandData] = useState([]);
  const inputRef = useRef(null);

  function extractBarcode(scannedBarcode) {
    // Remove the '#' and ',' characters from the barcode
    return scannedBarcode.replace(/[#.,]/g, '');
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
      key: 'command1Id',
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
    return () => debouncedSearch.cancel();
  }, [idSearch]);

  useEffect(() => {
    inputRef.current.focus(); // Auto-focus the input field when the component mounts
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full">
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #printTable, #printTable * {
              visibility: visible;
            }
            #printTable {
              position: fixed;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
            }
            .ant-table {
              width: 100%;
            }
            .ant-table-thead > tr > th {
              background-color: white;
              color: black;
              font-weight: bold;
            }
            .ant-table-tbody > tr > td {
              background-color: white;
              color: black;
            }
          }
        `}
      </style>
      <div className="flex flex-col mt-5 items-center">
        <h2 className="text-3xl text-gray-800 mb-5">Runsheet</h2>
        <Form className="w-full max-w-lg" layout="vertical">
          <Form.Item label="Id colis">
            <Input ref={inputRef} value={idSearch} onChange={e => setIdSearch(e.target.value)} />
          </Form.Item>
          <div className="flex justify-center mt-4 gap-4">
            <Button  onClick={handleSearch} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold  px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-150 ease-in-out">Search</Button>
            <Button onClick={handleReset} className="bg-gray-500 hover:bg-gray-600 text-white font-bold  px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-150 ease-in-out">Reset</Button>
            <Button onClick={handlePrint} className="bg-green-500 hover:bg-green-600 text-white font-bold  px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-150 ease-in-out">Print</Button>
          </div>
        </Form>
        <Table dataSource={commandData} columns={columns} rowKey="id" className="mt-8 w-full" id="printTable" />
      </div>
    </div>
  );
};

export default Runsheet;
