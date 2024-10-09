import React, { useState } from 'react'
import { Row, Col, Form, Input, Switch, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const FaqPage = () => {
    const [questionCount, setQuestionCount] = useState(1)
    const addQuestionAnswer = () => {
        setQuestionCount(questionCount + 1)
    }
    const renderQuestionAnswer = () => {
        const forms = []

        for (let i = 0; i < questionCount; i++) {
            forms.push(
                <div key={i}>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name={`question${i}`}
                                label={`Question ${i + 1} :`}
                                rules={[{ required: true, message: `Please enter the question ${i + 1}` }]}
                            >
                                <Input name={`question`} placeholder={`Enter question ${i + 1}`}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name={`answer${i}`}
                                label={`Answer ${i + 1} :`}
                                rules={[{ required: true, message: `Please enter the answer ${i + 1}` }]}
                            >
                                <Input name={`answer`} placeholder={`Enter answer ${i + 1}`} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            )
        }
        return forms
    }

    return (
        <>
            <div className="mt-5 p-10 bg-white border rounded-lg">
                <div className='flex justify-between items-center'>
                    <div className='text-[24px] mb-5 text-main inline-block'>Frequently Asked Questions (FAQ)</div>
                    <Button type="primary" className='bg-main' onClick={addQuestionAnswer}>
                        Add New <PlusOutlined />
                    </Button>
                </div>

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
                                name="faqTitle"
                                label="Title :"
                            >
                                <Input placeholder="Enter title" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="faqSubTitle"
                                label="Sub Title :"
                            >
                                <Input placeholder="Enter sub title" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* <Row>
                        <Col span={24}>
                            <Form.Item
                                name="faqQuestion1"
                                label="Question 1 :"
                            >
                                <Input placeholder="Enter question 1" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="faqAnswer1"
                                label="Answer 1 :"
                            >
                                <Input placeholder="Enter answer 1" />
                            </Form.Item>
                        </Col>
                    </Row> */}

                    {renderQuestionAnswer()}

                    <div className="mt-5 flex justify-end">
                        <Button type="default" className="mr-2">Cancel</Button>
                        <Button type="primary" className='bg-main'>Save</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FaqPage