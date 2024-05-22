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
import ProtectedRoute from "./Components/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);

  return (
    <div className="App">
      <BrowserRouter style={{ display: "flex" }}>
        <Routes>
          <Route path="/change-password" element={<ProtectedRoute><CommonLayout><ChangePasswordForm /></CommonLayout></ProtectedRoute>} />
          <Route path="/" element={isAuthenticated ? <Navigate to={userRole === 'VENDEUR' ? "/fournisseur-dashboard":"/Dashboard"} /> : <Login />} />
          <Route path="/Dashboard" element={<ProtectedRoute roles={['ADMIN']}><CommonLayout><Dashboard /></CommonLayout></ProtectedRoute>} />
          <Route path="/Suivi" element={<ProtectedRoute roles={['VENDEUR']}><CommonLayout><Home /></CommonLayout></ProtectedRoute>} />
          <Route path="/fournisseur-dashboard" element={<ProtectedRoute roles={['VENDEUR']}><CommonLayout><FourDash /></CommonLayout></ProtectedRoute>} />
          <Route path="/Nv-expedition" element={<ProtectedRoute roles={['ADMIN', 'VENDEUR']}><CommonLayout><NvExpedition /></CommonLayout></ProtectedRoute>} />
          <Route path="/Livraisonaaccepter" element={<ProtectedRoute roles={['ADMIN']}><CommonLayout><LivraisonAaccepter /></CommonLayout></ProtectedRoute>} />
          <Route path="/En-cours-de-livraison" element={<ProtectedRoute roles={['ADMIN']}><CommonLayout><Encours /></CommonLayout></ProtectedRoute>} />
          <Route path="/Livraison-Livré" element={<ProtectedRoute roles={['ADMIN']}><CommonLayout><Livré /></CommonLayout></ProtectedRoute>} />
          <Route path="/Ajouter-admin" element={<ProtectedRoute roles={['ADMIN']}><CommonLayout><NewAdmin /></CommonLayout></ProtectedRoute>} />
          <Route path="/Ajouter-fournisseur" element={<ProtectedRoute roles={['ADMIN']}><CommonLayout><NewSeller /></CommonLayout></ProtectedRoute>} />
          <Route path="/Runsheet" element={<ProtectedRoute roles={['ADMIN']}><CommonLayout><Runsheet /></CommonLayout></ProtectedRoute>} />
          <Route path="/BonDeLivraison" element={<ProtectedRoute roles={['ADMIN']}><CommonLayout><BonDeLivraison /></CommonLayout></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
