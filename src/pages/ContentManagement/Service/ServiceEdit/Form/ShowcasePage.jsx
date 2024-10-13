import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Switch, Button, message } from 'antd';
import { apiRequest } from '../../../../../utils/api';

const ShowcasePage = ({ data, language, setData }) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const dataLanguage = data.filter((item) => item.languageId === language)[0];

            const response = await apiRequest('PATCH', `/content/service-content/${dataLanguage.id}`, {
                showcaseTitle: form.getFieldValue('showcaseTitle'),
                showcaseSub: form.getFieldValue('showcaseSubTitle'),
            });

            if (response.status === 200) {
                setData(response.data.data);
                message.success('Data Updated');
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const dataLanguage = data.filter((item) => item.languageId === language)[0];

        form.setFieldsValue({
            showcaseTitle: dataLanguage.showcaseTitle,
            showcaseSubTitle: dataLanguage.showcaseSub,
        });
    }, []);

    return (
        <div className="mt-5 p-10 bg-white border rounded-lg">
            {/* <div className='flex justify-between items-center'>
                <div className='text-[24px] mb-5 text-main inline-block'>Showcase</div>
                <Row>
                    <Col span={24} className='flex justify-end gap-3'>
                        <span className='text-[15px]'>Hide</span>
                        <Switch defaultChecked />
                        <span className='text-[15px]'>Show</span>
                    </Col>
                </Row>
            </div> */}
            <Form form={form}>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="showcaseTitle"
                            label="Title :"
                        >
                            <Input placeholder="Enter title" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="showcaseSubTitle"
                            label="Sub Title :"
                        >
                            <Input placeholder="Enter subtitle" />
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
            <div className="mt-5 flex justify-end">
                <Button type="default" className="mr-2">Cancel</Button>
                <Button type="primary" className='bg-main' onClick={handleSubmit}>Save</Button>
            </div>
        </div>
    )
}

export default ShowcasePage