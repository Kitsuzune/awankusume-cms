import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Radio } from 'antd'
import Draggable from '../../../../../../components/ui/File Upload/Draggable';
import { PiAlignBottomDuotone, PiBookBookmarkDuotone, PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiCardsThreeDuotone, PiCashRegisterDuotone, PiChalkboardDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';

const { Option } = Select;

const TrademarkBadanUsaha = () => {

    return (
        <Form layout="vertical">


            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="customerField"
                        label="Customer Field :"
                    >
                        <Select
                            placeholder="Select Customer"
                        >
                            <Option value="Customer 1">Customer 1</Option>
                            <Option value="Customer 2">Customer 2</Option>
                            <Option value="Customer 3">Customer 3</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="fullName"
                        label="Full name :"
                        rules={[{ required: true, message: 'Please enter your full name' }]}
                    >
                        <Input placeholder="Enter your full name" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email :"
                        rules={[{ required: true, message: 'Please enter your email' }]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="phone"
                        label="No.Phone :"
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                    >
                        <Input placeholder="Enter your phone number" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={50} className="mt-4">
                <Col span={12}>
                    <Form.Item
                        name="akta"
                        label="Akta"
                        rules={[{ required: true, message: 'Please upload the Akta' }]}
                    >
                        <Draggable
                            icon={<PiCalendarDuotone />}
                            topText="Click or drag file Akta to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="sk"
                        label="SK"
                        rules={[{ required: true, message: 'Please upload the SK' }]}
                    >
                        <Draggable
                            icon={<PiCardholderDuotone />}
                            topText="Click or drag file SK to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="etiketLogo"
                        label="Etiket Logo :"
                        rules={[{ required: true, message: 'Please upload the Etiket Logo' }]}
                    >
                        <Draggable
                            icon={<PiBookBookmarkDuotone />}
                            topText="Click or drag file Etiket Logo to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="tandaTanganDirektur"
                        label="Tanda Tangan Direktur Utama Di Kertas Putih :"
                        rules={[{ required: true, message: 'Please upload the Tanda Tangan Direktur' }]}
                    >
                        <Draggable
                            icon={<PiChalkboardDuotone />}
                            topText="Click or drag file Tanda Tangan Direktur to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="penjelasanBisnisYangDikerjakan"
                        label="Penjelasan Bisnis Yang Dikerjakan :"
                        rules={[{ required: true, message: 'Please enter the Penjelasan Bisnis Yang Dikerjakan' }]}
                    >
                        <Draggable
                            icon={<PiCashRegisterDuotone />}
                            topText="Click or drag file Penjelasan Bisnis Yang Dikerjakan to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    )
}

export default TrademarkBadanUsaha