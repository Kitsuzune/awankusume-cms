import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Input, Form, Tag, Table, message } from 'antd';
import ImagePreviewUploader from '../../../components/ui/File Upload/ImagePreview';
import { CustomPagination } from '../../../components/ui/Table/CustomPagination';
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineContentCopy } from 'react-icons/md';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../utils/api';

const Service = () => {
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
            const response = await apiRequest('get', '/content/service-content', {}, {
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

    useEffect(() => {
        fetchData();
    }, [pagination.page, pagination.perPage, search]);

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
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => (
                <div className="cursor-pointer">
                    <img src={`${process.env.REACT_APP_API_URL_CSM}/public/service/${text}`} alt="image" className="w-40 h-20 object-cover" />
                </div>
            ),
        },
        {
            title: 'desain',
            dataIndex: 'desain',
            key: 'desain',
            render: (text, record) => (
                <div className='cursor-pointer'>
                    {text?.name}
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
                            navigate(`/app/content/service/${record.key}`)
                        }}
                    />
                    <CiTrash className='text-2xl text-center text-second cursor-pointer hover:text-main' />
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
                                            <div className='text-[24px] text-main inline-block'>Service</div>
                                            <br />
                                            <span className='text-[15px] inline-block mt-5'>Everything is in your control, give the best service</span>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="mt-5 p-5 bg-white border rounded-lg">
                                    <Row>
                                        <Col span={24}>
                                            <div className="flex flex-col">

                                                <Row justify="space-between" align="middle" className="mb-4">
                                                    <Col>
                                                        <span className='text-[24px] inline-block'>List Service</span>
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
                                                        <Button type="primary">
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

export default Service