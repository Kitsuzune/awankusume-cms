import React, { useState } from 'react';
import { Row, Col, Button, Input, Form, Switch, Select, Modal } from 'antd';
import { useParams } from 'react-router-dom';
import Flag from 'react-world-flags';
const UserEdit = () => {
    const { id } = useParams();
    const [image, setImage] = useState(null);

    const successModal = () => {
        Modal.success({
            title: 'Success',
            content: 'User has been saved',
            centered: true,
        });
    }

    return (
        <Row className="w-full">
            <Col span={24}>
                <div className="rounded-lg">
                    <Row>
                        <Col span={24}>
                            <div className="flex flex-col">
                                <div className='bg-white p-5 rounded-lg'>
                                    <Row>
                                        <Col span={24}>
                                            <div className='text-[30px] text-main inline-block'>
                                                {
                                                    id ? `Edit User ${id}` : 'Add User'
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="mt-5 p-10 bg-white border rounded-lg">
                                    <Form layout="vertical">
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    name="first_name"
                                                    label="First Name :"
                                                    rules={[{ required: true, message: 'First Name is required' }]}
                                                >
                                                    <Input placeholder='First Name' />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    name="last_name"
                                                    label="Last Name :"
                                                    rules={[{ required: true, message: 'Last Name is required' }]}
                                                >
                                                    <Input placeholder='Last Name' />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="email"
                                                    label="Email ID:"
                                                    rules={[{ required: true, message: 'Email is required' }]}
                                                >
                                                    <Input type='email' placeholder='Enter Email' />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="username"
                                                    label="Username :"
                                                    rules={[{ required: true, message: 'Username is required' }]}
                                                >
                                                    <Input placeholder='Enter Username' />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    name="mobile_number"
                                                    label="Mobile Number :"
                                                >
                                                    <Input placeholder='Enter Phone Number' />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    name="role"
                                                    label="Role :"
                                                    rules={[{ required: true, message: 'Role is required' }]}
                                                >
                                                    <Select placeholder='Select Role'>
                                                        <Select.Option value="superadmin">Super Admin</Select.Option>
                                                        <Select.Option value="admin">Admin</Select.Option>
                                                        <Select.Option value="makelar">Makelar</Select.Option>
                                                        <Select.Option value="contributor">Contributor</Select.Option>
                                                        <Select.Option value="user">User</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    name="password"
                                                    label="Password :"
                                                    rules={[{ required: true, message: 'Password is required' }]}
                                                >
                                                    <Input.Password placeholder='Enter Password' />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    name="password_confirmation"
                                                    label="Password Confirmation :"
                                                    rules={[{ required: true, message: 'Password Confirmation is required' }]}
                                                >
                                                    <Input.Password placeholder='Enter Password Confirmation' />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <div className="mt-5 flex justify-end">
                                            <Button type="default" className="mr-2">Cancel</Button>
                                            <Button type="primary" className='bg-main' onClick={successModal}>Save</Button>
                                        </div>
                                    </Form>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
};

export default UserEdit;