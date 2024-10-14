import React, { useState } from 'react'
import { Row, Col, Form, Input, Switch, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const FaqPage = () => {
    // const [questionCount, setQuestionCount] = useState(1)
    // const addQuestionAnswer = () => {
    //     setQuestionCount(questionCount + 1)
    // }
    const [form] = Form.useForm()
    const [faq, setFaq] = useState([{
        faqTitle: '',
        faqSubTitle: '',
        faqQuestion1: '',
        faqAnswer1: '',
    }])

    const addNewForm = () => {
        setFaq([...faq, {
            faqTitle: '',
            faqSubTitle: '',
            faqQuestion1: '',
            faqAnswer1: '',
        }])
    }

    return (
        <>
            <div className="mt-5 p-10 bg-white border rounded-lg">
                <div className='flex justify-between items-center'>
                    <div className='text-[24px] mb-5 text-main inline-block'>Frequently Asked Questions (FAQ)</div>
                    <Button type="primary" className='bg-main' onClick={addNewForm}>
                        Add New <PlusOutlined />
                    </Button>
                </div>

                {faq.map((item, index) => (
                    <Form key={index} form={form} initialValues={item}>
                        <div className="mt-5 p-5 bg-white border rounded-lg">
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
                                        name={`faqTitle${index}`}
                                        label={`Title ${index + 1} :`}
                                    >
                                        <Input placeholder="Enter title" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name={`faqSubTitle${index}`}
                                        label={`Sub Title ${index + 1} :`}
                                    >
                                        <Input placeholder="Enter sub title" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name={`faqQuestion${index}`}
                                        label={`Question ${index + 1} :`}
                                    >
                                        <Input placeholder="Enter question 1" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name={`faqAnswer${index}`}
                                        label={`Answer ${index + 1} :`}
                                    >
                                        <Input placeholder="Enter answer 1" />
                                    </Form.Item>
                                </Col>
                            </Row>


                            <div className="mt-5 flex justify-end">
                                <Button type="default" className="mr-2">Cancel</Button>
                                <Button type="primary" className='bg-main'>Save</Button>
                            </div>
                        </div>
                    </Form>
                ))}

            </div>
        </>
    )
}

export default FaqPage