import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Radio, message } from 'antd'
import Draggable from '../../../../../../components/ui/File Upload/Draggable';
import { PiAlignBottomDuotone, PiBookBookmarkDuotone, PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiCardsThreeDuotone, PiCashRegisterDuotone, PiDiamondDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';
import { apiRequest } from '../../../../../../utils/api';

const { Option } = Select;

const TrademarkLuarNegeriPerorangan = ({ customerId, makelarId }) => {
    const [data, setData] = useState({
        fullName: '',
        email: '',
        nomorTelp: '',
    });
    const [files, setFiles] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (name, file) => {
        setFiles(prevFiles => ({ ...prevFiles, [name]: file }));
    };

    const handleSubmit = async () => {
        try {
            const filesAndData = {
                ...files,
                ...data,
                makelarId: makelarId,
                customerId: customerId,
            };

            await apiRequest('post', 'order/5', filesAndData);
            message.success('Order created successfully');
        } catch (error) {
            message.error('Failed to create order');
        }
    };

    return (
        <Form layout="vertical">


            {/* <Row gutter={16}>
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
            </Row> */}

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="fullName"
                        label="Full name :"
                        rules={[{ required: true, message: 'Please enter your full name' }]}
                    >
                        <Input name="fullName" placeholder="Enter your full name" onChange={handleChange} />
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
                        <Input name="email" placeholder="Enter your email" onChange={handleChange} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="phone"
                        label="No.Phone :"
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                    >
                        <Input name="nomorTelp" placeholder="Enter your phone number" onChange={handleChange} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={50} className="mt-4">
                <Col span={12}>
                    <Form.Item
                        name="passportPemohon"
                        label="Passport Pemohon :"
                        rules={[{ required: true, message: 'Please upload the Passport Pemohon' }]}
                    >
                        <Draggable
                            icon={<PiDiamondDuotone />}
                            topText="Click or drag file Passport Pemohon to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('paspor', file)}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="etiketLogo"
                        label="Etiket Logo :"
                        rules={[{ required: true, message: 'Please upload the Etiket Logo' }]}
                    >
                        <Draggable
                            icon={<PiBookBookmarkDuotone />}
                            topText="Click or drag file Etiket Logo to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('etiketLogo', file)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="tandaTanganPemohon"
                        label="Tanda Tangan Pemohon Di Kertas Putih :"
                        rules={[{ required: true, message: 'Please upload the Tanda Tangan Pemohon' }]}
                    >
                        <Draggable
                            icon={<PiCardsThreeDuotone />}
                            topText="Click or drag file Tanda Tangan Pemohon to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('tandaTanganPemohon', file)}
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
                            onFileChange={(file) => handleFileChange('penjelasanBisnis', file)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Button type="primary" onClick={handleSubmit} className="w-full my-4 bg-main">
                Submit
            </Button>

        </Form>
    )
}

export default TrademarkLuarNegeriPerorangan