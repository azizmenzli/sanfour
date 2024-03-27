import React from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import Tablev from '../components/Tables';
import CardNbrcolis from '../components/AdminCardDash';

const AdminDash = () => {
    return (
        <>
        <SidebarAdmin>
        <div>
            <h1>AdminDash</h1>
        </div>
        <div>
        
        <h1 style={{ fontSize: "35px", color: "#2e2c2c" }}>Tableau de bord</h1>
        <br />
        <h2 style={{ fontSize: "20px", color: "#2e2c2c" }}>
          Historique des livraisons
        </h2>
        <br />
        <br />
        <br />
        <br />
        <br />
        <CardNbrcolis style={{position:'fixed'}}/>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Tablev />
      </div>
        </SidebarAdmin>
        </>
    );
};

export default AdminDash;