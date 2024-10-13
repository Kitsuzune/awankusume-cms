import { Col, Input, message, Row, Select, Table } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import Button from '../../components/ui/Button/Button';
import { trackingColumns } from '../../components/ui/Table/columns/tracking';
import { CustomPagination } from '../../components/ui/Table/CustomPagination';
import { MdOutlineContentCopy } from 'react-icons/md';
import Loading from '../../components/ui/Loading/Loading';

const ShareAuth = () => {
    const { Option } = Select;
    const [loading, setLoading] = useState(false);

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
                    <MdOutlineContentCopy className='text-2xl text-center text-second cursor-pointer hover:text-main'
                        onClick={() => {
                            navigator.clipboard.writeText(record.serialCode);
                            message.success(`Copied ${record.serialCode} to clipboard`);
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
                                                <div className="text-[24px] text-main inline-block">Share Auth</div>
                                                <br />
                                                <span className="text-[15px] inline-block mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="mt-5 p-5 bg-white border rounded-lg">
                                        <Row>
                                            <Col span={24}>
                                                <div className="flex flex-col">
                                                    <Row justify="space-between" align="middle" className="mb-4">
                                                        <Col>
                                                            <span className="text-[24px] inline-block">Share Auth</span>
                                                        </Col>
                                                        <Col className="flex gap-2">
                                                            <Input.Search placeholder="Search..." />
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
                                {/* <div className="flex flex-col">
                                <div className="mt-5 md:mt-10 mx-5 md:mx-10">
                                    <Row justify="space-between" align="middle" className="mb-4">
                                        <Col>
                                            <span className='text-2xl font-bold'>Auth</span>
                                        </Col>
                                        <Col className="flex gap-2">
                                            <Select placeholder="Select column" className="w-64">
                                                <Option value="column1">Column 1</Option>
                                                <Option value="column2">Column 2</Option>
                                            </Select>
                                            <Input.Search placeholder="Search list..." className="w-64" />
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

                            </div> */}
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Loading loading={loading} />
        </React.Fragment>
    )
}

export default ShareAuth