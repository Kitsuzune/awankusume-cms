import { Col, Input, Row, Select, Table, Typography } from 'antd'
import React from 'react'
import { CustomPagination } from '../../../components/ui/Table/CustomPagination';
import Button from '../../../components/ui/Button/Button';
import { PlusOutlined } from '@ant-design/icons';
import { pengajuanOnGoingColumns } from '../../../components/ui/Table/columns/pengajuanOnGoing';
import { IoIosSearch } from 'react-icons/io';

const PengajuanCompleted = () => {
    const { Option } = Select;
    const { Text } = Typography;

    const dataSource = [
        {
            key: '1',
            number: '1',
            nama: 'Tes',
            date: '2024-01-01',
            komisi: '100000',
        },
        {
            key: '2',
            number: '2',
            nama: 'Tes',
            date: '2024-01-01',
            komisi: '100000',
        },
        {
            key: '3',
            number: '3',
            nama: 'Tes',
            date: '2024-01-01',
            komisi: '100000',
        },
        {
            key: '4',
            number: '4',
            nama: 'Tes',
            date: '2024-01-01',
            komisi: '100000',
        }
    ];

    const columnsWithActions = [
        ...pengajuanOnGoingColumns,
        {
            title: 'Action',
            key: 'action',
            width: 300,
            render: (text, record) => (
                <span>
                    <Button type="link">Approve</Button>
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

                                    <Row align="middle" className="mb-4">
                                        <Col span={12}>
                                            <div className='flex items-center bg-white p-2 rounded-lg w-full'>
                                                <IoIosSearch className='text-2xl mr-2' />
                                                <input placeholder='Search...' className='border-none focus:outline-none bg-transparent' />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row align="middle" className="mb-4">
                                        <Col>
                                            <Text className='text-2xl font-bold'>Completed</Text>
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

export default PengajuanCompleted