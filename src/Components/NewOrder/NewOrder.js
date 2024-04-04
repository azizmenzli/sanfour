import React, { useState } from "react";
import {
  Form,
  ButtonToolbar,
  Schema,
  FlexboxGrid,
  Checkbox,
  CheckboxGroup,
  Button,
} from "rsuite";
import OrderValidation from "../OrderValidation/OrderValidation";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Ce champ est obligatoire."),
});

const NewOrder = () => {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({
    name: "",
    tel: "",
    adresse: "",
    ville: "",
    produit: "",
    prix: "",
  });

  const [checkedItem, setCheckedItem] = useState(null);

  const handleCheckboxChange = (value) => {
    setCheckedItem(value[0]);}

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
              formValue={formValue}
              onChange={setFormValue}
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
                <Form.Control name="adresse" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Ville</Form.ControlLabel>
                <Form.Control name="ville" />
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
          <Form.ControlLabel>Permettre au client d'ouvrir le colis ?</Form.ControlLabel>
          <CheckboxGroup inline name="checkbox-group" value={[checkedItem]} onChange={handleCheckboxChange}>
            <Checkbox value="oui">Oui</Checkbox>
            <Checkbox value="non">Non</Checkbox>
          </CheckboxGroup>
        </div>
      </Form.Group>
              <ButtonToolbar className="button-toolbar">
                <Button onClick={handleOpen} appearance="primary">
                  Valider
                </Button>
              </ButtonToolbar>
            </Form>
          </div>
          <OrderValidation
            open={open}
            handleClose={handleClose}
            formValues={formValue}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default NewOrder;
