import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Form, Switch, Select, message, Modal } from 'antd';
import ImagePreviewUploader from '../../../components/ui/File Upload/ImagePreview';
import { useParams } from 'react-router-dom';
import Flag from 'react-world-flags';
import { apiRequest } from '../../../utils/api';
import Loading from '../../../components/ui/Loading/Loading';
import Draggable from '../../../components/ui/File Upload/Draggable';

const AboutEdit = () => {
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [language, setLanguage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const response = await apiRequest('get', `/content/about/${id}`);
            setData(response.data.data)

            const dataLanguage = response.data.data.filter((item) => item.languageId === language)[0];

            form.setFieldsValue({
                title: dataLanguage.title,
                subTitle: dataLanguage.subTitle,
                link: dataLanguage.link,
                show: dataLanguage.show,
            });

            setImage(`${process.env.REACT_APP_API_URL_CSM}/public/about/${dataLanguage.image}`);

        } catch (error) {
            message.error(error.response.data.message);
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const dataLanguage = data.filter((item) => item.languageId === language)[0];

            const sendData = {
                title: form.getFieldValue('title'),
                subTitle: form.getFieldValue('subTitle'),
                link: form.getFieldValue('link'),
                show: form.getFieldValue('show') ? '1' : '0',
                file: image,
            }

            console.log(sendData);

            let response;

            if (id) {
                response = await apiRequest('PATCH', `/content/about/${dataLanguage.id}`, sendData);
            } else {
                response = await apiRequest('POST', `/content/about`, sendData);
            }

            if (response.status === 200) {
                Modal.success({
                    title: 'Success',
                    content: 'Data has been updated',
                    centered: true,
                });

                fetchData()
            }

        } catch (error) {
            console.log(error);
            message.error(error.response?.data?.message || 'Something went wrong');
        }
        setLoading(false);
    }

    useEffect(() => {
        if (id) {
            fetchData()
        }
    }, [])

    useEffect(() => {
        if (data.length === 0) return;
        const dataLanguage = data.filter((item) => item.languageId === language)[0];

        form.setFieldsValue({
            title: dataLanguage.title,
            subTitle: dataLanguage.subTitle,
            link: dataLanguage.link,
            show: dataLanguage.show,
        });

    }, [language])

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
                                                <div className='text-[24px] text-main inline-block'>
                                                    About / {id}
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="mt-5 p-10 bg-white border rounded-lg">
                                        <Form layout="vertical" form={form}>
                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name="image"
                                                        label="Image"
                                                        rules={[{ required: true, message: 'Please upload an image' }]}
                                                    >
                                                        <ImagePreviewUploader image={image} setImage={setImage} name="image" />
                                                        {/* <img src={process.env.REACT_APP_API_URL_CSM + '/about/' + data[0]?.image } />
                                                        <Draggable
                                                            topText="Click or drag file SK to this area to upload"
                                                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                                                            onFileChange={(file) => setImage(file)}
                                                        /> */}
                                                    </Form.Item>
                                                </Col>
                                            </Row>

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
                                                        <Input placeholder="Enter subtitle" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name="link"
                                                        label="Link"
                                                        rules={[{ required: true, message: 'Please enter a link' }]}
                                                    >
                                                        <Input placeholder="Enter Link" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <div className="mt-5 flex justify-end">
                                                <Button type="default" className="mr-2">Cancel</Button>
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
    );
};

export default AboutEdit;