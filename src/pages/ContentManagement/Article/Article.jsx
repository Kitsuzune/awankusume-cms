import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Select, Switch } from 'antd';
import Loading from '../../../components/ui/Loading/Loading';

const Article = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
                            name="label"
                            label="Label"
                            rules={[{ required: true, message: 'Please enter a label' }]}
                          >
                            {/* <Input placeholder="Enter label" /> */}
                            <Select
                              showSearch
                              allowClear
                              placeholder="Select a label"
                              optionFilterProp='label'
                              options={[
                                { value: 'label1', label: 'Label 1' },
                                { value: 'label2', label: 'Label 2' },
                              ]}
                            />
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
      <Loading isLoading={loading} />
    </>
  )
}

export default Article