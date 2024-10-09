import React from 'react'
import { Row, Col, Button, Input, Form, Tag, Table } from 'antd';
import ImagePreviewUploader from '../../../components/ui/File Upload/ImagePreview';
import { CustomPagination } from '../../../components/ui/Table/CustomPagination';
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineContentCopy } from 'react-icons/md';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const Service = () => {
    const navigate = useNavigate();

    const dataSource = [
        {
            key: '1',
            number: '1',
            name: 'Lorem',
            status: true
        },
        {
            key: '2',
            number: '2',
            name: 'Lorem',
            status: false
        },
        {
            key: '3',
            number: '3',
            name: 'Lorem',
            status: true
        },
        {
            key: '4',
            number: '4',
            name: 'Lorem',
            status: false
        },
    ]

    const columnsWithActions = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className='cursor-pointer'>
                    {text}
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 300,
            align: 'center',
            render: (text, record) => (
                <>
                    {/* {record.status ? <Tag color="green">Show</Tag> : <Tag color="red">Hide</Tag>} */}
                    {record.status ?
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
                                            <span className='text-[15px] inline-block mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span>
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

                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default Service