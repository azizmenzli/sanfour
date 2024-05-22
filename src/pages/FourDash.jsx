import React,{useEffect,useState} from "react";
import Tablev from "../Components/Tables/Tables";
import CardFour from "../Components/CardFour/CardFour";
import { useSelector } from "react-redux";
import { Table } from 'antd';
import ApiService from "../Services/Api/ApiService";
const statusMapping = {
  EnAttente: "En Attente",
  Remis: "Remis",
  AuDepot: "Au Dépôt",
  Expedier: "Expédié",
  Livre: "Livré",
  Annuler: "Annulé"
};
const FourDash = () => {
  const [commands, setCommands] = useState([]);
  const userId = useSelector((state) => state.auth.id);
  useEffect(() => {
    const fetchCommands = async () => {
        try {
            const data = await ApiService.getCommandsByUserId(userId);
            setCommands(data);
        } catch (error) {
            console.error("Failed to fetch commands:", error);
        }
    };

    fetchCommands();
}, [userId]);

const columns = [
    { title: 'Command ID', dataIndex: 'id', key: 'id' },
    { title: 'Article Name', dataIndex: 'nomArticle', key: 'nomArticle' },
    { title: 'Client Address', dataIndex: 'adresseClient', key: 'adresseClient' },
    { title: 'Client Phone', dataIndex: 'telephoneClient', key: 'telephoneClient' },
    { title: 'Client City', dataIndex: 'villeClient', key: 'villeClient' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (text) => statusMapping[text] || text
    },
    { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
    // Add other columns as needed
];
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-1 p-6">
        <h1 className="text-4xl text-gray-800 mb-8">Tableau de bord</h1>
        <div className="flex flex-col items-center">
          <CardFour commands={commands} />
          <div className="my-8">
            <h2 className="text-2xl text-gray-800 mb-4">Historique des livraisons</h2>
            <Table dataSource={commands} columns={columns} rowKey="id" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourDash;
