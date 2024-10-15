import React, { useState, useEffect } from 'react';
import { userListColumns } from '../../components/ui/Table/columns/userList';
import { Button, Col, Row, Table, Input, message, Modal } from 'antd';
import { CustomPagination } from '../../components/ui/Table/CustomPagination';
import { PlusOutlined } from '@ant-design/icons';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../utils/api';

const UserList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, perPage: 10, totalData: 1 });
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState({
        key: 'id',
        order: 'desc',
    });

    const fetchData = async () => {
        try {
            const response = await apiRequest('GET', '/user', {}, {
                page: pagination.page,
                perPage: pagination.perPage,
                where: search,
                orderBy: `${order.key}:${order.order}`,
            });

            setData(response.data.data.map((item) => ({
                ...item,
                key: item.id,
            })));

            setPagination({
                page: response.data.meta.currentPage,
                perPage: response.data.meta.perPage,
                totalData: response.data.meta.total,
            });
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

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
                    <CiTrash className="text-2xl text-center text-second cursor-pointer hover:text-main"
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
                    />
                </div>
            ),
        },
    ];

    const handleDelete = async (id) => {
        try {
            await apiRequest('delete', `/user/${id}`);
            fetchData();
            message.success('Data deleted successfully');
            Modal.destroyAll();
        } catch (error) {
            message.error(error.response?.data?.message ? error.response?.data?.message : 'Error While Deleting Data');
        }
    };

    useEffect(() => {
        fetchData();
    }, [pagination.page, pagination.perPage, search]);


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
                                                        <Input.Search placeholder="Search..."
                                                            onSearch={(value) => {
                                                                setSearch(value);
                                                                setPagination({
                                                                    ...pagination,
                                                                    page: 1,
                                                                });
                                                            }}
                                                        />
                                                        <Button type="primary" onClick={() => navigate('/app/users/add')}>
                                                            Add New
                                                            <PlusOutlined />
                                                        </Button>
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
    )
}

export default UserList