import { Col, Form, Input, Row, Select } from 'antd'
import React, { useState } from 'react'
import Button from '../../../components/ui/Button/Button';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { CustomPagination } from '../../../components/ui/Table/CustomPagination';
import LegalitasPP from './FormGrouping/PendirianPerusahaan/LegalitasPP';
import IzinBisnis from './FormGrouping/IzinBisnis/IzinBisnis';

const FormOrder = () => {
  const { Option } = Select;
  const [serviceType, setServiceType] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [makelarId, setMakelarId] = useState(null);

  const handleServiceTypeChange = (value) => {
    setServiceType(value);
  };

  return (
    <Row className="w-full">
      <Col span={24}>
        <Row>
          <Col span={24}>
            <div className="flex flex-col">
              <div className='bg-white px-10 py-5 rounded-lg'>
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="serviceType"
                        label="Service Type :"
                        rules={[{ required: true, message: 'Please select a service type' }]}
                      >
                        <Select
                          placeholder="Select a service type"
                          onChange={handleServiceTypeChange}
                        >
                          <Option value="pendirianPerusahaan">Pendirian Perusahaan</Option>
                          <Option value="izinBisnis">Izin Bisnis</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="customerId"
                        label="Customer :"
                        rules={[{ required: true, message: 'Please enter the customer name' }]}
                      >
                        <Select 
                          showSearch
                          placeholder="Select a customer"
                          options={[
                            {
                              value: '1',
                              label: 'Customer 1'
                            },
                            {
                              value: '2',
                              label: 'Customer 2'
                            }
                          ]}
                          onChange={(value) => setCustomerId(value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="makelarId"
                        label="Makelar :"
                        rules={[{ required: true, message: 'Please enter the makelar name' }]}
                      >
                        <Select 
                          showSearch
                          placeholder="Select a makelar"
                          options={[
                            {
                              value: '1',
                              label: 'Makelar 1'
                            },
                            {
                              value: '2',
                              label: 'Makelar 2'
                            }
                          ]}
                          onChange={(value) => setMakelarId(value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  {serviceType === 'pendirianPerusahaan' && (
                    <LegalitasPP />
                  )}

                  {serviceType === 'izinBisnis' && (
                    <IzinBisnis customerId={customerId} makelarId={makelarId} />
                  )}

                  {serviceType && (
                    <Row justify="end" gutter={16} className="mt-4">
                      <Col>
                      <Button>
                        Cancel
                      </Button>
                    </Col>
                    <Col>
                      <Button type="primary" className='bg-main'>
                        Confirm
                      </Button>
                      </Col>
                    </Row>
                  )}
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default FormOrder