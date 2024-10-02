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
                        name="customer"
                        label="Customer :"
                        rules={[{ required: true, message: 'Please enter the customer name' }]}
                      >
                        <Input placeholder="Enter the customer name" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="makelar"
                        label="Makelar :"
                        rules={[{ required: true, message: 'Please enter the makelar name' }]}
                      >
                        <Input placeholder="Enter the makelar name" />
                      </Form.Item>
                    </Col>
                  </Row>

                  {serviceType === 'pendirianPerusahaan' && (
                    <LegalitasPP />
                  )}

                  {serviceType === 'izinBisnis' && (
                    <IzinBisnis />
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