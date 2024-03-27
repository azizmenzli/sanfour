import React from "react";
import {
  Input,
  Modal,
  RadioGroup,
  ButtonToolbar,
  Button,
  Panel,
  Stack,
} from "rsuite";
import { FcSearch } from "react-icons/fc";
import Bg from "../../assets/images/bg.png";
import Steps from "../Steps/Steps";

const Drawersuivi = () => {
  const [backdrop, setBackdrop] = React.useState("static");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Utilise toute la hauteur de la fenêtre
        width: "100%", // Utilise toute la largeur (nécessaire pour le centrage horizontal)
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
          backgroundImage: `url(${Bg})`, // Ajout de l'image en arrière-plan
          backgroundSize: "cover", // Couvre tout l'espace disponible
          backgroundRepeat: "no-repeat", // Ne répète pas l'image
          backgroundPosition: "center", // Centre l'image
          border:'solid',
          borderColor:'white'
        }}
      >
        <RadioGroup
          name="radioList"
          appearance="picker"
          inline
          value={backdrop}
          onChange={setBackdrop}
        ></RadioGroup>
        <hr />
        <br />
        <br />

        <form>
          <Stack spacing={10}>
          <div style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%', // Assure que le conteneur prend toute la largeur du Panel
      position: 'absolute', // Positionnement absolu à l'intérieur du Panel
      bottom: 25, // Place le conteneur en bas du Panel sans espace
    }}>
            
</div>
            <ButtonToolbar>
            <div style={{
          display: 'flex',
          justifyContent: 'space-between', // Espacement entre l'Input et le Button
          alignItems: 'center',
          position: 'absolute',
          bottom: 10, // Légèrement relevé du bas du Panel pour l'esthétique
          left: 0,
          right: 0,
          padding: '0 20px', // Ajout d'un peu de padding sur les côtés
        }}>
          {/* Input pour le numéro de commande */}
          <Input
            name="name"
            placeholder="N° de la commande"
            style={{ width: 400,  height: 70, border:'solid' }} // Ajustement de la largeur selon le besoin
          />
          {/* Button pour la recherche */}
          <Button onClick={() => setOpen(true)} style={{ width: 80, border:'solid 3px', borderColor:'#58a0e1', borderRadius:'10 px' }}>
            <FcSearch style={{ width: 45,  height: 45}}/>
          </Button>
        </div>
            </ButtonToolbar>
            {/* Modal pour le statut de livraison */}
        <Modal open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Statut de livraison</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Contenu du Modal, remplacez <Placeholder.Paragraph /> par votre contenu */}
            <Steps />
          </Modal.Body>
          <Modal.Footer>
            
            
          </Modal.Footer>
        </Modal>
          </Stack>
        </form>
      </Panel>
    </div>
  );
};

export default Drawersuivi;
