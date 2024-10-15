import { Col, Form, Input, Modal, Row, Select, Table, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { CustomPagination } from '../../../components/ui/Table/CustomPagination';
import Button from '../../../components/ui/Button/Button';
import { PlusOutlined } from '@ant-design/icons';
import { pengajuanOnGoingColumns } from '../../../components/ui/Table/columns/pengajuanOnGoing';
import { IoIosSearch } from 'react-icons/io';
import Loading from '../../../components/ui/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../utils/api';
import { CiEdit } from 'react-icons/ci';

const PengajuanFailed = () => {
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
            const response = await apiRequest('get', '/commission', {}, {
                page: pagination.page,
                perPage: pagination.perPage,
                where: search,
                orderBy: `${order.key}:${order.order}`,
                status: 'REJECT',
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
            const response = await apiRequest('PATCH', `/commission/${id}`, {
                status: values.status,
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
        ...pengajuanOnGoingColumns,
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
                                        initialValues={{ status: record.status }}
                                        onFinish={(values) => { handleEdit(record.id, values) }}
                                    >
                                        <Row>
                                            <Col span={24}>
                                                <Form.Item name="status" label="Status">
                                                    <Select value={"REJECT"}>
                                                        <Option value="PENDING">PENDING</Option>
                                                        <Option value="PROCESS">ON GOING</Option>
                                                        <Option value="FINISH">COMPLETE</Option>
                                                        <Option value="REJECT">REJECT</Option>
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
                                                <div className="text-[24px] text-main inline-block">Pengajuan Rejected</div>
                                                <br />
                                                <span className="text-[15px] inline-block mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="mt-5 p-5 bg-white border rounded-lg">
                                        <Row>
                                            <Col span={24}>
                                                <div className="flex flex-col">
                                                    <Row justify="space-between" align="middle" className="mb-4">
                                                        <Col>
                                                            <span className="text-[24px] inline-block">Completed</span>
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
                                                        </Col>
                                                    </Row>

                                                    <Table
                                                        dataSource={data}
                                                        columns={columnsWithActions}
                                                        pagination={{ pageSize: 10, position: ['bottomCenter'], showSizeChanger: true, style: { display: "none" } }}
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
    )
}

export default PengajuanFailed