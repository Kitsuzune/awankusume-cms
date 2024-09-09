import { Col, Input, Row, Select, Table } from 'antd'
import React from 'react'
import { CustomPagination } from '../../components/ui/Table/CustomPagination'
import { trackingColumns } from '../../components/ui/Table/columns/tracking';
import { PlusOutlined } from '@ant-design/icons';
import Button from '../../components/ui/Button/Button';

const Tracking = () => {
    const { Option } = Select;

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
            width: 300,
            render: (text, record) => (
                <span>
                    <Button type="link">Approve</Button>
                    <Button type="link">Reject</Button>
                    <Button type="link">Edit</Button>
                </span>
            ),
        },
    ];

    return (
        <Row className="w-full">
            <Col span={24}>
                <div className="p-5 rounded-lg">
                    <Row>
                        <Col span={24}>
                            <div className="flex flex-col">
                                <div className="mt-5 md:mt-10 mx-5 md:mx-10">
                                    <Row justify="space-between" align="middle" className="mb-4">
                                        <Col>
                                            <Select defaultValue="10" style={{ width: 120 }}>
                                                <Option value="10">On Going</Option>
                                                <Option>Complete</Option>
                                                <Option>Pending</Option>
                                            </Select>
                                        </Col>
                                        <Col className="flex gap-2">
                                            <Input.Search placeholder="Search..." />
                                            <Button type="primary">
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

                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default Tracking