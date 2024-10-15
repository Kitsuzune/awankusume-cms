import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Switch, Button, Select, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { apiRequest } from '../../../../../utils/api';

const FaqPage = ({ data, language, setData }) => {
    const [services, setServices] = useState([]);
    const [form] = Form.useForm();

    const fetchServices = async () => {
        try {
            const dataLanguage = data.filter((item) => item.languageId === language)[0];
            const response = await apiRequest('GET', `/content/service-content/faq/${dataLanguage.id}`);
            if (response.status === 200) {
                setServices(response.data.data.map((item) => ({
                    id: item.id,
                    title: item.title,
                    subTitle: item.subTitle,
                    question: item.question,
                    answer: item.answer,
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
            await apiRequest('delete', `/content/faq/${uuid}`);
            fetchServices();
            message.success('Data deleted successfully');
            Modal.destroyAll();
        } catch (error) {
            message.error(error.response?.data?.message ? error.response?.data?.message : 'Error While Deleting Data');
        }
    };

    const handleSubmit = async (index, type, serviceDetailId) => {
        try {
            const serviceData = services[index];
            let response;
            const sendData = {
                title: serviceData.title,
                subTitle: serviceData.subTitle,
                show: serviceData.show ? '1' : '0',
                question: serviceData.question,
                answer: serviceData.answer,
            }
            if (type === 'add') {
                sendData.serviceUuid = data[0].uuid;
                response = await apiRequest('POST', `/content/faq`, sendData);
            } else {
                response = await apiRequest('PATCH', `/content/faq/${serviceDetailId}`, sendData);
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
            question: '',
            answer: '',
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
                [`question${index}`]: service.question,
                [`answer${index}`]: service.answer,
            });
        });
    }, [services]);

    return (
        <>
            <div className="mt-5 p-10 bg-white border rounded-lg">
                <div className='flex justify-between items-center'>
                    <div className='text-[24px] mb-5 text-main inline-block'>Frequently Asked Questions (FAQ)</div>
                    <Button type="primary" className='bg-main' onClick={addNewForm}>
                        Add New <PlusOutlined />
                    </Button>
                </div>

                {services.map((item, index) => (
                    <Form key={index} form={form} initialValues={item}>
                        <div className="mt-5 p-5 bg-white border rounded-lg">
                            <Row>
                                <Col span={24} className='flex justify-end gap-3'>
                                    <span className='text-[15px]'>Hide</span>
                                    <Switch
                                        checked={item.show}
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
                                        label={`Sub Title ${index + 1} :`}
                                    >
                                        <Input
                                            onChange={(e) => handleInputChange(index, 'subTitle', e.target.value)}
                                            placeholder="Enter subtitle"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name={`question${index}`}
                                        label={`Question ${index + 1} :`}
                                    >
                                        <Input
                                            onChange={(e) => handleInputChange(index, 'question', e.target.value)}
                                            placeholder="Enter question" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name={`answer${index}`}
                                        label={`Answer ${index + 1} :`}
                                    >
                                        <Input
                                            onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
                                            placeholder="Enter answer"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div className="mt-5 flex justify-end">
                            {item.id ? (
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
                                                            onClick={() => handleDelete(item.uuid)}
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
                                <Button type="primary" className='bg-main' onClick={() => handleSubmit(index, item.id ? 'update' : 'add', item.id)}>Save</Button>
                            </div>
                        </div>
                    </Form>
                ))}

            </div>
        </>
    )
}

export default FaqPage