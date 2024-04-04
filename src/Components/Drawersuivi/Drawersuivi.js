import React, { useState } from "react";
import { Input, Modal, Button, Panel, Stack } from "rsuite";
import { FcSearch } from "react-icons/fc";
import Bg from "../../assets/images/bg.png";
import Stepss from "../Steps/Stepss";
import mockUsers from "../../assets/data/data"; // Assurez-vous que le chemin est correct

const Drawersuivi = () => {
  const [open, setOpen] = useState(false);
  const [inputId, setInputId] = useState("");
  const [selectedLivraison, setSelectedLivraison] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setSelectedLivraison(null); // Réinitialiser la sélection lors de la fermeture du modal
  };

  const handleSearch = () => {
    const foundLivraison = mockUsers.find(livraison => livraison.id === parseInt(inputId, 10));
    if (foundLivraison) {
      setSelectedLivraison(foundLivraison);
      setOpen(true);
    } else {
      alert("Livraison non trouvée.");
    }
  };

  return (
    <>
      <style>{`
        .panel-bg-custom {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f0f0f0; /* Couleur de fond plus douce */
          border-radius: 8px; /* Bords arrondis */
          box-shadow: 0px 0px 15px rgba(0,0,0,0.1); /* Ombre douce */
        }
        .search-input {
          width: 450px;
          height: 50px;
          border-radius: 25px 0 25px 25px; /* Input arrondi */
          border: 1px solid #cccccc; /* Bordure plus subtile */
          padding-left: 20px; /* Padding à gauche pour le texte */
        }
        .search-button {
          width: 60px;
          height: 50px;
          margin-left: -5px; /* Aligner le bouton avec l'input */
          border-radius: 25px 25px 25px 0; /* Arrondi du bouton sur les côtés droit */
          background-color: #58a0e1; /* Couleur du bouton */
          border: none; /* Pas de bordure */
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .search-icon {
          width: 30px;
          height: 30px;
        }
      `}</style>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          backgroundColor: "#f0f0f0",
          marginTop: "-70px"
        }}
      >
        <Panel
          className="panel-bg-custom"
          bordered
          header={<span style={{ color: "#58a0e1", fontSize: "24px" }}>Suivi de colis</span>}
          style={{
            width: 600,
            height: 300,
            backgroundImage: `url(${Bg})`,
            backgroundSize: "cover",
          }}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <Input
                className="search-input"
                placeholder="N° de la commande"
                value={inputId}
                onChange={setInputId}
              />
              <Button className="search-button" onClick={handleSearch}>
                <FcSearch className="search-icon" />
              </Button>
            </div>
          </form>
          <Modal open={open} onClose={handleClose}>
            <Modal.Header>
              <Modal.Title>Statut de livraison N°: {selectedLivraison?.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Stepss livraison={selectedLivraison} />
            </Modal.Body>
          </Modal>
        </Panel>
      </div>
    </>
  );
};

export default Drawersuivi;
