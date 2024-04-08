import React from 'react';
import { Modal, Button, } from 'rsuite';

const OrderValidation = ({ open, handleClose, formValues,submitOrder }) => {
  console.log(formValues);
  const handleConfirmOrder = async () => {
    try {
      await submitOrder(formValues); // Use the submitOrder function passed as prop
      alert('Order created successfully!');
      handleClose(); // Close the modal upon success
    } catch (error) {
      alert('Failed to create order. Please try again.');
      console.error(error);
    }
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Information d'expédition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Afficher les valeurs du formulaire ici */}
          <p>Nom du destinataire: {formValues.name}</p>
          <p>Tel du destinataire: {formValues.telephoneClient}</p>
          <p>Adresse de livraison: {formValues.adresseClient}</p>
          <p>Ville: {formValues.villeClient}</p>
          <p>Produit: {formValues.nomArticle}</p>
          <p>Prix: {formValues.prixTTC}€</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Confirmer
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
