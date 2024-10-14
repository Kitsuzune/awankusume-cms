import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, Select, message } from 'antd';
import ImagePreviewUploader from '../../../components/ui/File Upload/ImagePreview';
import Loading from '../../../components/ui/Loading/Loading';
import Flag from 'react-world-flags';
import { apiRequest } from '../../../utils/api';

const Promo = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await apiRequest('GET', '/content/promotion');
            if (response.status === 200) {
                form.setFieldsValue({
                    name: response.data.data.name,
                    link: response.data.data.link
                });
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const handleSubmit = async () => {
        setLoading(true);

        const sendData = {
            link: form.getFieldValue('link')
        }

        try {
            const response = await apiRequest('PATCH', '/content/promotion', sendData);
            if (response.status === 200) {
                message.success('Promo Updated Successfully');
            }
        } catch (error) {
            message.error(error.response?.data?.message ? error.response?.data?.message : 'Server Unreachable, Please Check Your Internet Connection');
        }
        setLoading(false);
    }


    React.useEffect(() => {
        fetchData();
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
                                                <div className='text-[24px] text-main inline-block'>Promo</div>
                                                <br />
                                                <span className='text-[15px] inline-block mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="mt-5 p-10 bg-white border rounded-lg">
                                        <Form layout="vertical" form={form}>

                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name="name"
                                                        label="Name"
                                                        rules={[{ required: true, message: 'Please enter a title' }]}
                                                    >
                                                        <Input disabled
                                                            placeholder="Enter title" />

                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name="link"
                                                        label="link Promo"
                                                        rules={[{ required: true, message: 'Please enter a URL' }]}
                                                    >
                                                        <Input placeholder="Enter URL" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <div className="mt-5 flex justify-end">
                                                <Button type="default" className="mr-2" onClick={() => form.resetFields()}>Reset</Button>
                                                <Button type="primary" className='bg-main' onClick={handleSubmit}>Save</Button>
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

export default Promo