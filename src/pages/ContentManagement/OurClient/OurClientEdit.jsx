import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Form, Switch, Select, message, Modal } from 'antd';
import ImagePreviewUploader from '../../../components/ui/File Upload/ImagePreview';
import { useParams, useLocation } from 'react-router-dom';
import Flag from 'react-world-flags';
import Loading from '../../../components/ui/Loading/Loading';
import { apiRequest } from '../../../utils/api';
import { useNavigate } from 'react-router-dom';

const OurClientEdit = () => {
    const [id, setId] = useState(useParams().id);
    const [image, setImage] = useState(null);
    const [imageCurrent, setImageCurrent] = useState(null);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [language, setLanguage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(location.state?.edit || false);

    const fetchData = async (localId) => {
        try {
            setLoading(true);
            const response = await apiRequest('get', `/content/ourclient/${localId}`);
            setData(response.data.data)

            const dataLanguage = response.data.data.filter((item) => item.languageId === language)[0];

            form.setFieldsValue({
                name: dataLanguage.name,
                description: dataLanguage.description,
                hastag: dataLanguage.hastag,
                link: dataLanguage.link,
                show: dataLanguage.show == '1' ? true : false,
            });

            setActive(dataLanguage.show == '1' ? true : false);
            setImage(`${process.env.REACT_APP_API_URL_CSM}/public/ourClient/${dataLanguage.image}`);
            setImageCurrent(`${process.env.REACT_APP_API_URL_CSM}/public/ourClient/${dataLanguage.image}`);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error(error.response?.data?.message ? error.response?.data?.message : 'Server Unreachable, Please Check Your Internet Connection');
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const dataLanguage = data.filter((item) => item.languageId === language)[0];

            const fileToSend = image !== imageCurrent ? image : undefined;

            const sendData = {
                name: form.getFieldValue('name'),
                description: form.getFieldValue('description'),
                hastag: form.getFieldValue('hastag'),
                link: form.getFieldValue('link'),
                show: active ? '1' : '0',
            }

            if (fileToSend) {
                sendData.file = fileToSend;
            }

            let response;

            if (id) {
                response = await apiRequest('PATCH', `/content/ourclient/${dataLanguage.id}`, sendData);
            } else {
                response = await apiRequest('POST', `/content/ourclient`, sendData);
            }

            setLoading(false);

            if (response.status === 200) {
                Modal.success({
                    title: 'Success',
                    content: 'Data has been updated',
                    centered: true,
                });

                let newUuid = null;
                if (!id) {
                    newUuid = response.data.data[0].uuid;
                    navigate('/app/content/our-client/' + newUuid);
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

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [])

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        navigate(0);
    };

    useEffect(() => {
        if (data.length === 0) return;
        const dataLanguage = data.filter((item) => item.languageId === language)[0];

        form.setFieldsValue({
            name: dataLanguage.name,
            description: dataLanguage.description,
            hastag: dataLanguage.hastag,
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
                                                    {/* Our Client / {id} */}
                                                    {id ? 'Our Client / ' + id : 'Add New Client'}
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
                                                        <ImagePreviewUploader image={image} setImage={setImage} name="image" disabled={!isEditing} />
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
                                                        <Switch
                                                            checked={active}
                                                            className='mx-2'
                                                            disabled={!isEditing}
                                                            onClick={() => setActive(!active)}
                                                        />
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
                                                        name="name"
                                                        label="Name"
                                                        rules={[{ required: true, message: 'Please enter a name' }]}
                                                    >
                                                        <Input placeholder="Enter name" disabled={!isEditing} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name="description"
                                                        label="Description"
                                                        rules={[{ required: true, message: 'Please enter a description' }]}
                                                    >
                                                        <Input.TextArea placeholder="Enter description" disabled={!isEditing} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name="hastag"
                                                        label="Hashtag"
                                                        rules={[{ required: true, message: 'Please enter a hashtag' }]}
                                                    >
                                                        <Input placeholder="Enter hashtag" disabled={!isEditing} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name="link"
                                                        label="Link"
                                                        rules={[{ required: true, message: 'Please enter a URL' }]}
                                                    >
                                                        <Input placeholder="Enter URL" disabled={!isEditing} />
                                                    </Form.Item>
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

export default OurClientEdit;