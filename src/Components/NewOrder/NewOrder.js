import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  ButtonToolbar,
  Schema,
  FlexboxGrid,
  Checkbox,
  CheckboxGroup,
  Button,
  InputNumber
} from "rsuite";
import OrderValidation from "../OrderValidation/OrderValidation";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Ce champ est obligatoire."),
});

const NewOrder = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const currentUser = useSelector((state) => state.auth.user); 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = useState('');
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({
    name: "",
    tel: "",
    adresse: "",
    ville: "",
    produit: "",
    prix: "",
  });
  const [formData, setFormData] = useState({
    nomArticle: '',
    prixTTC: 0,
    numberOfParcels: 0,
    adresseVendeur: currentUser?.adresse || '', // Pre-fill with currentUser info
    telephoneVendeur: currentUser?.telephone || '',
    villeVendeur: currentUser?.ville || '',
    adresseClient: '',
    telephoneClient: '',
    villeClient: '',
    status: 'EnAttente', // Assuming you have a default status
    totalPrice: 0,
  });
  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      adresseVendeur: currentUser?.adresse || '',
      telephoneVendeur: currentUser?.telephone || '',
      villeVendeur: currentUser?.ville || '',
    }));
  }, [currentUser]);
  const [checkedItem, setCheckedItem] = useState(null);

  const handleCheckboxChange = (value) => {
    setCheckedItem(value[0]);}
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      // Optional: Add any form validation here
  
      try {
        // Replace '/new-order' with your endpoint for creating a new order
        await ApiService.createCommand(formData);
        alert('Order created successfully!'); // Replace with more sophisticated feedback
        // Optionally reset form or navigate to another page
        setFormData({
          nomArticle: '',
          prixTTC: 0,
          numberOfParcels: 1,
          adresseVendeur: '',
          telephoneVendeur: '',
          villeVendeur: '',
          adresseClient: '',
          telephoneClient: '',
          villeClient: '',
          status: 'EnAttente',
          totalPrice: 0,
        });
        navigate('/dashboard'); // Navigate to dashboard or success page
      } catch (error) {
        setError('Failed to create order. Please try again.'); // Provide user feedback
        console.error(error);
      }
    };
    const handleInputChange = (value, name) => {
      setFormData({ ...formData, [name]: value });
    };
  return (
    <>
      <style>{`
        .new-order-form {
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }
        
        .rs-form-group {
          margin-bottom: 15px;
        }
        
        .rs-form-control-label {
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        .rs-input, .rs-input-number {
          width: 100%;
        }
        
        .button-toolbar {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }
        
        .rs-btn-primary {
          background-color: #007bff;
          border-color: #007bff;
        }
      `}</style>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={12}>
          <div className="new-order-form">
            <Form
              model={model}
              ref={formRef}
              formValue={formData}
              onChange={setFormValue}
              onSubmit={handleSubmit}
              fluid
            >
              <Form.Group>
                <Form.ControlLabel>Nom du destinataire</Form.ControlLabel>
                <Form.Control name="name" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>N° Tel du destinataire</Form.ControlLabel>
                <Form.Control name="tel" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Adresse de livraison</Form.ControlLabel>
                <Form.Control name="adresseClient" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Ville</Form.ControlLabel>
                <Form.Control name="villeClient" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Produit</Form.ControlLabel>
                <Form.Control name="produit" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Prix</Form.ControlLabel>
                <Form.Control name="prix" />
              </Form.Group>
              <Form.Group>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label htmlFor="numberOfParcels">Number of Parcels</label>
        
          <InputNumber
          id="numberOfParcels"
          min={1}
          value={formData.numberOfParcels}
          onChange={(value) => handleInputChange(value, 'numberOfParcels')}
        />
        </div>
      </Form.Group>
              <ButtonToolbar className="button-toolbar">
                <Button onClick={handleSubmit} appearance="primary">
                  Valider
                </Button>
              </ButtonToolbar>
            </Form>
          </div>
          <OrderValidation
            open={open}
            handleClose={handleClose}
            formValues={formData}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default NewOrder;
