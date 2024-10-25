import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Radio, message } from 'antd'
import Draggable from '../../../../../../../components/ui/File Upload/Draggable';
import { PiAlignBottomDuotone, PiBookBookmarkDuotone, PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiCardsThreeDuotone, PiCashRegisterDuotone, PiChalkboardDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';
import { apiRequest } from '../../../../../../../utils/api';
import { DownSquareTwoTone } from '@ant-design/icons';

const { Option } = Select;

const TrademarkBadanUsaha = ({ dataView, handleDownload, handleDownloadZip }) => {

    return (
        <Form layout="vertical">

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="fullName"
                        label="Full name :"
                    >
                        <Input name="fullName" defaultValue={dataView?.businessOrder?.fullName} disabled />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email :"
                    >
                        <Input name="email" defaultValue={dataView?.businessOrder?.email} disabled />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="phone"
                        label="No.Phone :"
                    >
                        <Input name="nomorTelp" defaultValue={dataView?.businessOrder?.nomorTelp} disabled />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={50} className="mt-4">
                <Col span={12}>
                    <Form.Item
                        name="akta"
                        label="Akta"
                    >
                        <Draggable
                            icon={<PiCalendarDuotone />}
                            topText={`File: ${dataView?.businessOrder?.akta}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.akta);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="sk"
                        label="SK"
                    >
                        <Draggable
                            icon={<PiCardholderDuotone />}
                            topText={`File: ${dataView?.businessOrder?.sk}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.sk);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="etiketLogo"
                        label="Etiket Logo :"
                    >
                        <Draggable
                            icon={<PiBookBookmarkDuotone />}
                            topText={`File: ${dataView?.businessOrder?.etiketLogo}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.etiketLogo);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="tandaTanganDirektur"
                        label="Tanda Tangan Direktur Utama Di Kertas Putih :"
                    >
                        <Draggable
                            icon={<PiChalkboardDuotone />}
                            topText={`File: ${dataView?.businessOrder?.tandaTanganDirektur}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.tandaTanganDirektur);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="penjelasanBisnisYangDikerjakan"
                        label="Penjelasan Bisnis Yang Dikerjakan :"
                    >
                        <Draggable
                            icon={<PiCashRegisterDuotone />}
                            topText={`File: ${dataView?.businessOrder?.penjelasanBisnis}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.penjelasanBisnis);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            <Button className='mt-4 w-full' onClick={handleDownloadZip}>
                <DownSquareTwoTone />
                Download All File In This Form As Zip
            </Button>

        </Form>
    )
}

export default TrademarkBadanUsaha