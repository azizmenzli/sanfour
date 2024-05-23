import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import bwipjs from "bwip-js";
import Logo from "../assets/images/logo.png";
import { Divider, Button, InputNumber } from "antd";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BonDeLivraison = () => {
  const { commands } = useSelector((state) => state.command);
  
  let query = useQuery();
  let id = parseInt(query.get("id"), 10);
  
  const livraison = commands.find((livraison) => livraison.id === id);
  const barcodeCanvasRef = useRef(null);

  const [deliveryFee, setDeliveryFee] = useState(7);

  useEffect(() => {
    if (livraison && barcodeCanvasRef.current) {
      try {
        bwipjs.toCanvas(barcodeCanvasRef.current, {
          bcid: 'code128',
          text: livraison.barcode,
          scale: 2,
          height: 6,
          includetext: true,
          textxalign: 'center',
        });
      } catch (error) {
        console.error('Barcode Error:', error);
      }
    }
  }, [livraison]);

  if (!livraison) {
    return <p>Livraison non trouvée.</p>;
  }

  const handlePrint = () => {
    window.print();
  };

  // Calculate tax and total price
  const montantHT = livraison.prixTTC;
  const tva = montantHT * 0.19;
  const prixTTC = montantHT + tva + deliveryFee;

  return (
    <>
      <style>{`
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
      <div className="bon-de-livraison bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col items-start">
            <img src={Logo} alt="Logo" className="w-48 mb-2" />
            <p className="text-lg font-semibold">MF: 1868476/M/A/M/000</p>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold">Bon de Livraison <strong>N°{livraison?.id}</strong></h1>
            <p className="text-lg ">Résidence Farah Num61 Borj Cedria</p>
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <canvas ref={barcodeCanvasRef} className="codebarres"></canvas>
        </div>
        <Divider />
        <div className="info flex justify-between border-2 p-4 ">
          <div>
            <h2 className="text-lg font-semibold">Expéditeur</h2>
            <p>Nom: {livraison.user.name}</p>
            <p>Adresse: {livraison.adresseVendeur}</p>
            <p>Ville: {livraison.villeVendeur}</p>
            <p>Téléphone: {livraison.telephoneVendeur}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Destinataire</h2>
            <p>Nom: {livraison.clientName}</p>
            <p>Adresse de livraison: {livraison.adresseClient}</p>
            <p>Ville: {livraison.villeClient}</p>
            <p>Téléphone: {livraison.telephoneClient}</p>
          </div>
        </div>
        <section className="articles mb-6">
          <h2 className="text-center text-xl font-semibold mb-4">Détail de la livraison</h2>
          <table className="w-full border-collapse mb-4 border border-gray-300">
            <thead>
              <tr>
                <th className="bg-blue-500 text-white p-2 border border-gray-300">Article</th>
                <th className="bg-blue-500 text-white p-2 border border-gray-300">Prix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 border-gray-300">{livraison.nomArticle}</td>
                <td className="border p-2 border-gray-300">{livraison.prixTTC.toFixed(2)}</td>
              </tr>
              {/* Ajouter d'autres lignes d'articles ici si nécessaire */}
            </tbody>
            <tfoot className="total-row">
              <tr>
                <th className="text-center bg-gray-200 p-2 border border-gray-300">Montant HT</th>
                <td className="text-center bg-gray-200 p-2 border border-gray-300">{montantHT.toFixed(2)}</td>
              </tr>
              <tr>
                <th className="text-center bg-gray-200 p-2 border border-gray-300">TVA 19%</th>
                <td className="text-center bg-gray-200 p-2 border border-gray-300">{tva.toFixed(2)}</td>
              </tr>
              <tr>
                <th className="text-center bg-gray-200 p-2 border border-gray-300">Frais de livraison</th>
                <td className="text-center bg-gray-200 p-2 border border-gray-300">
                  <InputNumber
                    min={0}
                    value={deliveryFee}
                    onChange={setDeliveryFee}
                    className="w-20 px"
                  />
                </td>
              </tr>
              <tr>
                <th className="text-center bg-gray-200 p-2 border border-gray-300">Prix TTC</th>
                <td className="text-center bg-gray-200 p-2 border border-gray-300">{prixTTC.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </section>
        <Divider />
        <footer className="text-center mt-6 border-dashed border-2 border-red-300 ">
          <h2 className="text-xl font-semibold mb-4">تنبيه</h2>
          <ul className=" list-none  ">
            <li>  <strong>الفصل الأول:</strong> شركة سنفور عجاجة هي شركة تقوم بنقل وإيصال البضائع من المزود للحريف لا غير حسب نشاط الشركة المبين باليطاقة الجبائية<br></br>   <strong> 1868476M/A/M/000عدد</strong></li>
           
            <li><strong>الفصل الثاني:</strong>تتسلم الشركة البضائع من المزود قصد ايصالها للحريف في صناديق كرطونية مغلقة</li>
            <li><strong>الفصل الثالث:</strong>لا تتحمل الشركة المسؤولية عن إخلال المزود في مايخص اللون والمقاسات( بالنسبة للملابس والاحذية) أو العطب والنوعية (في ما يخص بقية المواد) عند تسليمها للحريف</li>
            <li><strong>الفصل الرابع:</strong>لا تتحمل الشركة أي مسؤولية عن محتوي البضاعة التي تأخذها من المزود قصد إيصالها للحريف</li>
          </ul>
        </footer>
      </div>
      <Button onClick={handlePrint} className="print-button mt-6 mx-auto block" >
        Imprimer le Bon de Livraison
      </Button>
    </>
  );
};

export default BonDeLivraison;
