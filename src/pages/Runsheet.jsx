import React, { useState } from 'react';
import { Form, ButtonToolbar, Button, Input, Table } from 'rsuite';
import NavBar from '../Components/Barnav/NavBar';
import SideNav from '../Components/SideNav/SideNav';
import mockUsers from '../assets/data/data'; // Assurez-vous d'importer correctement vos données

const { Column, HeaderCell, Cell } = Table;

const Runsheet = () => {
  const [idSearch, setIdSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Filtrez les données basées sur l'ID de recherche
    const filteredResults = mockUsers.filter(user => user.id === Number(idSearch));
    setResults(filteredResults);
  };

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
                <Button onClick={handleSearch} appearance="ghost">Submit</Button>
              </ButtonToolbar>
            </Form>
            {results.length > 0 && (
              <Table height={400} data={results}>
                <Column width={70} align="center" fixed>
                  <HeaderCell>Id</HeaderCell>
                  <Cell dataKey="id" />
                </Column>
                {/* Ajoutez plus de colonnes selon vos données */}
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Runsheet;
