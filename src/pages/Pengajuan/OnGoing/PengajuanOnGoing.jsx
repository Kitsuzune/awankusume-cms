import { Col, Input, Row, Select, Table, Typography } from 'antd'
import React, { useState } from 'react'
import { CustomPagination } from '../../../components/ui/Table/CustomPagination';
import Button from '../../../components/ui/Button/Button';
import { PlusOutlined } from '@ant-design/icons';
import { pengajuanOnGoingColumns } from '../../../components/ui/Table/columns/pengajuanOnGoing';
import { IoIosSearch } from 'react-icons/io';
import Loading from '../../../components/ui/Loading/Loading';

const PengajuanOnGoing = () => {
    const { Option } = Select;
    const { Text } = Typography;
    const [loading, setLoading] = useState(false);
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
                                                <div className="text-[24px] text-main inline-block">Pengajuan On Going</div>
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
                                                            <span className="text-[24px] inline-block">On Going</span>
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
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Loading loading={loading} />
        </React.Fragment>
    )
}

export default PengajuanOnGoing