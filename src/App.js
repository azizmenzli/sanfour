import React from "react";
import "./App.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NvExpedition from "./pages/NvExpedition";
import LivraisonAaccepter from "./pages/LivraisonAaccepter";
import Encours from "./pages/Encours";
import Livré from "./pages/Livré";
import NewAdmin from "./pages/NewAdmin";
import NewSeller from "./pages/NewSeller";
import Runsheet from "./pages/Runsheet";
import BonDeLivraison from "./pages/BonDeLivraison";
import FourDash from "./pages/FourDash";
import Login from "./Components/Login/Login";
import { useSelector } from "react-redux";
import CommonLayout from "./Components/Layout";
import ChangePasswordForm from "./Components/Login/ChangePassword";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      <BrowserRouter style={{ display: "flex" }}>
        <Routes>
          <Route path="/change-password" element={isAuthenticated ? <ChangePasswordForm /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Navigate to="/Dashboard" /> : <Login />} />
          <Route path="/Dashboard" element={isAuthenticated ? <CommonLayout><Dashboard /></CommonLayout> : <Navigate to="/" />} />
          <Route path="/Suivi" element={isAuthenticated ? <CommonLayout><Home /></CommonLayout> : <Navigate to="/" />} />
          <Route path="/fournisseur-dashboard" element={isAuthenticated ? <CommonLayout><FourDash /></CommonLayout> : <Navigate to="/" />} />
          <Route path="/Nv-expedition" element={isAuthenticated ? <CommonLayout><NvExpedition /></CommonLayout> : <Navigate to="/" />} />
          <Route path="/Livraisonaaccepter" element={isAuthenticated ? <CommonLayout><LivraisonAaccepter /></CommonLayout> : <Navigate to="/" />} />
          <Route path="/En-cours-de-livraison" element={isAuthenticated ? <CommonLayout><Encours /></CommonLayout> : <Navigate to="/" />} />
          <Route path="/Livraison-Livré" element={isAuthenticated ? <CommonLayout><Livré /></CommonLayout> : <Navigate to="/" />} />
          <Route path="/Ajouter-admin" element={isAuthenticated ? <CommonLayout><NewAdmin /></CommonLayout> : <Navigate to="/" />} />
          <Route path="/Ajouter-fournisseur" element={isAuthenticated ? <CommonLayout><NewSeller /></CommonLayout> : <Navigate to="/" />} />
          <Route path="/Runsheet" element={isAuthenticated ? <CommonLayout><Runsheet /></CommonLayout> : <Navigate to="/" />} />
          <Route path="/BonDeLivraison" element={isAuthenticated ? <CommonLayout><BonDeLivraison /></CommonLayout> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
