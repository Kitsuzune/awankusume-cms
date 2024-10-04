import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Radio, message } from 'antd'
import Draggable from '../../../../../../components/ui/File Upload/Draggable';
import { PiAlignBottomDuotone, PiBookBookmarkDuotone, PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiCardsThreeDuotone, PiCashRegisterDuotone, PiDiamondDuotone, PiFileArchiveDuotone, PiFilmScriptDuotone, PiFlowerLotusDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';
import { apiRequest } from '../../../../../../utils/api';

const { Option } = Select;

const INSW = ({ customerId, makelarId }) => {
    const [data, setData] = useState({
        fullName: '',
        email: '',
        nomorTelp: '',
        ossUsername: '',
        ossPassword: '',
    });
    const [files, setFiles] = useState({});

    const handleFileChange = (name, file) => {
        setFiles(prevFiles => ({ ...prevFiles, [name]: file }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const filesAndData = {
                ...files,
                ...data,
                makelarId: makelarId,
                customerId: customerId,
            };

            await apiRequest('post', 'order/9', filesAndData);
            message.success('Order created successfully');
        } catch (error) {
            message.error('Failed to create order');
        }
    };
    // const renderOssForms = () => {
    //     const forms = [];
    //     for (let i = 1; i <= ossCount; i++) {
    //         forms.push(
    //             <div key={i}>
    //                 <span>OSS {i} :</span>

    //             </div>
    //         );
    //     }
    //     return forms;
    // };

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
                        name="ttdUtamaKertasKosong"
                        label="TTD Utama Di Kertas Kosong :"
                        rules={[{ required: true, message: 'Please upload the Tanda Tangan Utama' }]}
                    >
                        <Draggable
                            icon={<PiFileArchiveDuotone />}
                            topText="Click or drag file Tanda Tangan Utama Di Kertas Kosong to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('tandaTanganDirektur', file)}

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
                            onFileChange={(file) => handleFileChange('tandaTanganPenanggungJawab', file)}

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
                            onFileChange={(file) => handleFileChange('capPerusahaan', file)}

                        />
                    </Form.Item>
                </Col>
            </Row>

            {/* {renderOssForms()} */}
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name={`username`}
                        label={`Username :`}
                        rules={[{ required: true, message: `Please enter your username` }]}
                    >
                        <Input name="ossUsername" placeholder="Enter your username" onChange={handleChange} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name={`passwords`}
                        label={`Password :`}
                        rules={[{ required: true, message: `Please enter your password` }]}
                    >
                        <Input name="ossPassword" placeholder="Enter your Password" onChange={handleChange} />
                    </Form.Item>
                </Col>
            </Row>

            <Button type="primary" onClick={handleSubmit} className="w-full my-4 bg-main">
                Submit
            </Button>

        </Form>
    )
}

export default INSW