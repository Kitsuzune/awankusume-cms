import { Col, Form, Input, Row, Select } from 'antd'
import React, { useEffect, useState, useCallback } from 'react'
import Button from '../../../components/ui/Button/Button';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { CustomPagination } from '../../../components/ui/Table/CustomPagination';
import { apiRequest } from '../../../utils/api';
import debounce from 'lodash/debounce';
import LegalitasPP from './FormGrouping/Create/PendirianPerusahaan/LegalitasPP';
import IzinBisnis from './FormGrouping/Create/IzinBisnis/IzinBisnis';

const FormOrder = () => {
  const { Option } = Select;
  const [serviceType, setServiceType] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [makelarId, setMakelarId] = useState(null);
  const [search, setSearch] = useState('');
  const [searchMakelar, setSearchMakelar] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const [makelarList, setMakelarList] = useState([]);

  const fetchCustomer = async (value = '') => {
    try {
      const response = await apiRequest('GET', `/user/by/role`, {}, { role: 'CUSTOMER', search: value });

      if (response.status === 200) {
        setCustomerList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchMakelar = async (value = '') => {
    try {
      const response = await apiRequest('GET', `/user/by/role`, {}, { role: 'MAKELAR', search: value });

      if (response.status === 200) {
        setMakelarList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const debouncedFetchCustomer = useCallback(debounce(fetchCustomer, 300), []);
  const debouncedFetchMakelar = useCallback(debounce(fetchMakelar, 300), []);

  useEffect(() => {
    debouncedFetchCustomer(search);
  }, [search, debouncedFetchCustomer]);

  useEffect(() => {
    debouncedFetchMakelar(searchMakelar);
  }, [searchMakelar, debouncedFetchMakelar]);


  const handleServiceTypeChange = (value) => {
    setServiceType(value);
  };

  return (
    <Row className="w-full">
      <Col span={24}>
        <Row>
          <Col span={24}>
            <div className="bg-white p-5 rounded-lg">
              <Row>
                <Col span={24}>
                  <div className="text-[24px] text-main inline-block">Form Order</div>
                  <br />
                  <span className="text-[15px] inline-block mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span>
                </Col>
              </Row>
            </div>

            <div className="mt-5 flex flex-col border rounded-lg">
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
                      >
                        <Select
                          showSearch
                          placeholder="Select a customer"
                          options={customerList.map((customer) => ({
                            value: customer.id,
                            label: customer.email
                          }))}
                          allowClear
                          value={search}
                          optionFilterProp='label'
                          onSearch={(value) => setSearch(value)}
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
                      >
                        <Select
                          showSearch
                          allowClear
                          placeholder="Select a makelar"
                          options={makelarList.map((makelar) => ({
                            value: makelar.id,
                            label: makelar.email
                          }))}
                          value={searchMakelar}
                          optionFilterProp='label'
                          onSearch={(value) => setSearchMakelar(value)}
                          onChange={(value) => setMakelarId(value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  {serviceType === 'pendirianPerusahaan' && (
                    <LegalitasPP customerId={customerId} makelarId={makelarId} />
                  )}

                  {serviceType === 'izinBisnis' && (
                    <IzinBisnis customerId={customerId} makelarId={makelarId} />
                  )}

                  {/* {serviceType && (
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
                  )} */}
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