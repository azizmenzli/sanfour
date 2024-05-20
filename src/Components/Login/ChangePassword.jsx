// src/components/ChangePasswordForm.jsx

import React from 'react';
import { Form, Input, Button, notification, message } from 'antd';
import axios from 'axios';
import ApiService from '../../Services/Api/ApiService';
const ChangePasswordForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
        await ApiService.changePassword(values.currentPassword, values.newPassword);
        message.success('Password changed successfully!');
        form.resetFields();
    } catch (error) {
        message.error('Failed to change password. Please try again.');
    }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[{ required: true, message: 'Please input your current password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          label="Confirm New Password"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
