import { Col, Form, Input, Modal, Row, Select, Table, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { CustomPagination } from '../../../components/ui/Table/CustomPagination';
import { trackingColumns } from '../../../components/ui/Table/columns/tracking';
import { PlusOutlined } from '@ant-design/icons';
import Button from '../../../components/ui/Button/Button';
import { CiApple, CiEdit, CiTrash } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/ui/Loading/Loading';
import { apiRequest } from '../../../utils/api';
import { EyeOutlined } from '@ant-design/icons';

const TrackingOnGoing = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, perPage: 10, totalData: 1 });
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState({
    key: 'id',
    order: 'desc',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiRequest('get', '/order', {}, {
        page: pagination.page,
        perPage: pagination.perPage,
        where: search,
        orderBy: `${order.key}:${order.order}`,
        status: 'PROCESS'
      });

      setData(
        response.data.data.map((item) => ({
          ...item,
          key: item.id,
        }))
      );

      setPagination({
        page: response.data.meta.currentPage,
        perPage: response.data.meta.perPage,
        totalData: response.data.meta.total,
      });
    } catch (error) {
      message.error(error.response?.data?.message || 'Error fetching data');
    }
    setLoading(false);
  };

  const handleEdit = async (id, values) => {
    setLoading(true);
    try {
      const response = await apiRequest('patch', `/order/${id}`, {
        status: values.status || undefined,
        paymentStatus: values.paymentStatus || undefined,
      });
      if (response.status === 200) {
        message.success('Data Updated');
        fetchData();
        Modal.destroyAll()
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Error updating data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pagination.page, pagination.perPage, search]);

  const columnsWithActions = [
    ...trackingColumns,
    {
      title: 'Action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (text, record) => (
        <div className="flex justify-center items-center gap-2">
          <CiEdit
            className="text-2xl text-center text-second cursor-pointer hover:text-main"
            onClick={() => {
              Modal.info({
                title: 'Edit Data',
                centered: true,
                content: (
                  <Form
                    form={form}
                    initialValues={{ status: record.status, paymentStatus: record.paymentStatus }}
                    onFinish={(values) => handleEdit(record.id, values)}
                  >
                    <Row>
                      <Col span={24}>
                        <Form.Item name="status" label="Status">
                          <Select value={"PROCESS"}>
                            <Option value="PENDING">PENDING</Option>
                            <Option value="PROCESS">ON GOING</Option>
                            <Option value="FINISH">FINISH</Option>
                            <Option value="CANCEL">FAILED</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item name="paymentStatus" label="Payment Status">
                          <Select value={record.paymentStatus}>
                            <Option value="FULL_PAYMENT">FULL PAYMENT</Option>
                            <Option value="FRONTEND_PAYMENT">FRONTEND PAYMENT</Option>
                            <Option value="UNPAID">UNPAID</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <div className="mt-5 flex justify-end">
                      <Button
                        type="default"
                        className="mr-2"
                        onClick={() => {
                          form.resetFields();
                          Modal.destroyAll();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="primary" htmlType="submit" className="bg-main">
                        Save
                      </Button>
                    </div>
                  </Form>
                ),
                footer: null,
              });
            }}
          />

          <EyeOutlined
            className="text-2xl text-center text-second cursor-pointer hover:text-main"
            onClick={() => {
              navigate(`/app/tracking/form-order/${record.id}`);
            }}
          />

          {/* <CiTrash
            className="text-2xl text-center text-second cursor-pointer hover:text-main"
            onClick={() => {
              Modal.info({
                title: 'Delete Data',
                centered: true,
                content: (
                  <React.Fragment>
                    <div>Are you sure you want to delete this data?</div>
                    <div className="mt-5 flex justify-end">
                      <Button
                        type="default"
                        className="mr-2"
                        onClick={() => {
                          Modal.destroyAll();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        className="bg-main"
                        onClick={() => handleDelete(record.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </React.Fragment>
                ),
                footer: null,
              });
            }}
          /> */}
        </div>
      ),
    },

  ];

  return (
    <React.Fragment>
      <Row className="w-full">
        <Col span={24}>
          <div className="rounded-lg">
            <Row>
              <Col span={24}>
                <div className="flex flex-col">
                  <div className="bg-white p-5 rounded-lg">
                    <Row>
                      <Col span={24}>
                        <div className="text-[24px] text-main inline-block">Tracking On Going</div>
                        <br />
                        <span className="text-[15px] inline-block mt-5">Tracking On Going data</span>
                      </Col>
                    </Row>
                  </div>

                  <div className="mt-5 p-5 bg-white border rounded-lg">
                    <Row>
                      <Col span={24}>
                        <div className="flex flex-col">
                          <Row justify="space-between" align="middle" className="mb-4">
                            <Col>
                              <span className="text-[24px] inline-block">On Going</span>
                            </Col>
                            <Col className="flex gap-2">
                              <Input.Search placeholder="Search..."
                                onSearch={(value) => {
                                  setSearch(value);
                                  setPagination({
                                    ...pagination,
                                    page: 1,
                                  });
                                }}
                              />
                              <Button
                                type="primary"
                                onClick={() => {
                                  navigate('form-order');
                                }}
                              >
                                Add New
                                <PlusOutlined />
                              </Button>
                            </Col>
                          </Row>

                          <Table
                            dataSource={data}
                            columns={columnsWithActions}
                            pagination={false}
                            bordered
                            scroll={{ x: 768 }}
                          />
                          <CustomPagination
                            data={data}
                            pagination={pagination}
                            changeLimit={(perPage) => {
                              setPagination({
                                ...pagination,
                                perPage,
                              });
                            }}
                            changePage={(page) => {
                              setPagination({
                                ...pagination,
                                page,
                              });
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Loading loading={loading} />
    </React.Fragment>
  );
};

export default TrackingOnGoing;
