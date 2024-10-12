import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Radio, message } from 'antd'
import Draggable from '../../../../../../components/ui/File Upload/Draggable';
import { PiAlignBottomDuotone, PiBookBookmarkDuotone, PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiCardsThreeDuotone, PiCashRegisterDuotone, PiChalkboardDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';
import { apiRequest } from '../../../../../../utils/api';

const { Option } = Select;

const TrademarkBadanUsaha = ({ customerId, makelarId }) => {
    const [data, setData] = useState({
        fullName: '',
        email: '',
        nomorTelp: '',
    });
    const [files, setFiles] = useState({});
    const [form] = Form.useForm();
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (name, file) => {
        setFiles(prevFiles => ({ ...prevFiles, [name]: file }));
    };

    const handleSubmit = async () => {
        const newErrors = {};
        if (!data.fullName) newErrors.fullName = 'Please enter your full name';
        if (!data.email) newErrors.email = 'Please enter your email';
        if (!data.nomorTelp) newErrors.nomorTelp = 'Please enter your phone number';
        if (!files.akta) newErrors.akta = 'Please upload the Akta';
        if (!files.sk) newErrors.sk = 'Please upload the SK';
        if (!files.etiketLogo) newErrors.etiketLogo = 'Please upload the Etiket Logo';
        if (!files.tandaTanganDirektur) newErrors.tandaTanganDirektur = 'Please upload the Tanda Tangan Direktur';
        if (!files.penjelasanBisnis) newErrors.penjelasanBisnis = 'Please upload the Penjelasan Bisnis';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const filesAndData = {
                ...files,
                ...data,
                ...(makelarId ? { makelarId } : {}), 
                ...(customerId ? { customerId } : {}), 
            };

            await apiRequest('post', 'order/4', filesAndData);
            message.success('Order created successfully');
        } catch (error) {
            message.error('Failed to create order');
        }
    };

    return (
        <Form layout="vertical" form={form}>

            {/* 
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
            </Row> */}

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="fullName"
                        label="Full name :"
                        rules={[{ required: true, message: 'Please enter your full name' }]}
                        validateStatus={errors.fullName ? 'error' : ''}
                        help={errors.fullName}
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
                        validateStatus={errors.email ? 'error' : ''}
                        help={errors.email}
                    >
                        <Input name="email" placeholder="Enter your email" onChange={handleChange} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="phone"
                        label="No.Phone :"
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                        validateStatus={errors.nomorTelp ? 'error' : ''}
                        help={errors.nomorTelp}
                    >
                        <Input name="nomorTelp" placeholder="Enter your phone number" onChange={handleChange} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={50} className="mt-4">
                <Col span={12}>
                    <Form.Item
                        name="akta"
                        label="Akta"
                        rules={[{ required: true, message: 'Please upload the Akta' }]}
                        validateStatus={errors.akta ? 'error' : ''}
                        help={errors.akta}
                    >
                        <Draggable
                            icon={<PiCalendarDuotone />}
                            topText="Click or drag file Akta to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('akta', file)}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="sk"
                        label="SK"
                        rules={[{ required: true, message: 'Please upload the SK' }]}
                        validateStatus={errors.sk ? 'error' : ''}
                        help={errors.sk}
                    >
                        <Draggable
                            icon={<PiCardholderDuotone />}
                            topText="Click or drag file SK to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('sk', file)}
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
                        validateStatus={errors.etiketLogo ? 'error' : ''}
                        help={errors.etiketLogo}
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
                        name="tandaTanganDirektur"
                        label="Tanda Tangan Direktur Utama Di Kertas Putih :"
                        rules={[{ required: true, message: 'Please upload the Tanda Tangan Direktur' }]}
                        validateStatus={errors.tandaTanganDirektur ? 'error' : ''}
                        help={errors.tandaTanganDirektur}
                    >
                        <Draggable
                            icon={<PiChalkboardDuotone />}
                            topText="Click or drag file Tanda Tangan Direktur to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('tandaTanganDirektur', file)}
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
                        validateStatus={errors.penjelasanBisnis ? 'error' : ''}
                        help={errors.penjelasanBisnis}
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

export default TrademarkBadanUsaha