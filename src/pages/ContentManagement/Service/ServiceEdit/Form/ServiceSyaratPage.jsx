import React, { useState } from 'react'
import { Row, Col, Form, Input, Switch, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ServiceSyaratPage = () => {
    const [formCount, setFormCount] = useState(1);

    const addNewForm = () => {
        setFormCount(formCount + 1);
    };

    return (
        <>
            <div className="mt-5 p-10 bg-white border rounded-lg">
                <div className='flex justify-between items-center'>
                    <div className='text-[24px] mb-5 text-main inline-block'>Service & Syarat</div>
                    <Button type="primary" className='bg-main' onClick={addNewForm}>
                        Add New <PlusOutlined />
                    </Button>
                </div>

                {[...Array(formCount)].map((_, index) => (
                    <div key={index} className="mt-5 p-5 bg-white border rounded-lg">
                        <Row>
                            <Col span={24} className='flex justify-end gap-3'>
                                <span className='text-[15px]'>Hide</span>
                                <Switch defaultChecked />
                                <span className='text-[15px]'>Show</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name={`serviceSyaratTitle${index + 1}`}
                                    label={`Title ${index + 1} :`}
                                >
                                    <Input placeholder="Enter title" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name={`serviceSyaratSubTitle${index + 1}`}
                                    label="Sub Title :"
                                >
                                    <Input placeholder="Enter subtitle" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name={`serviceSyaratPrice${index + 1}`}
                                    label="Price :"
                                >
                                    <Input placeholder="Enter price" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={`serviceSyaratDiscount${index + 1}`}
                                    label="Discount :"
                                >
                                    <Input placeholder="Enter discount" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name={`serviceSyaratBenefit${index + 1}`}
                                    label="Benefit :"
                                >
                                    <Select
                                        mode="tags"
                                        style={{ width: '100%' }}
                                        tokenSeparators={[',']}
                                        options={[
                                            {
                                                value: '1',
                                                label: 'Option 1'
                                            },
                                            {
                                                value: '2',
                                                label: 'Option 2'
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name={`serviceSyaratRequirement${index + 1}`}
                                    label="Syarat :"
                                >
                                    <Select
                                        mode="tags"
                                        style={{ width: '100%' }}
                                        tokenSeparators={[',']}
                                        options={[
                                            {
                                                value: '1',
                                                label: 'Option 1'
                                            },
                                            {
                                                value: '2',
                                                label: 'Option 2'
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <div className="mt-5 flex justify-end">
                            <Button type="default" className="mr-2">Cancel</Button>
                            <Button type="primary" className='bg-main'>Save</Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ServiceSyaratPage