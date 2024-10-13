import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select, Button, message } from 'antd';
import { apiRequest } from '../../../../../utils/api';

const StylePage = ({ desainId, setDesainId, data, language, setData }) => {
    const [desainList, setDesainList] = useState([]);
    const [form] = Form.useForm();

    const fetchDesain = async () => {
        try {
            const response = await apiRequest('GET', `/content/service-content/desain/getAll`);

            if (response.status === 200) {
                setDesainList(response.data.data);
            }

            form.setFieldsValue({
                stylePage: desainId,
            });

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async () => {
        try {
            const dataLanguage = data.filter((item) => item.languageId === language)[0];

            const response = await apiRequest('PATCH', `/content/service-content/${dataLanguage.id}`, {
                desainId: desainId.toString()
            });

            if(response.status === 200) {
                setData(response.data.data);
                message.success('Data Updated');
            }
            
            if (response.status === 200) {
                console.log('Success');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDesain();
    }, []);

    return (
        <div className="mt-5 p-10 bg-white border rounded-lg">
            <Row>
                <Col span={24}>
                    <Form form={form}>
                        <Form.Item
                            name="stylePage"
                            label="Style Page"
                            initialValue={desainId} 
                        >
                            <Select
                                showSearch
                                placeholder="Select Style"
                                optionFilterProp="label"
                                options={desainList.map((desain) => ({
                                    value: desain.id,
                                    label: desain.name
                                }))}
                                onChange={(value) => setDesainId(value)}
                            />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>

            <div className="mt-5 flex justify-end">
                <Button type="default" className="mr-2">Cancel</Button>
                <Button type="primary" className='bg-main' onClick={handleSubmit}>Save</Button>
            </div>
        </div>
    )
}

export default StylePage;
