import React from 'react';
import Drawersuivi from '../Components/Drawersuivi/Drawersuivi';
import NavBar from '../Components/Barnav/NavBar';
import SideNav from '../Components/SideNav/SideNav'

const Home = () => {
    return (
        <div className="ma-page-container">
            <NavBar />
            <SideNav/>
            <Drawersuivi/>
        </div>
    );
};

export default Home;