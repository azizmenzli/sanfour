import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import bwipjs from "bwip-js";
import Logo from "../assets/images/logo.png";
import { Divider } from "antd";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BonDeLivraison = () => {
  const { commands } = useSelector((state) => state.command);
  
  let query = useQuery();
  let id = parseInt(query.get("id"), 10);
  
  const livraison = commands.find((livraison) => livraison.id === id);
  const barcodeCanvasRefs = useRef([]);

  useEffect(() => {
    if (livraison && barcodeCanvasRefs.current.length > 0) {
      livraison.parcels.forEach((parcel, index) => {
        try {
          bwipjs.toCanvas(barcodeCanvasRefs.current[index], {
            bcid: 'code128',
            text: parcel.barcode,
            scale: 3,
            height: 10,
            includetext: false  ,
            textxalign: 'center',
          });
        } catch (error) {
          console.error('Barcode Error:', error);
        }
      });
    }
  }, [livraison]);

  if (!livraison) {
    return <p>Livraison non trouvée.</p>;
  }
console.log(livraison);
  const handlePrint = () => {
    window.print();
  };

  // Calculate tax and total price
  const montantHT = livraison.prixTTC;
  const tva = montantHT * 0.19;
  const prixTTC = montantHT + tva+7;

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
          
        }
        .header-logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }
        .header-logo {
          width: 350px;
        }
        .mf-number {
          margin-top: 5px;
          padding: 2px;
        }
        .header-title {
          text-align: right;
          flex-grow: 2;
        }
        .header-title h1 {
          padding: 10px;
          display: inline-block;
          border: 2px solid;
        }
        .codebarres-container {
          width: 100%;
          display: flex;
          justify-content: center;
          
        }
        .codebarres {
          width: 180px;
        }
        .info {
          display: flex;
          justify-content: space-between;
          
          border: 2px solid;
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
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
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
        .articles .total-row th, .articles .total-row td {
          text-align: center;
          color: black;
          background-color: #f8f9fa;
          border-top: 3px solid #D8D2D0;
          font-weight: bold;
        }
        .barcodes-section {
          margin-top: 40px;
        }
        .barcode-item {
          margin-bottom: 20px;
          text-align: center;
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
          <div className="header-logo-container">
            <img src={Logo} alt="Logo" className="header-logo" />
            <p className="mf-number">MF: 1868476/M/A/M/000</p>
          </div>
          <div className="header-title">
            <h1>Bon de Livraison <strong>N°{livraison?.id}</strong></h1>
            <p>Résidence Farah Num61 Borj Cedria</p>
          </div>
          <div className="codebarres-container">
            <canvas ref={el => barcodeCanvasRefs.current[0] = el} className="codebarres"></canvas>
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
                <th>Montant HT</th>
                <td>{montantHT.toFixed(2)}</td>
              </tr>
              <tr>
                <th>TVA 19%</th>
                <td>{tva.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Frais de livraison</th>
                <td>7dt</td>
              </tr>
              <tr>
                <th>Prix TTC</th>
                <td>{prixTTC.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </section>
        <footer style={{ textAlign: 'center' }}>
          <p>الفصل الأول:تتولى الشركة الناقلة المحافضة على الطرود و إيصالها للحرفاء على الحالة التي تسلمهم عليها و ذلك بالعنوان المحدد من طرف البائع بكامل تراب الجمهورية.و عند تعذر تسليم الطرد لاي سبب كان"غياب الحريف أو عدم جاهزيته لاستلام الطرد أو...."و إستنفاذ كل المحاولات،يقع ارجاع الطرد الى الباعث بصفته البائع</p>
        </footer>
        <Divider></Divider>
        <section className="barcodes-section">
          <h2>Codes-barres des colis</h2>
          {livraison.parcels.map((parcel, index) => (
            <div key={parcel.id} className="barcode-item">
              <canvas ref={el => barcodeCanvasRefs.current[index] = el}></canvas>
              {/* <p>{parcel.barcode}</p> */}
            </div>
          ))}
        </section>
        
      </div>
      <button onClick={handlePrint} className="print-button">
        Imprimer le Bon de Livraison
      </button>
    </>
  );
};

export default BonDeLivraison;
