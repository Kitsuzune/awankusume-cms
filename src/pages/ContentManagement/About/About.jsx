import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Form, Tag, Table, message, Modal } from 'antd';
import ImagePreviewUploader from '../../../components/ui/File Upload/ImagePreview';
import { CustomPagination } from '../../../components/ui/Table/CustomPagination';
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineContentCopy } from 'react-icons/md';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../utils/api';
import Loading from '../../../components/ui/Loading/Loading';

const About = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, perPage: 10, totalData: 1 });
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState({
        key: 'id',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await apiRequest('get', '/content/about', {}, {
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
            await apiRequest('delete', `/content/about/${uuid}`);
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
                <div className="cursor-pointer" onClick={() => {
                    navigate(`/app/content/about/${record.uuid}`);
                }}>
                    {text}
                </div>
            ),
        },
        {
            title: 'Sub Title',
            dataIndex: 'subTitle',
            key: 'subTitle',
            render: (text, record) => (
                <div className="cursor-pointer" onClick={() => {
                    navigate(`/app/content/about/${record.uuid}`);
                }}>
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
                    <img src={`${import.meta.env.REACT_APP_API_URL_CSM}/public/about/${text}`} alt="image" className="w-40 h-20 object-cover" />
                </div>
            ),
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (text, record) => (
                <div className="cursor-pointer" onClick={() => {
                    navigate(`/app/content/about/${record.uuid}`);
                }}>
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
                <div className="flex justify-center items-center cursor-pointer">
                    {record.show === 1 ? (
                        <div className="bg-main text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-main/80 transition-all duration-300">
                            Show
                        </div>
                    ) : (
                        <div className="bg-second text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-second/80 transition-all duration-300">
                            Hide
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            align: 'center',
            render: (text, record) => (
                <div className="flex justify-center items-center gap-2">
                    <CiEdit className="text-2xl text-center text-second cursor-pointer hover:text-main"
                        onClick={() => {
                            navigate(`/app/content/about/${record.uuid}`, { state: { edit: true } });
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
                                                <div className="text-[24px] text-main inline-block">About</div>
                                                <br />
                                                <span className="text-[15px] inline-block mt-5">Everything is in your control, Tell me about your company</span>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="mt-5 p-5 bg-white border rounded-lg">
                                        <Row>
                                            <Col span={24}>
                                                <div className="flex flex-col">
                                                    <Row justify="space-between" align="middle" className="mb-4">
                                                        <Col>
                                                            <span className="text-[24px] inline-block">Editable About Section</span>
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
                                                                    navigate(`/app/content/about/add`);
                                                                }}>
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
            <Loading isLoading={loading} />
        </React.Fragment>
    );
};

export default About;
