import React from 'react';
import { Form, Input, Button, message } from 'antd';
import ApiService from '../Services/Api/ApiService';
const NewSeller = () => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
   
    try {
      const response = await ApiService.register(
        values.email,
        values.password,
        values.name,
        'VENDEUR',
        values.adresse,
        values.ville,
        values.telephone
      );
      
      message.success('Seller created successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to create seller.');
      console.error('Error creating seller:', error);
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl text-gray-800 mb-5 text-center">Ajouter un fournisseur</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            name="name"
            label="Nom"
            rules={[{ required: true, message: 'Veuillez saisir le nom!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Veuillez saisir l\'email!' }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mot de passe"
            rules={[{ required: true, message: 'Veuillez saisir le mot de passe!' }]}
          >
            <Input.Password autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="adresse"
            label="Adresse"
            rules={[{ required: true, message: 'Veuillez saisir l\'adresse!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ville"
            label="Ville"
            rules={[{ required: true, message: 'Veuillez saisir la ville!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="telephone"
            label="Téléphone"
            rules={[{ required: true, message: 'Veuillez saisir le numéro de téléphone!' }]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-center mt-4">
            <Button  htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" className="ml-4" onClick={() => form.resetFields()}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewSeller;
