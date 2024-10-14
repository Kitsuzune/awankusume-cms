import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, Select, Switch, message } from 'antd';
import Loading from '../../components/ui/Loading/Loading';
import { PlusOutlined } from '@ant-design/icons';
import Flag from 'react-world-flags';
import { apiRequest } from '../../utils/api';

const Faq = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [faq, setFaq] = useState([{
        faqTitle: '',
        faqSubTitle: '',
        faqQuestion1: '',
        faqAnswer1: '',
        language: 1,
    }])

    const addNewForm = () => {
        setFaq([...faq, {
            faqTitle: '',
            faqSubTitle: '',
            faqQuestion1: '',
            faqAnswer1: '',
            language: 1,
        }])
    }

    const handleInputChange = (index, field, value) => {
        const newFaq = [...faq];
        newFaq[index][field] = value;
        setFaq(newFaq);
        form.setFieldsValue({ [`${field}${index}`]: value });
    };

    const handleLanguageChange = (index, value) => {
        const newFaq = [...faq];
        newFaq[index].language = value;
        setFaq(newFaq);
    }

    const handleSubmit = async (index, type, faqId) => {
        try {
            const data = faq[index];
            let response;
            const sendData = {
                title: data.title,
                subTitle: data.subTitle,
                show: data.show ? '1' : '0',
                question: data.question,
                answer: data.answer,
            }

            if (type === 'add') {
                response = await apiRequest('POST', `/content/faq`, sendData);
            } else {
                response = await apiRequest('PATCH', `/content/faq/${faqId}`, sendData);
            }
            if (response.status === 200) {
                message.success('Data Updated');
                fetchServices();
            }
        } catch (error) {
            message.error(error.response?.data?.message ? error.response?.data?.message : 'Failed to update data');
        }
    };

    const fetchServices = async () => {
        try {
            const response = await apiRequest('GET', `/content/faq`, {}, {
                perPage: 100,
                page: 1,
                orderBy: 'id:desc'
            })
            if (response.status === 200) {
                setFaq(response.data.data.map((item) => ({
                    id: item.id,
                    title: item.title,
                    subTitle: item.subTitle,
                    question: item.question,
                    answer: item.answer,
                    language: 1,
                    show: item.show === '1' ? true : false,
                })));
            }
        } catch (error) {
            message.error(error.response?.data?.message ? error.response?.data?.message : 'Server Unreachable, Please Check Your Internet Connection');
        }
    };

    useEffect(() => {
        faq.forEach((item, index) => {
            form.setFieldsValue({
                [`title${index}`]: item.title,
                [`subTitle${index}`]: item.subTitle,
                [`question${index}`]: item.question,
                [`answer${index}`]: item.answer,
                [`language${index}`]: item.language,
            });
        });
    }, [faq]);

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <>
            <Row className="w-full">
                <Col span={24}>
                    <div className="rounded-lg">
                        <Row>
                            <Col span={24}>
                                <div className="flex flex-col">
                                    <div className='bg-white p-5 rounded-lg'>
                                        <Row>
                                            <Col span={24}>
                                                <div className='text-[24px] text-main inline-block'>Article</div>
                                                <br />
                                                <span className='text-[15px] inline-block mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="mt-5 px-10 py-5 bg-white border rounded-lg">
                                        <Form layout="vertical" form={form}>

                                            <div className='flex justify-between items-center'>
                                                <div className='text-[24px] mb-5 text-main inline-block'>Frequently Asked Questions (FAQ)</div>
                                                <Button type="primary" className='bg-main' onClick={addNewForm}>
                                                    Add New <PlusOutlined />
                                                </Button>
                                            </div>

                                            {faq.map((item, index) => (
                                                <div className="mt-5 p-5 bg-white border rounded-lg" key={index}>
                                                    <Row>
                                                        <Col span={24} className='flex justify-end gap-3'>
                                                            <span className='text-[15px]'>Hide</span>
                                                            <Switch defaultChecked={item.show} />
                                                            <span className='text-[15px]'>Show</span>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col span={24}>
                                                            <Form.Item
                                                                name={`language${index}`}
                                                                label={`Language ${index + 1}`}
                                                                rules={[{ required: true, message: 'Please select a language' }]}
                                                            >
                                                                <Select
                                                                    showSearch
                                                                    placeholder="Select Language"
                                                                    optionFilterProp="label"
                                                                    onChange={(value) => handleLanguageChange(index, value)}
                                                                    value={item.language}
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
                                                                name={`title${index}`}
                                                                label={`Title ${index + 1} :`}
                                                            >
                                                                <Input placeholder="Enter title" onChange={(e) => handleInputChange(index, 'title', e.target.value)} />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col span={24}>
                                                            <Form.Item
                                                                name={`subTitle${index}`}
                                                                label={`Sub Title ${index + 1} :`}
                                                            >
                                                                <Input placeholder="Enter sub title" onChange={(e) => handleInputChange(index, 'subTitle', e.target.value)} />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col span={24}>
                                                            <Form.Item
                                                                name={`question${index}`}
                                                                label={`Question ${index + 1} :`}
                                                            >
                                                                <Input placeholder="Enter question 1" onChange={(e) => handleInputChange(index, 'question', e.target.value)} />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col span={24}>
                                                            <Form.Item
                                                                name={`answer${index}`}
                                                                label={`Answer ${index + 1} :`}
                                                            >
                                                                <Input placeholder="Enter answer 1" onChange={(e) => handleInputChange(index, 'answer', e.target.value)} />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>

                                                    <div className="mt-5 flex justify-end">
                                                        <Button type="default" className="mr-2">Cancel</Button>
                                                        <Button type="primary" className='bg-main' onClick={() => handleSubmit(index, item.id ? 'update' : 'add', item.id)}>Save</Button>
                                                    </div>
                                                </div>

                                            ))}

                                        </Form>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Loading isLoading={loading} />
        </>
    )
}

export default Faq;
