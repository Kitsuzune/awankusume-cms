import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Input, Form, Tag, Table, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineContentCopy } from 'react-icons/md';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { CustomPagination } from '../../components/ui/Table/CustomPagination';
import { apiRequest } from '../../utils/api';

const FaqNew = () => {
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({ page: 1, perPage: 10, totalData: 1 });
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState({
        key: 'id',
        order: 'desc',
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await apiRequest('get', '/content/faq', {}, {
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

            setLoading(false);

        } catch (error) {
            setLoading(false);
            message.error(error.response?.data?.message ? error.response?.data?.message : 'Error While Fetching Data');
        }
    };

    useEffect(() => {
        fetchData();
    }, [pagination.page, pagination.perPage, search]);

    const handleDelete = async (uuid) => {
        try {
            await apiRequest('delete', `/content/faq/${uuid}`);
            fetchData();
            message.success('Data deleted successfully');
            Modal.destroyAll();
        } catch (error) {
            message.error(error.response?.data?.message ? error.response?.data?.message : 'Error While Deleting Data');
        }
    };

    const columnsWithActions = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <div className='cursor-pointer'>
                    {text}
                </div>
            ),
        },
        {
            title: 'Sub Title',
            dataIndex: 'subTitle',
            key: 'subTitle',
            render: (text, record) => (
                <div className='cursor-pointer'>
                    {text}
                </div>
            ),
        },
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            render: (text, record) => (
                <div className='cursor-pointer'>
                    {text}
                </div>
            ),
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            key: 'answer',
            render: (text, record) => (
                <div className='cursor-pointer'>
                    {text}
                </div>
            ),
        },
        {
            title: 'Show',
            dataIndex: 'show',
            key: 'show',
            width: 300,
            align: 'center',
            render: (text, record) => (
                <>
                    {/* {record.status ? <Tag color="green">Show</Tag> : <Tag color="red">Hide</Tag>} */}
                    {record.show === 1 ?
                        // <Tag color="green">Show</Tag> 
                        <div className='flex justify-center items-center cursor-pointer'>
                            <div className='bg-main text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-main/80 transition-all duration-300'>
                                Show
                            </div>
                        </div>
                        :
                        // <Tag color="red">Hide</Tag>
                        <div className='flex justify-center items-center cursor-pointer'>
                            <div className='bg-second text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-second/80 transition-all duration-300'>
                                Hide
                            </div>
                        </div>
                    }
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (text, record) => (
                <div className='flex gap-2'>
                    <CiEdit className='text-2xl text-center text-second cursor-pointer hover:text-main'
                        onClick={() => {
                            navigate(`/app/faq/${record.uuid}`)
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
                                                onClick={() => handleDelete(record.uuid)}
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
    ]

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
                                            <div className='text-[24px] text-main inline-block'>Frequently Asked Questions (FAQ)</div>
                                            <br />
                                            <span className='text-[15px] inline-block mt-5'>Display your best FAQ on the landing page</span>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="mt-5 p-5 bg-white border rounded-lg">
                                    <Row>
                                        <Col span={24}>
                                            <div className="flex flex-col">

                                                <Row justify="space-between" align="middle" className="mb-4">
                                                    <Col>
                                                        <span className='text-[24px] inline-block'>List FAQ</span>
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
                                                        <Button type="primary"
                                                            onClick={() => {
                                                                navigate(`/app/faq/add`)
                                                            }}>
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

export default FaqNew