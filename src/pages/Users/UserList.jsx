import React from 'react'
import { userListColumns } from '../../components/ui/Table/columns/userList';
import { Button, Col, Row, Table, Input } from 'antd';
import { CustomPagination } from '../../components/ui/Table/CustomPagination';
import { PlusOutlined } from '@ant-design/icons';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const navigate = useNavigate();

    const dataSource = [
        {
            key: '1',
            number: '1',
            nama: 'Tes',
            role: 'superadmin',
            createdAt: '2024-02-20',
        },
        {
            key: '2',
            number: '2',
            nama: 'Tes',    
            role: 'admin',
            createdAt: '2024-02-20',
        },
        {
            key: '3',
            number: '3',
            nama: 'Tes',
            role: 'makelar',
            createdAt: '2024-02-20',
        },
        {
            key: '4',
            number: '4',
            nama: 'Tes',
            role: 'user',
            createdAt: '2024-02-20',
        },
        {
            key: '5',
            number: '5',
            nama: 'Tes',
            email: 'Tes',
            role: 'contributor',
            createdAt: '2024-02-20',
        },
    ];

    const columnsWithActions = [
        ...userListColumns,
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (text, record) => (
                <div className='flex gap-2'>
                    <CiEdit className='text-2xl text-center text-second cursor-pointer hover:text-main'
                        onClick={() => {
                            navigate(`/app/users/${record.key}`)
                        }}
                    />
                    <CiTrash className='text-2xl text-center text-second cursor-pointer hover:text-main' />
                </div>
            ),
        },
    ];

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
                                            <div className='text-[30px] text-main inline-block'>User Management</div>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="mt-5 p-5 bg-white border rounded-lg">
                                    <Row>
                                        <Col span={24}>
                                            <div className="flex flex-col">

                                                <Row justify="space-between" align="middle" className="mb-4">
                                                    <Col>
                                                        <span className='text-[24px] inline-block'>List of Users</span>
                                                    </Col>
                                                    <Col className="flex gap-2">
                                                        <Input.Search placeholder="Search..." />
                                                        <Button type="primary" onClick={() => navigate('/app/users/add')}>
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
    )
}

export default UserList