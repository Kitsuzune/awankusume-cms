import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Input, Form, Tag, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineContentCopy } from 'react-icons/md';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { CustomPagination } from '../../components/ui/Table/CustomPagination';

const FaqNew = () => {
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({ page: 1, perPage: 10, totalData: 1 });
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState({
        key: 'id',
        order: 'desc',
    });


    const data = [
        {
            id: 1,
            title: 'What is Lorem Ipsum?',
            subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            question: 'What is Lorem Ipsum?',
            answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            show: 1,
        },
        {
            id: 2,
            title: 'What is Lorem Ipsum?',
            subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            question: 'What is Lorem Ipsum?',
            answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            show: 1,
        },

    ];

    const columnsWithActions = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => (
                <div className='cursor-pointer'>
                    {text}
                </div>
            ),
        },
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
                            navigate(`/app/content/our-client/${record.uuid}`)
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