import React from 'react'
import { userListColumns } from '../../components/ui/Table/columns/userList';
import { Button, Col, Row, Table, Input } from 'antd';
import { CustomPagination } from '../../components/ui/Table/CustomPagination';
import { PlusOutlined } from '@ant-design/icons';

const UserList = () => {

    const dataSource = [
        {
            key: '1',
            number: '1',
            nama: 'Tes',
            email: 'Tes',
            role: 'Tes',
        },
        {
            key: '2',
            number: '2',
            nama: 'Tes',
            email: 'Tes',
            role: 'Tes',
        },
        {
            key: '3',
            number: '3',
            nama: 'Tes',
            email: 'Tes',
            role: 'Tes',
        },
        {
            key: '4',
            number: '4',
            nama: 'Tes',
            email: 'Tes',
            role: 'Tes',
        },
        {
            key: '5',
            number: '5',
            nama: 'Tes',
            email: 'Tes',
            role: 'Tes',
        },
        {
            key: '6',
            number: '6',
            nama: 'Tes',
            email: 'Tes',
            role: 'Tes',
        },
        {
            
        }
    ];

    const columnsWithActions = [
        ...userListColumns,
        {
            title: 'Action',
            key: 'action',
            width: 300,
            render: (text, record) => (
                <span>
                    <Button type="link">Edit</Button>
                    <Button type="link">Delete</Button>
                </span>
            ),
        },
    ];

    return (
        <Row className="w-full">
            <Col span={24}>
                <div className="p-5 bg-white  rounded-lg">
                    <Row>
                        <Col span={24}>
                            <div className="flex flex-col">
                                <Row justify="space-between" align="middle" className="mb-4">
                                    <Col>
                                        <span className='text-2xl font-bold'>User Account List</span>
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
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default UserList