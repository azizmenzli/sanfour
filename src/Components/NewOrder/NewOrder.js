import React from 'react';
import { Form, ButtonToolbar, Schema, FlexboxGrid, SelectPicker, InputNumber } from 'rsuite';
import OrderValidation from '../OrderValidation/OrderValidation';


const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.'),
  age: NumberType('Please enter a valid number.').range(
    18,
    30,
    'Please enter a number from 18 to 30'
  ),
  password: StringType().isRequired('This field is required.'),
  verifyPassword: StringType()
    .addRule((value, data) => {
      console.log(data);

      if (value !== data.password) {
        return false;
      }

      return true;
    }, 'The two passwords do not match')
    .isRequired('This field is required.')
});

const TextField = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

const Field = React.forwardRef((props, ref) => {
    const { name, message, label, accepter, error, ...rest } = props;
    return (<>
      <Form.Group controlId={`${name}-10`} ref={ref} className={error ? 'has-error' : ''}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest} />
        <Form.HelpText>{message}</Form.HelpText>
      </Form.Group>
      <Form.Group controlIdv={`${name}-10`} ref={ref} className={error ? 'has-error' : ''}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest} />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group></>
    );
  });

  const selectData = ['Ben arous', 'Tunis', 'Ariana', 'Bizerte', 'Zaghouan', 'Nabeul', 'Manouba'].map(item => ({
    label: item,
    value: item
  }));

  const dataVille = ['Hammam-Lif', 'Ez-Zahra', 'Rades', 'El Mourouj', 'Borj Cédria', 'Bou Mhel'].map(item => ({
    label: item,
    value: item
  }));

const NewOrder = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    name: '',
    email: '',
    age: '',
    password: '',
    verifyPassword: ''
  });

  

  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <Form
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
            <div style={{display:'flex',margin:'5px'}}>
          <TextField name="name" label="Nom du destinataire" />
          <TextField name="number" label="N° Tel du destinataire" placeholder="+216 //"/>
          </div>
          <div style={{display:'flex',margin:'5px'}}>
          <TextField name="text" label="Adresse de livraison" />
          <Form.Group controlId="selectPicker">
          <Form.ControlLabel>Gouvernorat</Form.ControlLabel>
          <Form.Control name="selectPicker" accepter={SelectPicker} data={selectData} />
        </Form.Group>
        <Form.Group controlIdv="selectPicker">
          <Form.ControlLabel>Ville</Form.ControlLabel>
          <Form.Control name="selectPicker" accepter={SelectPicker} data={dataVille} />
        </Form.Group>
          </div>
          <div style={{display:'flex',margin:'5px'}}>
          <Field name="number" label="Nombre des colis" accepter={InputNumber} error={formError.number} />
          <TextField name="text" label="Produit" />
          <TextField name="number" label="Prix" />
          </div>
          <ButtonToolbar>
            {/*<Button appearance="primary" onClick={handleSubmit}>
              Valider
             </Button>*/}
          </ButtonToolbar>
          <OrderValidation />
        </Form>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={12}>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default NewOrder