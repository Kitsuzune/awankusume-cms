import React, { useState } from 'react';
import { Row, Col, Button, Input, Form, Select } from 'antd';
import ImagePreviewUploader from '../../../components/ui/File Upload/ImagePreview';
import Flag from 'react-world-flags';

const Showcase = () => {
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
                      <div className='text-[24px] text-main inline-block'>Showcase</div>
                      <br />
                      <span className='text-[15px] inline-block mt-5'>Display your best projects and achievements right on the landing page. Let your work speak for itself with a visually stunning showcase</span>
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
                          name="subTitle"
                          label="Sub Title"
                          rules={[{ required: true, message: 'Please enter a sub title' }]}
                        >
                          <Input placeholder="Enter subtitle" />
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

export default Showcase;