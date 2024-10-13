import React, { useState } from 'react'
import { Row, Col, Form, Input, Button, Select, Switch } from 'antd';
import Loading from '../../components/ui/Loading/Loading';
import { PlusOutlined } from '@ant-design/icons';
import Flag from 'react-world-flags';

const Faq = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
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
                                <Input name={`question`} placeholder={`Enter question ${i + 1}`} />
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
                                                            name="language"
                                                            label="Select Language"
                                                            rules={[{ required: true, message: 'Please select a language' }]}
                                                        >
                                                            <Select
                                                                showSearch
                                                                placeholder="Select Language"
                                                                optionFilterProp="label"
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

                                                {renderQuestionAnswer()}

                                                <div className="mt-5 flex justify-end">
                                                    <Button type="default" className="mr-2">Cancel</Button>
                                                    <Button type="primary" className='bg-main'>Save</Button>
                                                </div>
                                            </div>


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

export default Faq