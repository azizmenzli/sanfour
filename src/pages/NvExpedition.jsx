import React from 'react';
import NewOrder from '../Components/NewOrder/NewOrder'
import SideNav from '../Components/SideNav/SideNav';
import NavBar from '../Components/Barnav/NavBar';

const NvExpedition = () => {
    return (
        <div className="ma-page-container">
        <NavBar/>
        <SideNav className="ma-page-container">
        <div>
            <br/><br/>
            <h1 style={{fontSize: '35px',color:'#2e2c2c', textAlign:'center'}}>Nouvelle expédition</h1><br/>
            <h2 style={{fontSize: '25px',color:'#2e2c2c', textAlign:'center'}}>Créer une nouvelle livraison</h2><br/><br/>
            <NewOrder />
        </div>
        </SideNav>
        </div>
    );
};

export default NvExpedition;