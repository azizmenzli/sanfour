import React from 'react';
import { Form, Input, Button, InputNumber, message } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Services/Api/ApiService';

const NewOrder = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const userId=currentUser?.id

  const handleSubmit = async (values) => {
    try {
      await ApiService.createCommand(currentUser?.id,{
        ...values,
        
        adresseVendeur: currentUser?.adress || '',
        telephoneVendeur: currentUser?.phone || '',
        villeVendeur: currentUser?.ville || '',
        status: 'EnAttente',  // Assuming 'EnAttente' is a valid status
      });
      message.success('Commande créée avec succès!');
      navigate('/dashboard'); // Adjust the route as necessary
    } catch (error) {
      message.error('Échec de la création de la commande');
      console.error('Failed to submit order', error);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-xl mx-auto mt-10">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          adresseVendeur: currentUser?.address,
          telephoneVendeur: currentUser?.telephone,
          villeVendeur: currentUser?.ville,
        }}
      >
        <Form.Item
          name="nomArticle"
          label="Produit"
          rules={[{ required: true, message: 'Veuillez saisir le nom du produit!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="clientName"
          label="Nom du client "
          rules={[{ required: true, message: 'Veuillez saisir le nom du client!' }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          name="prixTTC"
          label="Prix HT"
          rules={[{ required: true, message: 'Veuillez saisir le prix TTC!' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item> */}
        <Form.Item
          name="prixTTC"
          label="Prix TTC"
          rules={[{ required: true, message: 'Veuillez saisir le prix total!' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>
        <Form.Item
          name="telephoneClient"
          label="N° Tel du destinataire"
          rules={[{ required: true, message: 'Veuillez saisir le numéro de téléphone du destinataire!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="adresseClient"
          label="Adresse de livraison"
          rules={[{ required: true, message: "Veuillez saisir l'adresse de livraison!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="villeClient"
          label="Ville"
          rules={[{ required: true, message: 'Veuillez saisir la ville!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="numberOfParcels"
          label="Nombre de colis"
          rules={[{ required: true, message: 'Veuillez saisir le nombre de colis!' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button  htmlType="submit" className="w-full">
            Valider
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewOrder;
