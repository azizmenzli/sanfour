import React from "react";
import Logo from "../assets/images/logo.png";
import Codebarre from "../assets/images/code-barres.gif";

const BonDeLivraison = ({ expediteur, destinataire }) => {
  // Fonction pour déclencher l'impression
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .header-logo {
            width: 100px;
        }

        .header-title {
            text-align: right;
            flex-grow: 1;
        }

        .codebarres {
            display: block;
            margin: auto;
            margin-top: 10px; /* Ajustez selon vos besoins */
            width: 100px; /* Ajustez la largeur selon la taille souhaitée du code-barres */
            height: auto; /* Gardez le ratio de l'image */
          }

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }

        .bon-de-livraison {
            max-width: 800px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .info {
            display: flex;
            justify-content: space-between;
        }

        .info div {
            flex-basis: 48%;
        }

        .articles table {
            width: 100%;
            border-collapse: collapse;
        }

        .articles th, .articles td {
            border: 1px solid #ddd;
            text-align: left;
            padding: 8px;
        }

        .articles th {
            background-color: #f2f2f2;
        }

        footer {
            text-align: center;
            font-weight: bold;
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
          }
          .print-button {
            display: none;
          }
        }
      `}</style>
      <div className="bon-de-livraison">
        <header className="header">
          <img src={Logo} alt="Logo" className="header-logo" />
          <h1 className="header-title">
            Bon de Livraison <strong>N°:000000</strong>
          </h1>
        </header>
        <div>
          <img src={Codebarre} alt="Code Barres" className="codebarres" />
        </div>
        <br/>
        <section className="info">
          <div className="expediteur">
            <h2>Expéditeur</h2>
            <p>Nom:{/*expediteur.nom*/}</p>
            <p>Adresse:{/*expediteur.adresse*/}</p>
            <p>Ville:{/*expediteur.ville}*/}</p>
            <p>Téléphone: {/*expediteur.telephone*/}</p>
          </div>
          <div className="destinataire">
            <h2>Destinataire</h2>
            <p>Nom:{/*destinataire.nom*/}</p>
            <p>Adresse de livraison:{/*destinataire.adresseLivraison*/}</p>
            <p>Ville:{/*destinataire.ville}*/}</p>
            <p>Téléphone: {/*destinataire.portable*/}</p>
          </div>
        </section>
        <br />
        <section className="articles">
          <h2>Articles Expédiés</h2>
          <table>
            <thead>
              <tr>
                <th>Colis</th>
                <th>Article</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {/* Exemple d'articles - à remplir dynamiquement */}
              <tr>
                <td>Colis 1</td>
                <td>Nom de l'article</td>
                <td>30 €</td>
              </tr>
              <tr>
                <td>Colis 2</td>
                <td>Nom de l'article</td>
                <td>40 €</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th style={{textAlign:'center'}}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{textAlign:'center'}}>780</td>
              </tr>
            </tbody>
          </table>
          
        </section>
        <br />
        <footer>
          <h1>
            Le destinataire est autorisé à ouvrir le colis avant de le payer:{" "}
            <strong>oui ▢ non ▢</strong>
          </h1>
          <br />
          <p>Merci de faire affaire avec nous !</p>
        </footer>
      </div>
      <button
        onClick={handlePrint}
        className="print-button"
        style={{ border: "solid", borderColor: "black", borderRadius: "10px" }}
      >
        Imprimer le Bon de Livraison
      </button>
    </>
  );
};

export default BonDeLivraison;
