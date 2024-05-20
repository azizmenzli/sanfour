import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";
import { FcComboChart, FcInTransit, FcPlus,FcFilingCabinet, FcOk,FcTodoList  } from "react-icons/fc";
import { FcSerialTasks } from "react-icons/fc";
import { BiBarcodeReader } from "react-icons/bi";
import { useSelector } from "react-redux";

const SideNav = ({ children }) => {
  const {role}=useSelector((state)=>state.auth)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  let menuItems;
  if (role === "Fournisseur") {
     menuItems = [
      { path: "/fournisseur-dashboard", name: "FourDash", icon: <FcComboChart /> },
      { path: "/Nv-expedition", name: "Nv expedition", icon: <FcPlus /> },
    { path: "/", name: "Suivi de colis", icon: <FcInTransit /> },
  ]
} else {
  menuItems =[
    { path: "/Dashboard", name: "Dashboard", icon: <FcComboChart /> },
    { path: "/Nv-expedition", name: "Nv expedition", icon: <FcPlus /> },
    {
      path: "/Livraisonaaccepter",
      name: "Livraison à accepter",
      icon: <FcFilingCabinet />      ,
    },
    {
      path: "/En-cours-de-livraison",
      name: "Rendre En cours de livraison",
      icon: <FcInTransit />,
    }, // Utilisez l'icône appropriée
    { path: "/Livraison-Livré", name: "Marquer Livré", icon: <FcOk /> }, // Utilisez l'icône appropriée
    { path: "/Runsheet", name: "Runsheet", icon: <BiBarcodeReader />
    }, // Utilisez l'icône appropriée
    { path: "/Ajouter-admin", name: "Ajouter un admin", icon: <FcPlus /> },
    {
      path: "/Ajouter-fournisseur",
      name: "Ajouter un fournisseur",
      icon: <FcPlus />,
    },
  ];
}

  return (
    <div className="container">
    <div className="sidebar" style={{ width: isOpen ? "250px" : "50px",position: "fixed" }}>
      <div
        className="top_section"
        style={{ justifyContent: isOpen ? "space-between" : "center" }}
      >
        <h1 style={{ display: isOpen ? "block" : "none", fontSize: "20px" }}>
        Menu principal
        </h1>
        <CiBoxList onClick={toggle} style={{fontSize:'25px'}}/>
      </div>
      {menuItems.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className="link"
          activeClassName="active"
          style={{ padding: isOpen ? "10px" : "10px 0px" }}
        >
          <div className="icon">{item.icon}</div>
          {isOpen && <div className="link_text">{item.name}</div>}
        </NavLink>
      ))}
    </div>
    <main>{children}</main>
  </div>
  );
};

export default SideNav;
// import React, { useState } from 'react';
// import { Layout, Menu } from 'antd';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import {
//   DashboardOutlined,
//   PlusOutlined,
//   BarcodeOutlined,
//   InboxOutlined,
//   FileDoneOutlined,
//   CarryOutOutlined,
//   UserAddOutlined
// } from '@ant-design/icons';

// const { Sider } = Layout;
// const AntDSideNav = () => {
//   const { role } = useSelector(state => state.auth);
//   const [collapsed, setCollapsed] = useState(false);

//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   const menuItems = role === "Fournisseur" ? [
//     { path: "/fournisseur-dashboard", name: "Dashboard", icon: <DashboardOutlined /> },
//     { path: "/Nv-expedition", name: "New Expedition", icon: <PlusOutlined /> },
//     { path: "/", name: "Track Parcels", icon: <BarcodeOutlined /> },
//   ] : [
//     { path: "/Dashboard", name: "Dashboard", icon: <DashboardOutlined /> },
//     { path: "/Nv-expedition", name: "New Expedition", icon: <PlusOutlined /> },
//     { path: "/Livraisonaaccepter", name: "Accept Deliveries", icon: <InboxOutlined /> },
//     { path: "/En-cours-de-livraison", name: "In Delivery", icon: <CarryOutOutlined /> },
//     { path: "/Livraison-Livré", name: "Mark as Delivered", icon: <FileDoneOutlined /> },
//     { path: "/Runsheet", name: "Runsheet", icon: <BarcodeOutlined /> },
//     { path: "/Ajouter-admin", name: "Add Admin", icon: <UserAddOutlined /> },
//     { path: "/Ajouter-fournisseur", name: "Add Supplier", icon: <UserAddOutlined /> },
//   ];

//   return (
//     <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
//       <div className="logo" />
//       <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
//         {menuItems.map((item, index) => (
//           <Menu.Item key={index} icon={item.icon}>
//             <NavLink to={item.path}>{item.name}</NavLink>
//           </Menu.Item>
//         ))}
//       </Menu>
//     </Sider>
//   );
// };

// export default AntDSideNav;
