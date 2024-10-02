import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Radio } from 'antd'
import Draggable from '../../../../../../components/ui/File Upload/Draggable';
import { PiAlignBottomDuotone, PiBookBookmarkDuotone, PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiCardsThreeDuotone, PiCashRegisterDuotone, PiDiamondDuotone, PiFileArchiveDuotone, PiFilmScriptDuotone, PiFlowerLotusDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';

const { Option } = Select;

const INSW = () => {
    const [ossCount, setOssCount] = useState(1);

    const addOss = () => {
        setOssCount(ossCount + 1);
    };

    const renderOssForms = () => {
        const forms = [];
        for (let i = 1; i <= ossCount; i++) {
            forms.push(
                <div key={i}>
                    <span>OSS {i} :</span>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name={`username${i}`}
                                label={`Username ${i} :`}
                                rules={[{ required: true, message: `Please enter your username ${i}` }]}
                            >
                                <Input placeholder="Username" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={`password${i}`}
                                label={`Password ${i} :`}
                                rules={[{ required: true, message: `Please enter your password ${i}` }]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            );
        }
        return forms;
    };

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
                        name="ttdUtamaKertasKosong"
                        label="TTD Utama Di Kertas Kosong :"
                        rules={[{ required: true, message: 'Please upload the Tanda Tangan Utama' }]}
                    >
                        <Draggable
                            icon={<PiFileArchiveDuotone />}
                            topText="Click or drag file Tanda Tangan Utama Di Kertas Kosong to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="ttdPenanggungJawabKertasKosong"
                        label="TTD Penanggung Jawab Di Kertas Kosong :"
                        rules={[{ required: true, message: 'Please upload the Tanda Tangan Penanggung Jawab' }]}
                    >
                        <Draggable
                            icon={<PiFilmScriptDuotone />}
                            topText="Click or drag file Tanda Tangan Penanggung Jawab Di Kertas Kosong to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="capPerusahaan"
                        label="CAP Perusahaan :"
                        rules={[{ required: true, message: 'Please upload the CAP Perusahaan' }]}
                    >
                        <Draggable
                            icon={<PiFlowerLotusDuotone />}
                            topText="Click or drag file CAP Perusahaan to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
            </Row>

            {renderOssForms()}

            <Button type="primary" onClick={addOss} className="w-full mt-4 bg-main">
                Tambah +
            </Button>

        </Form>
    )
}

export default INSW