import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import mockUsers from "../assets/data/data"; // Assurez-vous que le chemin est correct
import Logo from "../assets/images/logo.png";
import Codebarre from "../assets/images/code-barres.gif";
import { compareAsc } from "rsuite/esm/utils/dateUtils";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BonDeLivraison = () => {
  const {commands}=useSelector((state)=>state.command)
  const {user}=useSelector((state)=>state.auth)
  

  let query = useQuery();
  let id = parseInt(query.get("id"), 10); // Convertit l'ID en nombre
  
  const livraison = commands.find((livraison) => livraison.id === id);
  

  if (!livraison) {
    return <p>Livraison non trouvée.</p>;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        .bon-de-livraison {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: auto;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .header-logo {
          width: 120px;
          flex: 1;
        }
        .header-title {
          text-align: right;
          flex-grow: 2;
        }
        .codebarres-container {
          width: 100%; /* Prend toute la largeur */
          display: flex;
          justify-content: center; /* Centre le code barres */
          margin: 20px 0; /* Ajoute un peu d'espace autour du code barres */
        }
        .codebarres {
          width: 120px; /* Largeur du code barres */
        }
        .info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .info > div {
          width: 48%;
        }
        .articles {
          margin-bottom: 20px;
        }
      
        .articles h2 {
          text-align: center;
          color: #333;
          margin-bottom: 15px;
        }
      
        .articles table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1); /* Ombre douce pour le tableau */
        }
      
        .articles th, .articles td {
          text-align: left;
          padding: 12px 15px;
          border-bottom: 1px solid #ddd;
        }
      
        .articles th {
          background-color: #007bff;
          color: white;
          font-weight: bold;
        }
      
        /* Style pour la ligne TOTAL */
        .articles .total-row th {
          text-align: center;
          color: black;
          background-color: #f8f9fa; /* Couleur légère pour la ligne TOTAL */
          border-top: 3px solid #D8D2D0;
        }
      
        .articles .total-row td {
          font-weight: bold;
          border-top: 3px solid #D8D2D0;
        }
        .print-button {
          display: block;
          margin: 20px auto;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        @media print {
          body * {
            visibility: hidden;
          }
          .bon-de-livraison, .bon-de-livraison * {
            visibility: visible;
          }
          .bon-de-livraison {
            position: absolute;
            left: 0;
            top: 0;
            box-shadow: none;
          }
          .print-button {
            display: none;
          }
        }
      `}</style>
      <div className="bon-de-livraison">
        <header className="header">
          <img src={Logo} alt="Logo" className="header-logo" />
          <div className="header-title">
            <h1>
              Bon de Livraison <strong>N°{livraison?.id}</strong>
            </h1>
          </div>
          <div className="codebarres-container">
          <img src={Codebarre} alt="Code Barres" className="codebarres" />
          </div>
        </header>
        <div className="info">
          <div>
            <h2>Expéditeur</h2>
            <p>Nom: {livraison.Fournisseur}</p>
            <p>Adresse: {livraison.AdresseFournisseur}</p>
            <p>Ville: {livraison.VilleFournisseur}</p>
            <p>Téléphone: {livraison.TelFournisseur}</p>
          </div>
          <div>
            <h2>Destinataire</h2>
            <p>Nom: {livraison.Client}</p>
            <p>Adresse de livraison: {livraison.adresseClient}</p>
            <p>Ville: {livraison.villeClient}</p>
            <p>Téléphone: {livraison.telephoneClient}</p>
          </div>
        </div>
        <section className="articles">
          <h2>Détail de la livraison</h2>
          <table>
            <thead>
              <tr>
                <th>Article</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{livraison.nomArticle}</td>
                <td>{livraison.prixTTC}</td>
              </tr>
              {/* Ajouter d'autres lignes d'articles ici si nécessaire */}
            </tbody>
            <tfoot className="total-row">
              <tr>
                <th>Total</th>
                <td>{livraison.totalPrice}</td>{" "}
                {/* Assurez-vous de calculer le total si plusieurs articles */}
              </tr>
            </tfoot>
          </table>
        </section>
        <footer style={{textAlign:'center'}}>
          <p>Merci de faire affaire avec nous !</p>
        </footer>
      </div>
      <button onClick={handlePrint} className="print-button">
        Imprimer le Bon de Livraison
      </button>
    </>
  );
};

export default BonDeLivraison;
