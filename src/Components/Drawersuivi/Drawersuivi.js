import React, { useState } from "react";
import { Input, Modal, Button } from "antd";
import { FcSearch } from "react-icons/fc";
import Bg from "../../assets/images/bg.png";
import StepsComponent from "../Steps/Steps";
import mockUsers from "../../assets/data/data"; // Ensure the path is correct

const Drawersuivi = () => {
  const [open, setOpen] = useState(false);
  const [inputId, setInputId] = useState("");
  const [selectedLivraison, setSelectedLivraison] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setSelectedLivraison(null); // Reset selection on modal close
  };

  const handleSearch = () => {
    const foundLivraison = mockUsers.find(
      (livraison) => livraison.id === parseInt(inputId, 10)
    );
    if (foundLivraison) {
      setSelectedLivraison(foundLivraison);
      setOpen(true);
    } else {
      alert("Livraison non trouvée.");
    }
  };

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
          <StepsComponent livraison={selectedLivraison} />
        </Modal>
      </div>
    </div>
  );
};

export default Drawersuivi;
