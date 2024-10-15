import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Switch, Button, Select, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { apiRequest } from '../../../../../utils/api';
import { CiEdit, CiTrash } from 'react-icons/ci';

const ServiceSyaratPage = ({ data, language, setData }) => {
    const [services, setServices] = useState([]);
    const [form] = Form.useForm();

    const fetchServices = async () => {
        try {
            const dataLanguage = data.filter((item) => item.languageId === language)[0];
            const response = await apiRequest('GET', `/content/service-detail/${dataLanguage.id}`);
            if (response.status === 200) {
                setServices(response.data.data.map((item) => ({
                    id: item.id,
                    title: item.title,
                    subTitle: item.subTitle,
                    price: item.price,
                    discount: item.discount,
                    benefit: item.benefit,
                    syarat: item.syarat,
                    uuid: item.uuid,
                    show: item.show == 1 ? true : false,
                })));
            }
        } catch (error) {
            message.error(error.response?.data?.message ? error.response?.data?.message : 'Server Unreachable, Please Check Your Internet Connection');
        }
    };

    const handleDelete = async (uuid) => {
        try {
            await apiRequest('delete', `/content/service-detail/${uuid}`);
            fetchServices();
            message.success('Data deleted successfully');
            Modal.destroyAll();
        } catch (error) {
            message.error(error.response?.data?.message ? error.response?.data?.message : 'Error While Deleting Data');
        }
    };

    const handleSubmit = async (index, type, serviceDetailId) => {
        try {
            console.log('services', type, serviceDetailId);
            const serviceData = services[index];
            let response;
            const sendData = {
                title: serviceData.title,
                subTitle: serviceData.subTitle,
                serviceUuid: data[0].uuid,
                show: serviceData.show ? 1 : 0,
                price: Number(serviceData.price),
                discount: Number(serviceData.discount),
                benefit: serviceData.benefit,
                syarat: serviceData.syarat,
            }
            if (type === 'add') {
                response = await apiRequest('POST', `/content/service-detail`, sendData);
            } else {
                response = await apiRequest('PATCH', `/content/service-detail/${serviceDetailId}`, sendData);
            }
            if (response.status === 200) {
                message.success('Data Updated');
                fetchServices();
            }
        } catch (error) {
            message.error(error.response?.data?.message ? error.response?.data?.message : 'Failed to update data');
        }
    };

    const handleInputChange = (index, field, value) => {
        const newServices = [...services];
        newServices[index][field] = value;
        setServices(newServices);
        form.setFieldsValue({ [`${field}${index}`]: value });
    };

    const addNewForm = () => {
        setServices([...services, {
            title: '',
            subTitle: '',
            price: 0,
            discount: 0,
            benefit: [],
            syarat: [],
            show: true
        }]);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        services.forEach((service, index) => {
            form.setFieldsValue({
                [`title${index}`]: service.title,
                [`subTitle${index}`]: service.subTitle,
                [`price${index}`]: service.price,
                [`discount${index}`]: service.discount,
                [`benefit${index}`]: service.benefit,
                [`syarat${index}`]: service.syarat,
            });
        });
    }, [services]);

    return (
        <div className="mt-5 p-10 bg-white border rounded-lg">
            <div className='flex justify-between items-center'>
                <div className='text-[24px] mb-5 text-main inline-block'>Service & Syarat</div>
                <Button type="primary" className='bg-main' onClick={addNewForm}>
                    Add New <PlusOutlined />
                </Button>
            </div>

            {services.map((service, index) => (
                <Form key={index} form={form} initialValues={service}>
                    <div className="mt-5 p-5 bg-white border rounded-lg">
                        <Row>
                            <Col span={24} className='flex justify-end gap-3'>
                                <span className='text-[15px]'>Hide</span>
                                <Switch
                                    checked={service.show}
                                    onClick={(value) => handleInputChange(index, 'show', value)}
                                />
                                <span className='text-[15px]'>Show</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name={`title${index}`}
                                    label={`Title ${index + 1} :`}
                                >
                                    <Input
                                        onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                        placeholder="Enter title"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name={`subTitle${index}`}
                                    label="Sub Title :"
                                >
                                    <Input
                                        onChange={(e) => handleInputChange(index, 'subTitle', e.target.value)}
                                        placeholder="Enter subtitle"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name={`price${index}`}
                                    label="Price :"
                                >
                                    <Input
                                        onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                        placeholder="Enter price"
                                        type='number'
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={`discount${index}`}
                                    label="Discount :"
                                >
                                    <Input
                                        onChange={(e) => handleInputChange(index, 'discount', e.target.value)}
                                        placeholder="Enter discount"
                                        type='number'
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name={`benefit${index}`}
                                    label="Benefit :"
                                >
                                    <Select
                                        mode="tags"
                                        style={{ width: '100%' }}
                                        tokenSeparators={[',']}
                                        onChange={(value) => handleInputChange(index, 'benefit', value)}
                                        options={[
                                            { value: 'Option 1', label: 'Option 1' },
                                            { value: 'Option 2', label: 'Option 2' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name={`syarat${index}`}
                                    label="Syarat :"
                                >
                                    <Select
                                        mode="tags"
                                        style={{ width: '100%' }}
                                        tokenSeparators={[',']}
                                        onChange={(value) => handleInputChange(index, 'syarat', value)}
                                        options={[
                                            { value: 'Option 1', label: 'Option 1' },
                                            { value: 'Option 2', label: 'Option 2' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <div className="mt-5 flex justify-end">
                            {service.id ? (
                                <Button type="default" className="mr-2"
                                    onClick={() => {
                                        Modal.info({
                                            title: 'Delete Data',
                                            centered: true,
                                            content: (
                                                <React.Fragment>
                                                    <div>Are you sure you want to delete this data?</div>
                                                    <div className="mt-5 flex justify-end">
                                                        <Button
                                                            type="default"
                                                            className="mr-2"
                                                            onClick={() => {
                                                                Modal.destroyAll();
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            type="primary"
                                                            className="bg-main"
                                                            onClick={() => handleDelete(service.uuid)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </React.Fragment>
                                            ),
                                            footer: null,
                                        });
                                    }}
                                >Delete</Button>
                            ) : <Button type="default" className="mr-2" onClick={() => setServices(services.filter((item, i) => i !== index))}  >Cancel</Button>}
                            <Button type="primary" className='bg-main' onClick={() => handleSubmit(index, service.id ? 'update' : 'add', service.id)}>Save</Button>
                        </div>
                    </div>
                </Form>
            ))}
        </div>
    );
};

export default ServiceSyaratPage;
