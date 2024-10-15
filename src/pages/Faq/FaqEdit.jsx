import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Form, Switch, Select, message, Modal } from 'antd';
import { useParams } from 'react-router-dom';
import Flag from 'react-world-flags';
import { useNavigate } from 'react-router-dom';

const FaqEdit = () => {
    const [ id, setId ] = useState(useParams().id);
    const [image, setImage] = useState(null);
    const [imageCurrent, setImageCurrent] = useState(null);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [language, setLanguage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


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
                                            <div className='text-[24px] text-main inline-block'>
                                                {/* Faq / {id} */}
                                                {id ? 'Faq / ' + id : 'Add New Faq'}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="mt-5 p-10 bg-white border rounded-lg">
                                    <Form layout="vertical" form={form}>
                                        <Row>
                                            <Col span={24} className='flex justify-end gap-3'>
                                                <Form.Item
                                                    name="show"
                                                    valuePropName="checked"
                                                >
                                                    <span className='text-[15px]'>Hide</span>
                                                    <Switch defaultChecked className='mx-2' />
                                                    <span className='text-[15px]'>Show</span>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="language"
                                                    label="Select Language"
                                                    rules={[{ required: true, message: 'Please select a language' }]}
                                                >
                                                    <Select
                                                        showSearch
                                                        placeholder="Select Language"
                                                        optionFilterProp="label"
                                                        onChange={(value) => setLanguage(value)}
                                                        defaultValue={1}
                                                        options={[
                                                            {
                                                                value: 1,
                                                                label: (
                                                                    <span>
                                                                        <Flag code="ID" className="inline w-[20px] h-[20px] mr-[8px] shadow-2xl" />
                                                                        Indonesia
                                                                    </span>
                                                                ),
                                                            },
                                                            {
                                                                value: 2,
                                                                label: (
                                                                    <span>
                                                                        <Flag code="GB" className="inline w-[20px] h-[20px] mr-[8px] shadow-2xl" />
                                                                        English
                                                                    </span>
                                                                ),
                                                            },
                                                            {
                                                                value: 3,
                                                                label: (
                                                                    <span>
                                                                        <Flag code="CN" className="inline w-[20px] h-[20px] mr-[8px] shadow-2xl" />
                                                                        Chinese
                                                                    </span>
                                                                ),
                                                            },
                                                        ]}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="title"
                                                    label="Title"
                                                    rules={[{ required: true, message: 'Please enter a title' }]}
                                                >
                                                    <Input placeholder="Enter title" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="subTitle"
                                                    label="Sub Title"
                                                    rules={[{ required: true, message: 'Please enter a sub title' }]}
                                                >
                                                    <Input placeholder="Enter sub title" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="question"
                                                    label="Question"
                                                    rules={[{ required: true, message: 'Please enter a question' }]}
                                                >
                                                    <Input placeholder="Enter question" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="answer"
                                                    label="Answer"
                                                    rules={[{ required: true, message: 'Please enter a answer' }]}
                                                >
                                                    <Input placeholder="Enter answer" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <div className="mt-5 flex justify-end">
                                            <Button type="default" className="mr-2">Cancel</Button>
                                            <Button type="primary" className='bg-main'>Save</Button>
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

export default FaqEdit;