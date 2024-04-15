import React, { useState,useEffect } from 'react';
import { Form, ButtonToolbar, Button, Input } from 'rsuite';
import NavBar from '../Components/Barnav/NavBar';
import SideNav from '../Components/SideNav/SideNav';
import mockUsers from '../assets/data/data'; // Assurez-vous d'importer correctement vos données
import Card from '../Components/Card/Card';
import ApiService from '../Services/Api/ApiService';
import { Table, Button as AntdButton } from 'antd';
import { debounce } from 'lodash';

const Runsheet = () => {
  const [idSearch, setIdSearch] = useState('');
  const [commandData, setCommandData] = useState([]);

  const handleSearch = async () => {
    // Clear previous results
    const encodedBarcode = encodeURIComponent(idSearch);
    try {
      console.log(idSearch);
      // Assuming getCommandByBarcode returns the command data for the given barcode
      const data = await ApiService.getCommandByBarcode(encodedBarcode);
      setCommandData(prevData => [...prevData, data])
    } catch (error) {
      console.error("Failed to fetch command data:", error);
      // Handle error appropriately, e.g., showing an error message to the user
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
      title: 'Telephone Vendeur',
      dataIndex: ['command', 'telephoneVendeur'], // Assuming nested structure; adjust if different
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
  
  ];
  const handleReset = () => {
    setIdSearch(''); // Clear search input
    setCommandData([]); // Clear displayed data
  };
  const debouncedSearch = debounce(() => {
    handleSearch();
  }, 300); // Adjust the timing based on your scanner's speed and reliability

  // Effect hook to trigger the search whenever idSearch changes and stops changing for 300ms
  useEffect(() => {
    if (idSearch) {
      debouncedSearch();
    }

    // Cleanup to cancel the debounced call if the component unmounts
    return () => {
      debouncedSearch.cancel();
    };
  }, [idSearch]);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <NavBar />
      <div style={{ display: "flex", height: "calc(100% - 55px)" }}>
        <div style={{ position: "fixed", top: "55px", left: 0, width: "250px", height: "calc(100vh - 55px)", overflowY: "auto" }}>
          <SideNav />
        </div>
        <div style={{ marginLeft: "250px", width: "calc(100% - 250px)", paddingTop: "20px" }}>
          <br />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ margin: "20px 0" }}>
              <h2 style={{ fontSize: "25px", color: "#2e2c2c" }}>Runsheet</h2>
            </div>
            <Form>
              <Form.Group controlId="id">
                <Form.ControlLabel>Id colis</Form.ControlLabel>
                <Input name="id" value={idSearch} onChange={value => setIdSearch(value)} />
              </Form.Group>
              <ButtonToolbar>
                
                <AntdButton onClick={handleReset} type="default" style={{ marginLeft: '12px' }}>Reset</AntdButton>
              </ButtonToolbar>
            </Form>
           
            <Table dataSource={commandData} columns={columns} rowKey="id" style={{ marginTop: '20px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Runsheet;
