import React from 'react';
import { Form, Input, Button, message } from 'antd';
import ApiService from '../Services/Api/ApiService';
const NewAdmin = () => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      const response = await ApiService.register(
        values.email,
        values.password,
        values.name,
        'ADMIN'
      );
      message.success('Admin created successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to create admin.');
      console.error('Error creating admin:', error);
    }
  };

  return (  
    <div className="flex flex-col h-full items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl text-gray-800 mb-5 text-center">Ajouter un administrateur</h2>
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

export default NewAdmin;
