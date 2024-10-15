import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Form, Select, Modal, message } from 'antd';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { apiRequest } from '../../utils/api';

const UserEdit = () => {
    const [id, setId] = useState(useParams().id);
    const [form] = Form.useForm();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [isEditing, setIsEditing] = useState(useLocation().state?.edit || false);
    const [isMakelar, setIsMakelar] = useState(false);
    const navigate = useNavigate();

    const fetchData = async (localId) => {
        try {
            setLoading(true);
            const response = await apiRequest('get', `/user/${localId}`);
            const dataUser = response.data.data;
            setData(dataUser);

            form.setFieldsValue({
                email: dataUser.email,
                firstName: dataUser.firstName,
                lastName: dataUser.lastName,
                username: dataUser.username,
                nomorTelp: dataUser.nomorTelp,
                role: dataUser.role,
                nomorKtp: dataUser.nomorKtp,
            });

            if (dataUser.role === 'MAKELAR') {
                setIsMakelar(true);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            const errorMessage = error.response?.data?.message || 'Server Unreachable, Please Check Your Internet Connection';
            message.error(errorMessage);
        }
    };

    const handleRoleChange = (value) => {
        setIsMakelar(value === 'MAKELAR');
    };

    const handleSubmit = async () => {
        if (form.getFieldValue('password') !== form.getFieldValue('password_confirmation')) {
            message.error('Password and Password Confirmation do not match');
            return;
        }

        try {
            setLoading(true);
            const sendData = {
                email: form.getFieldValue('email'),
                firstName: form.getFieldValue('firstName'),
                lastName: form.getFieldValue('lastName'),
                username: form.getFieldValue('username'),
                nomorTelp: form.getFieldValue('nomorTelp'),
                role: form.getFieldValue('role'),
                password: form.getFieldValue('password'),
                nomorKtp: form.getFieldValue('nomorKtp'),
            };

            let response;
            if (id) {
                response = await apiRequest('PATCH', `/user/${id}`, sendData);
            } else {
                response = await apiRequest('POST', '/user', sendData);
            }

            setLoading(false);
            if (response.status === 200) {
                Modal.success({
                    title: 'Success',
                    content: 'Data has been updated',
                    centered: true,
                });

                let newId = null;
                if (!id) {
                    newId = response.data.data.id;
                    navigate(`/app/user/${newId}`);
                    setId(newId);
                }

                fetchData(id || newId);
            }
        } catch (error) {
            setLoading(false);
            if (error.response.data.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat().join(', ');
                message.error(errorMessages);
            } else {
                message.error(error.response?.data?.message ? error.response?.data?.message : 'Server Unreachable, Please Check Your Internet Connection');
            }
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (!id) {
            navigate('/app/user');
        } else {
            fetchData(id);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [id]);

    return (
        <Row className="w-full">
            <Col span={24}>
                <div className="rounded-lg">
                    <Row>
                        <Col span={24}>
                            <div className="flex flex-col">
                                <div className="bg-white p-5 rounded-lg">
                                    <Row>
                                        <Col span={24}>
                                            <div className="text-[30px] text-main inline-block">
                                                {id ? `Edit User ${id}` : 'Add User'}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="mt-5 p-10 bg-white border rounded-lg">
                                    <Form layout="vertical" form={form}>
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    name="firstName"
                                                    label="First Name :"
                                                    rules={[{ required: true, message: 'First Name is required' }]}
                                                >
                                                    <Input placeholder="First Name" disabled={!isEditing} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    name="lastName"
                                                    label="Last Name :"
                                                    rules={[{ required: true, message: 'Last Name is required' }]}
                                                >
                                                    <Input placeholder="Last Name" disabled={!isEditing} />
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
                                                    <Input type="email" placeholder="Enter Email" disabled={!isEditing} />
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
                                                    <Input placeholder="Enter Username" disabled={!isEditing} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    name="nomorTelp"
                                                    label="Mobile Number :"
                                                >
                                                    <Input placeholder="Enter Phone Number" disabled={!isEditing} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    name="role"
                                                    label="Role :"
                                                    rules={[{ required: true, message: 'Role is required' }]}
                                                >
                                                    <Select placeholder="Select Role" disabled={!isEditing} onChange={handleRoleChange}>
                                                        <Select.Option value="SUPER_ADMIN">Super Admin</Select.Option>
                                                        <Select.Option value="ADMIN">Admin</Select.Option>
                                                        <Select.Option value="MAKELAR">Makelar</Select.Option>
                                                        <Select.Option value="CONTRIBUTOR">Contributor</Select.Option>
                                                        <Select.Option value="USER">User</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {isMakelar && (
                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name="nomorKtp"
                                                        label="Nomor KTP :"
                                                        rules={[{ required: true, message: 'Nomor KTP is required for Makelar' }]}
                                                    >
                                                        <Input placeholder="Enter Nomor KTP" disabled={!isEditing} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        )}

                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    name="password"
                                                    label="Password :"
                                                    rules={[{ required: true, message: 'Password is required' }]}
                                                >
                                                    <Input.Password placeholder="Enter Password" disabled={!isEditing} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    name="password_confirmation"
                                                    label="Password Confirmation :"
                                                    rules={[{ required: true, message: 'Password Confirmation is required' }]}
                                                >
                                                    <Input.Password placeholder="Enter Password Confirmation" disabled={!isEditing} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <div className="mt-5 flex justify-end">
                                            {isEditing ? (
                                                <>
                                                    <Button type="default" className="mr-2" onClick={handleCancel}>
                                                        Cancel
                                                    </Button>
                                                    <Button type="primary" className="bg-main" onClick={handleSubmit}>
                                                        Save
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button type="primary" className="bg-main px-10 py-5" onClick={handleEdit}>
                                                    Edit
                                                </Button>
                                            )}
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
