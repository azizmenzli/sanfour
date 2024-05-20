import React, { useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { useDispatch } from "react-redux";
import ApiService from "../../Services/Api/ApiService";
import { loginSuccess } from "../../features/slices/authSlice";
import logo from '../../assets/images/logo.png'; // Ensure the path to your logo image is correct

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await ApiService.login(values.email, values.password);
      dispatch(loginSuccess(response)); // Assuming response includes the token
      message.success("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col justify-center items-center w-4/5 bg-blue-500 text-white p-10">
          <img src={logo} alt="Company Logo" className="mb-6 w-120" />
          <h1 className="text-4xl text-center">Approche-toi du but avec Sanfour rapide!</h1>
         
        </div>
        <div className="w-3/5 p-16">
          <Card>
            <h2 className="text-3xl font-bold mb-8 text-center">Login to Your Account</h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="space-y-6"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
              <Form.Item>
                <Button  htmlType="submit" block loading={loading}>
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <div className="mt-16 text-gray-600">
        &copy; 2024 Developed by AM-KW. All rights reserved.
      </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default Login;
