import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Form, Switch, Select, message, Modal } from 'antd';
import ImagePreviewUploader from '../../../../../components/ui/File Upload/ImagePreview';
import Flag from 'react-world-flags';
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { apiRequest } from '../../../../../utils/api';

const ServiceEditStep1 = ({ image, setImage, onNext, id, setId, data, setData, language, setLanguage, setDesainId }) => {
    const [imageCurrent, setImageCurrent] = useState(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(location.state?.edit || false);
    const navigate = useNavigate();
    const [nextPageType, setNextPageType] = useState(false);
    const [active, setActive] = useState(false);
    const [typeList, setTypeList] = useState([]);

    const fetchData = async (localId) => {
        try {
            setLoading(true);
            const response = await apiRequest('get', `/content/service-content/${localId}`);
            setData(response.data.data)

            const dataLanguage = response.data.data.filter((item) => item.languageId === language)[0];
            setDesainId(dataLanguage.desainId);

            form.setFieldsValue({
                title: dataLanguage.title,
                subTitle: dataLanguage.subTitle,
                show: dataLanguage.show === '1' ? true : false,
                status: dataLanguage.status,
                type: dataLanguage.type,
            });

            setActive(dataLanguage.show == '1' ? true : false);
            setImage(`${process.env.REACT_APP_API_URL_CSM}/public/service/${dataLanguage.image}`);
            setImageCurrent(`${process.env.REACT_APP_API_URL_CSM}/public/service/${dataLanguage.image}`);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error(error.response?.data?.message ? error.response?.data?.message : 'Server Unreachable, Please Check Your Internet Connection');
        }
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        navigate(0);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const dataLanguage = data.filter((item) => item.languageId === language)[0];

            const fileToSend = image !== imageCurrent ? image : undefined;

            const sendData = {
                title: form.getFieldValue('title'),
                subTitle: form.getFieldValue('subTitle'),
                show: active ? '1' : '0',
                status: form.getFieldValue('status'),
                type: form.getFieldValue('type'),
            }

            if (fileToSend) {
                sendData.file = fileToSend;
            }

            let response;

            if (id) {
                response = await apiRequest('PATCH', `/content/service-content/${dataLanguage.id}`, sendData);
            } else {
                response = await apiRequest('POST', `/content/service-content`, sendData);
            }

            setLoading(false);

            if (response.status === 200) {
                Modal.success({
                    title: 'Success',
                    content: 'Data has been updated',
                    centered: true,
                });
                setNextPageType(true);
                let newUuid = null;
                if (!id) {
                    newUuid = response.data.data[0].uuid;
                    navigate('/app/content/service/' + newUuid);
                    setId(newUuid);
                }

                fetchData(newUuid ? newUuid : id);
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error(error.response?.data?.message || 'Something went wrong');
        }
    }

    const fetchTypeList = async () => {
        try {
            const response = await apiRequest('get', '/order/business-type/all');
            setTypeList(response.data.data);
        } catch (error) {
            console.log(error);
            message.error(error.response?.data?.message || 'Something went wrong');
        }
    }

    useEffect(() => {
        if (id) {
            setNextPageType(true);
            fetchData(id)
        }
        fetchTypeList();
    }, [])

    useEffect(() => {
        if (data.length === 0) return;
        const dataLanguage = data.filter((item) => item.languageId === language)[0];

        form.setFieldsValue({
            title: dataLanguage.title,
            subTitle: dataLanguage.subTitle,
            show: dataLanguage.show === '1' ? true : false,
            type: dataLanguage.type,
        });

    }, [language])

    return (
        <div className="mt-5 p-10 bg-white border rounded-lg">
            <Form layout="vertical" form={form}>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="image"
                            label="Image"
                            rules={[{ required: true, message: 'Please upload an image' }]}
                        >
                            <ImagePreviewUploader image={image} setImage={setImage} name="image" disabled={!isEditing} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24} className='flex justify-end gap-3'>
                        <span className='text-[15px]'>Hide</span>
                        <Switch
                            checked={active}
                            className='mx-2'
                            disabled={!isEditing}
                            onClick={() => setActive(!active)}
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
                                onChange={(value) => setLanguage(value)}
                                defaultValue={1}
                                disabled={!isEditing}
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
                            name="type"
                            label="Select Type"
                            rules={[{ required: true, message: 'Please select a type' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Select Type"
                                optionFilterProp="label"
                                disabled={!isEditing}
                                options={typeList.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                }))}
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
                            <Input placeholder="Enter title" disabled={!isEditing} />
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
                            <Input placeholder="Enter subtitle" disabled={!isEditing} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="status"
                            label="Type"
                        >
                            <Select
                                disabled={!isEditing}
                                placeholder="Select Status"
                                options={[
                                    { value: 'PT', label: 'PT' },
                                    { value: 'CV', label: 'CV' },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24} className='flex justify-center'>
                        <Button type="primary" className='bg-main' onClick={onNext} disabled={!nextPageType || !isEditing}>
                            Next Page
                        </Button>
                    </Col>
                </Row>

                <div className="mt-5 flex justify-end">
                    {isEditing ? (
                        <>
                            <Button type="default" className="mr-2" onClick={handleCancel}>Cancel</Button>
                            <Button type="primary" className='bg-main' onClick={handleSubmit}>Save</Button>
                        </>
                    ) : (
                        <Button type="primary" className='bg-main px-10 py-5' onClick={handleEdit}>Edit</Button>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default ServiceEditStep1;