import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Radio, message } from 'antd'
import { PiAlignBottomDuotone, PiBookBookmarkDuotone, PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiCardsThreeDuotone, PiCashRegisterDuotone, PiDiamondDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';
import { apiRequest } from '../../../../../../../utils/api';
import Draggable from '../../../../../../../components/ui/File Upload/Draggable';
import { DownSquareTwoTone } from '@ant-design/icons';

const { Option } = Select;

const TrademarkLuarNegeriPerorangan = ({ dataView }) => {

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
                        name="passportPemohon"
                        label="Passport Pemohon :"
                    >
                        <Draggable
                            icon={<PiDiamondDuotone />}
                            topText={`File: ${dataView?.businessOrder?.passportPemohon}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            window.open(`${process.env.REACT_APP_API_URL_CSM}/public/showcase/${dataView?.businessOrder?.passportPemohon}`, '_blank');
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
                <Col span={12}>
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
                            window.open(`${process.env.REACT_APP_API_URL_CSM}/public/showcase/${dataView?.businessOrder?.etiketLogo}`, '_blank');
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
                        name="tandaTanganPemohon"
                        label="Tanda Tangan Pemohon Di Kertas Putih :"
                    >
                        <Draggable
                            icon={<PiCardsThreeDuotone />}
                            topText={`File: ${dataView?.businessOrder?.tandaTanganPemohon}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            window.open(`${process.env.REACT_APP_API_URL_CSM}/public/showcase/${dataView?.businessOrder?.tandaTanganPemohon}`, '_blank');
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
                            window.open(`${process.env.REACT_APP_API_URL_CSM}/public/showcase/${dataView?.businessOrder?.penjelasanBisnis}`, '_blank');
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            <Button className='mt-4 w-full'>
                <DownSquareTwoTone />
                Download All File In This Form As Zip
            </Button>

        </Form>
    )
}

export default TrademarkLuarNegeriPerorangan