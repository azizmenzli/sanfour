import React from 'react';
import { Modal, Button, } from 'rsuite';

const OrderValidation = ({ open, handleClose, formValues }) => {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Information d'expédition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Afficher les valeurs du formulaire ici */}
          <p>Nom du destinataire: {formValues.name}</p>
          <p>Tel du destinataire: {formValues.tel}</p>
          <p>Adresse de livraison: {formValues.adresse}</p>
          <p>Ville: {formValues.ville}</p>
          <p>Produit: {formValues.produit}</p>
          <p>Prix: {formValues.prix}€</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderValidation;
