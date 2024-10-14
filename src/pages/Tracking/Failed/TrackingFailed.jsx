import { Col, Form, Input, Modal, Row, Select, Table } from 'antd'
import React, { useState } from 'react'
import { CustomPagination } from '../../../components/ui/Table/CustomPagination'
import { trackingColumns } from '../../../components/ui/Table/columns/tracking';
import { PlusOutlined } from '@ant-design/icons';
import Button from '../../../components/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/ui/Loading/Loading';
import { CiEdit, CiTrash } from 'react-icons/ci';

const TrackingFailed = () => {
    const { Option } = Select;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm()

    const dataSource = [
        {
            key: '1',
            number: '1',
            nama: 'Tes',
            serialCode: 'Tes',
            badanUsaha: 'Lorem',
            jenisLegalitas: 'Lorem',
        },
        {
            key: '2',
            number: '2',
            nama: 'Tes',
            serialCode: 'Tes',
            badanUsaha: 'Lorem',
            jenisLegalitas: 'Lorem',
        },
        {
            key: '3',
            number: '3',
            nama: 'Tes',
            serialCode: 'Tes',
            badanUsaha: 'Lorem',
            jenisLegalitas: 'Lorem',
        },
        {
            key: '4',
            number: '4',
            nama: 'Tes',
            serialCode: 'Tes',
            badanUsaha: 'Lorem',
            jenisLegalitas: 'Lorem',
        },
    ];

    const columnsWithActions = [
        ...trackingColumns,
        {
            title: 'Action',
            key: 'action',
            width: 100,
            align: 'center',
            render: (text, record) => (
                <div className="flex justify-center items-center gap-2">
                    <CiEdit className="text-2xl text-center text-second cursor-pointer hover:text-main"
                        onClick={() => {
                            Modal.info({
                                title: 'Edit Data',
                                centered: true,
                                content: (
                                    <Form form={form}>
                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="status"
                                                    label="Status"
                                                >
                                                    <Select defaultValue="CANCEL">
                                                        <Select.Option value="PENDING">PENDING</Select.Option>
                                                        <Select.Option value="PROCESS">ON GOING</Select.Option>
                                                        <Select.Option value="FINISH">FINISH</Select.Option>
                                                        <Select.Option value="CANCEL">FAILED</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <div className="mt-5 flex justify-end">
                                            <Button type="default" className="mr-2" onClick={() => {
                                                form.resetFields()
                                                Modal.destroyAll()
                                                }}
                                            >Cancel</Button>
                                            <Button type="primary" className='bg-main'>Save</Button>
                                        </div>
                                    </Form>
                                ),
                                footer: null
                            });
                        }}
                    />
                    <CiTrash className="text-2xl text-center text-second cursor-pointer hover:text-main" 
                        onClick={() => {
                            Modal.info({
                                title: 'Delete Data',
                                centered: true,
                                content: (
                                    <React.Fragment>
                                        <div>Are you sure want to delete this data?</div>
                                        <div className="mt-5 flex justify-end">
                                            <Button type="default" className="mr-2" onClick={() => {
                                                Modal.destroyAll()
                                            }}>Cancel</Button>
                                            <Button type="primary" className='bg-main'>Delete</Button>
                                        </div>
                                    </React.Fragment>
                                ),
                                footer: null
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
                                                <div className="text-[24px] text-main inline-block">Tracking Failed</div>
                                                <br />
                                                <span className="text-[15px] inline-block mt-5">Tracking failed data</span>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="mt-5 p-5 bg-white border rounded-lg">
                                        <Row>
                                            <Col span={24}>
                                                <div className="flex flex-col">
                                                    <Row justify="space-between" align="middle" className="mb-4">
                                                        <Col>
                                                            <span className="text-[24px] inline-block">Failed</span>
                                                        </Col>
                                                        <Col className="flex gap-2">
                                                            <Input.Search placeholder="Search..." />
                                                            <Button type="primary" onClick={() => {
                                                                window.location.href = 'form-order'
                                                            }}>
                                                                Add New
                                                                <PlusOutlined />
                                                            </Button>
                                                        </Col>
                                                    </Row>

                                                    <Table
                                                        dataSource={dataSource}
                                                        columns={columnsWithActions}
                                                        pagination={{ pageSize: 10, position: ['bottomCenter'], showSizeChanger: true, style: { display: "none" } }}
                                                        bordered
                                                        scroll={{ x: 768 }}
                                                    />
                                                    <CustomPagination
                                                        data={dataSource}
                                                        pagination={{ page: 1, perPage: 10, totalData: 1 }}
                                                        changeLimit={() => { }}
                                                        changePage={() => { }}
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

export default TrackingFailed