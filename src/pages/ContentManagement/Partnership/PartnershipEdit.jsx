import React, { useState } from 'react';
import { Row, Col, Button, Input, Form, Switch, Select } from 'antd';
import ImagePreviewUploader from '../../../components/ui/File Upload/ImagePreview';
import { useParams } from 'react-router-dom';
import Flag from 'react-world-flags';
const PartnershipEdit = () => {
    const { id } = useParams();
    const [image, setImage] = useState(null);

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
                                                Partnership / {id}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="mt-5 p-10 bg-white border rounded-lg">
                                    <Form layout="vertical">
                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="image"
                                                    label="Image"
                                                    rules={[{ required: true, message: 'Please upload an image' }]}
                                                >
                                                    <ImagePreviewUploader image={image} setImage={setImage} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={24} className='flex justify-end gap-3'>
                                                <span className='text-[15px]'>Hide</span>
                                                <Switch
                                                    defaultChecked
                                                />
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
                                                        options={[
                                                            {
                                                                value: 'id',
                                                                label: (
                                                                    <span>
                                                                        <Flag code="ID" className="inline w-[20px] h-[20px] mr-[8px] shadow-2xl" />
                                                                        Indonesia
                                                                    </span>
                                                                ),
                                                            },
                                                            {
                                                                value: 'en',
                                                                label: (
                                                                    <span>
                                                                        <Flag code="GB" className="inline w-[20px] h-[20px] mr-[8px] shadow-2xl" />
                                                                        English
                                                                    </span>
                                                                ),
                                                            },
                                                            {
                                                                value: 'cn',
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
                                                    name="url"
                                                    label="URL"
                                                    rules={[{ required: true, message: 'Please enter a URL' }]}
                                                >
                                                    <Input placeholder="Enter URL" />
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

export default PartnershipEdit;