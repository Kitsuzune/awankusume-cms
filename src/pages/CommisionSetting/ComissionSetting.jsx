import React, { useEffect, useState } from 'react'
import { Row, Col, Form, InputNumber, Button, Select, Modal, message } from 'antd'
import { apiRequest } from '../../utils/api';

const { Option } = Select;

const ComissionSetting = () => {
    const [form] = Form.useForm();
    const [firstCommission, setFirstCommission] = useState(0);
    const [secondCommission, setSecondCommission] = useState(0);
    const [firstStep, setFirstStep] = useState(10000);
    const [secondStep, setSecondStep] = useState(10000);

    const fetchCommission = async () => {
        const response = await apiRequest('get', '/commission/commission-value');
        setFirstCommission(response?.data?.data?.firstVal);
        setSecondCommission(response?.data?.data?.otherVal);
    }

    const handleIncrement = (setter, value, step) => {
        setter(value + step);
    };

    const handleDecrement = (setter, value, step) => {
        if (value - step >= 0) {
            setter(value - step);
        }
    };
    
    const handleReset = (setter, value) => {
        value = 0;
        setter(value);
    };

    const handleSave = async () => {
        try {
            const response = await apiRequest('patch', '/commission/commission-value', {
                firstVal: firstCommission,
                otherVal: secondCommission
            });

            if (response.status === 200) {
                Modal.success({
                    title: 'Success',
                    content: 'Commission has been updated',
                    centered: true,
                });

                fetchCommission();
            }
        } catch (error) {
            console.log(error);
            message.error(error.response?.data?.message ? error.response?.data?.message : 'Error while updating commission');
        }
    }

    useEffect(() => {
        fetchCommission();
    }, []);

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
                                            <div className='text-[24px] text-main inline-block'>Commission Setting</div>
                                            <br />
                                            <span className='text-[15px] inline-block mt-5'>Everything is in your control, give the best service</span>
                                        </Col>
                                    </Row>
                                </div>
    
                                <div className="mt-5 p-10 bg-white border rounded-lg">
                                    <Form layout="vertical" form={form}>
                                        <Row>
                                            <Col xs={24} md={18}>
                                                <Form.Item label="First Commission">
                                                    <InputNumber
                                                        className="w-full"
                                                        value={firstCommission}
                                                        onChange={value => setFirstCommission(value)}
                                                        min={0}
                                                        formatter={value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        parser={value => value.replace(/Rp.\s?|(,*)/g, '').replace(/\D/g, '')}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={6}>
                                                <Form.Item label=" ">
                                                    <div className="flex items-center justify-between">
                                                        <Button onClick={() => handleIncrement(setFirstCommission, firstCommission, firstStep)} className="ml-1">+</Button>
                                                        <Button onClick={() => handleDecrement(setFirstCommission, firstCommission, firstStep)} className="ml-1">-</Button>
                                                        <Button onClick={() => handleReset(setFirstCommission, firstCommission)} danger className="ml-1">Reset</Button>
                                                        <Select value={firstStep} onChange={value => setFirstStep(value)} className="ml-1">
                                                            <Option value={10000}>10,000</Option>
                                                            <Option value={100000}>100,000</Option>
                                                            <Option value={1000000}>1,000,000</Option>
                                                        </Select>
                                                    </div>
                                                </Form.Item>
                                            </Col>
                                        </Row>
    
                                        <Row>
                                            <Col xs={24} md={18}>
                                                <Form.Item label="Second & Continuous Commission">
                                                    <InputNumber
                                                        className="w-full"
                                                        value={secondCommission}
                                                        onChange={value => setSecondCommission(value)}
                                                        min={0}
                                                        formatter={value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        parser={value => value.replace(/Rp.\s?|(,*)/g, '').replace(/\D/g, '')}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={6}>
                                                <Form.Item label=" ">
                                                    <div className="flex items-center justify-between">
                                                        <Button onClick={() => handleIncrement(setSecondCommission, secondCommission, secondStep)} className="ml-1">+</Button>
                                                        <Button onClick={() => handleDecrement(setSecondCommission, secondCommission, secondStep)} className="ml-1">-</Button>
                                                        <Button onClick={() => handleReset(setSecondCommission, secondCommission)} danger className="ml-1">Reset</Button>
                                                        <Select value={secondStep} onChange={value => setSecondStep(value)} className="ml-1">
                                                            <Option value={10000}>10,000</Option>
                                                            <Option value={100000}>100,000</Option>
                                                            <Option value={1000000}>1,000,000</Option>
                                                        </Select>
                                                    </div>
                                                </Form.Item>
                                            </Col>
                                        </Row>
    
                                        <div className='mt-5 flex justify-end'>
                                            <Button type="default" className="mr-2">Reset</Button>
                                            <Button type="primary" className='bg-main' onClick={handleSave}>Save</Button>
                                        </div>
                                    </Form>
                                </div>
    
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default ComissionSetting