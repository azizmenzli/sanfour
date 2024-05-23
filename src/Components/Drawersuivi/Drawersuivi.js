import React, { useState } from "react";
import { Input, Modal, Button, message, Steps } from "antd";
import { FcSearch, FcInTransit, FcSynchronize, FcShop } from "react-icons/fc";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Bg from "../../assets/images/bg.png";
import ApiService from "../../Services/Api/ApiService";

const getStepIcon = (status) => {
  switch (status) {
    case 'EnAttente':
      return <FcSynchronize className="text-2xl" />;
    case 'AuDepot':
      return <FcShop className="text-2xl" />;
    case 'Expedier':
      return <FcInTransit className="text-2xl" />;
    case 'Livre':
      return <CheckCircleOutlined className="text-2xl text-green-500" />;
    case 'Annuler':
      return <CloseCircleOutlined className="text-2xl text-red-500" />;
    default:
      return null;
  }
};

const Drawersuivi = () => {
  const [open, setOpen] = useState(false);
  const [inputId, setInputId] = useState("");
  const [selectedLivraison, setSelectedLivraison] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setSelectedLivraison(null); // Reset selection on modal close
  };

  const handleSearch = async () => {
    try {
      const foundLivraison = await ApiService.getCommandById(inputId);
      if (foundLivraison) {
        setSelectedLivraison(foundLivraison);
        setOpen(true);
      } else {
        message.error("Livraison non trouvée.");
      }
    } catch (error) {
      message.error("Erreur lors de la récupération de la livraison.");
      console.error("Failed to fetch command data:", error);
    }
  };

  let steps = [];
  if (selectedLivraison) {
    if (selectedLivraison.status === 'Annuler') {
      steps = [{ title: 'Annulé', description: 'Cette commande a été annulée.', status: 'Annuler' }];
    } else {
      steps = [
        { title: 'Remis au transporteur', description: `${selectedLivraison?.adresseVendeur}`, status: 'EnAttente' },
        { title: 'Au dépôt', description: 'Résidence Farah Num61 Borj Cedria', status: 'AuDepot' },
        { title: 'En cours de livraison', description: '', status: 'Expedier' },
        { title: 'Livré', description: `${selectedLivraison?.adresseClient}`, status: 'Livre' }
      ];
    }
  }
console.log(selectedLivraison);
  // Determine the current step index based on the selectedLivraison status
  const currentStepIndex = steps?.findIndex(step => step.status === selectedLivraison?.status);
console.log(currentStepIndex);
  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-200">
      <div
        className="relative bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
        style={{
          width: 600,
          backgroundImage: `url(${Bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          border: 'solid',
          borderColor: 'white',
        }}
      >
        <h2 className="text-2xl text-red-500 mb-4">Suivi de colis</h2>
        <form onSubmit={(e) => e.preventDefault()} className="w-full flex justify-center items-center">
          <div className="flex w-3/4">
            <Input
              name="name"
              placeholder="N° de la commande"
              className="w-full h-12 p-4 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              className="w-12 h-12 bg-blue-500 flex justify-center items-center rounded-r-lg border-3 border-blue-400 hover:bg-blue-600 transition duration-300"
            >
              <FcSearch className="w-6 h-6" />
            </Button>
          </div>
        </form>

        <Modal
          title={`Statut de livraison N°: ${selectedLivraison?.id}`}
          visible={open}
          onCancel={handleClose}
          footer={null}
        >
          <Steps
            progressDot
            current={currentStepIndex}
            direction="vertical"
            items={steps.map(step => ({
              title: step.title,
              description: step.description,
              // icon: getStepIcon(step.status),
              status: step.status === 'Annuler' ? 'error' : ''
            }))}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Drawersuivi;
