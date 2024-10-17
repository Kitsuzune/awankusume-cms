import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Form, Select, message, Modal } from 'antd';
import ImagePreviewUploader from '../../../components/ui/File Upload/ImagePreview';
import Flag from 'react-world-flags';
import { apiRequest } from '../../../utils/api';
import Loading from '../../../components/ui/Loading/Loading';
import VideoPreviewUploader from './../../../components/ui/File Upload/VideoPreview';

const Showcase = () => {
  const [video, setVideo] = useState(null);
  const [videoCurrent, setVideoCurrent] = useState(null);
  const [data, setData] = useState([])
  const [language, setLanguage] = useState(1);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiRequest('get', '/content/showcase');
      setData(response.data.data)

      const dataLanguage = response.data.data.filter((item) => item.languageId === language)[0];

      form.setFieldsValue({
        title: dataLanguage.title,
        subTitle: dataLanguage.subTitle,
        video: dataLanguage.image,  
      });

      setVideo(`${import.meta.env.REACT_APP_API_URL_CSM}/public/showcase/${dataLanguage.image}`);
      setVideoCurrent(`${import.meta.env.REACT_APP_API_URL_CSM}/public/showcase/${dataLanguage.image}`);

      setLoading(false);
    } catch (error) {
      message.error(error.response.data.message ? error.response.data.message : 'Server Unreachable, Please Check Your Internet Connection');
      setLoading(false);
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    const dataLanguage = data.filter((item) => item.languageId === language)[0];
    form.setFieldsValue({
      title: dataLanguage.title,
      subTitle: dataLanguage.subTitle,
      video: dataLanguage.image,
    });
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const fileToSend = video !== videoCurrent ? video : undefined;

      const response = await apiRequest('PATCH', `/content/showcase/${language}`, {
        title: form.getFieldValue('title'),
        subTitle: form.getFieldValue('subTitle'),
        file: fileToSend
      });

      if (response.status === 200) {
        Modal.success({
          title: 'Success',
          content: 'Data has been updated',
          centered: true,
        });

        fetchData();
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message ? error.response?.data?.message : 'Error While Updating Data');
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data.length === 0) return;
    const dataLanguage = data.filter((item) => item.languageId === language)[0];

    form.setFieldsValue({
      title: dataLanguage.title,
      subTitle: dataLanguage.subTitle,
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
                        <div className='text-[24px] text-main inline-block'>Showcase</div>
                        <br />
                        <span className='text-[15px] inline-block mt-5'>Display your best projects and achievements right on the landing page. Let your work speak for itself with a visually stunning showcase</span>
                      </Col>
                    </Row>
                  </div>

                  <div className="mt-5 p-10 bg-white border rounded-lg">
                    <Form layout="vertical" form={form}>
                      <Row>
                        <Col span={24}>
                          <Form.Item
                            name="video"
                            label="Video"
                            rules={[{ required: true, message: 'Please upload a video' }]}
                          >
                            <VideoPreviewUploader video={video} setVideo={setVideo} name="video" disabled={!isEditing} />
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
                              disabled={!isEditing}
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
                            <Input
                              placeholder="Enter title"
                              disabled={!isEditing}
                            />
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
                            <Input
                              placeholder="Enter subtitle"
                              disabled={!isEditing}
                            />
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

export default Showcase;
