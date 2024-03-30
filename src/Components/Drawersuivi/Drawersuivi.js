import React, { useState } from "react";
import {
  Input,
  Modal,
  Button,
  Panel,
  Stack,
} from "rsuite";
import { FcSearch } from "react-icons/fc";
import Bg from "../../assets/images/bg.png";
import Steps from "../Steps/Steps";
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: '#f0f0f0'
      }}
    >
      <Panel
        className="panel-bg-custom"
        bordered
        header={
          <Stack justifyContent="space-between">
            <span style={{color:'red', fontSize: '24px'}}>Suivi de colis</span>
          </Stack>
        }
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 600,
          height: 300,
          margin: "10px auto",
          backgroundImage: `url(${Bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          border:'solid',
          borderColor:'white'
        }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack spacing={10}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                position: 'absolute',
                bottom: 25,
              }}>
              <Input
                name="name"
                placeholder="N° de la commande"
                style={{ width: 450,  height: 70, border:'solid' }}
                value={inputId}
                onChange={(value) => setInputId(value)}
              />
              <Button onClick={handleSearch} style={{ width: 80, border:'solid 3px', borderColor:'#58a0e1', borderRadius:'10 px' }}>
                <FcSearch style={{ width: 45,  height: 45}}/>
              </Button>
            </div>
          </Stack>
        </form>

        <Modal open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Statut de livraison N°: {selectedLivraison?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Steps livraison={selectedLivraison} />
          </Modal.Body>
        </Modal>
      </Panel>
    </div>
  );
};

export default Drawersuivi;
