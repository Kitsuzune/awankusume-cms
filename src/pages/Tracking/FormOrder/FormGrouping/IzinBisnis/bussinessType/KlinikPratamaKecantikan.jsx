import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Checkbox } from 'antd'
import Draggable from '../../../../../../components/ui/File Upload/Draggable';
import { PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiEnvelopeSimpleDuotone, PiFactoryDuotone, PiFarmDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';

const { Option } = Select;

const KlinikPratamaKecantikan = () => {
    const [dokterCount, setDokterCount] = useState(2);

    const addDokter = () => {
        setDokterCount(dokterCount + 1);
    };

    const renderDokterForms = () => {
        const forms = [];
        for (let i = 1; i <= dokterCount; i++) {
            forms.push(
                <Row gutter={16} key={i}>
                    <Col span={20}>
                        <Form.Item
                            name={`namaDokter${i}`}
                            label={`Nama dokter ${i} :`}
                            rules={[{ required: true, message: `Please enter the name of doctor ${i}` }]}
                        >
                            <Input placeholder={`Enter the name of doctor ${i}`} />
                        </Form.Item>
                    </Col>
                    <Col span={4} className="flex items-center">
                        <Form.Item
                            name={`penanggungJawab${i}`}
                            valuePropName={`penanggungJawab${i}`}
                            className="mb-0"
                        >
                            <Checkbox>Penanggung Jawab</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
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

            {renderDokterForms()}

            <Button type="primary" onClick={addDokter} className="w-full my-4 bg-main">
                Tambahkan Dokter +
            </Button>

            <Row gutter={50}>
                <Col span={12}>
                    <Form.Item
                        name="namaPerawat"
                        label="Nama Perawat :"
                        rules={[{ required: true, message: 'Please enter the name of nurse' }]}
                    >
                        <Input placeholder="Enter the name of nurse" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="buktiSTR"
                        label="Bukti STR :"
                        rules={[{ required: true, message: 'Please upload the STR certificate' }]}
                    >
                        <Draggable
                            icon={<PiEnvelopeSimpleDuotone />}
                            topText="Click or drag file STR certificate to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="rukoRumah"
                        label="Ruko/Rumah :"
                        rules={[{ required: true, message: 'Please enter the type of company' }]}
                    >
                        <Draggable
                            icon={<PiFactoryDuotone />}
                            topText="Click or drag file Ruko/Rumah to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="lahanParkir"
                        label="Lahan Parkir :"
                        rules={[{ required: true, message: 'Please enter the type of company' }]}
                    >
                        <Draggable
                            icon={<PiFarmDuotone />}
                            topText="Click or drag file Ruko/Rumah to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    )
}

export default KlinikPratamaKecantikan