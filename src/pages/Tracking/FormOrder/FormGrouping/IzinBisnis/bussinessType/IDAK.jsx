import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Radio, message } from 'antd'
import Draggable from '../../../../../../components/ui/File Upload/Draggable';
import { PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';
import { apiRequest } from '../../../../../../utils/api';

const { Option } = Select;

const IDAK = ({ customerId, makelarId }) => {
    const [penanggungJawabCount, setPenanggungJawabCount] = useState(1);
    const [peralatanKantorCount, setPeralatanKantorCount] = useState(1);
    const [form] = Form.useForm();
    const [data, setData] = useState({
        fullName: '',
        email: '',
        nomorTelp: '',
        nibOssRba: '',
        ruko: '',
        responsible: [],
        officeEquipment: [],
    });
    const [files, setFiles] = useState({});

    const addPenanggungJawab = () => {
        setPenanggungJawabCount(penanggungJawabCount + 1);
    };

    const addPeralatanKantor = () => {
        setPeralatanKantorCount(peralatanKantorCount + 1);
    };

    const handleFileChange = (name, file) => {
        setFiles(prevFiles => ({ ...prevFiles, [name]: file }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [field, index] = name.split('[');
        if (index) {
            const idx = parseInt(index.replace(']', ''), 10);
            setData(prevData => {
                const updatedArray = [...prevData[field]];
                updatedArray[idx - 1] = { ...updatedArray[idx - 1], [field === 'officeEquipment' ? 'peralatanKantor' : field]: value };
                return { ...prevData, [field]: updatedArray };
            });
        } else {
            setData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleSelectChange = (value, name) => {
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

            await apiRequest('post', 'order/1', filesAndData);
            message.success('Order created successfully');
        } catch (error) {
            console.log(error);
            message.error('Failed to create order');
        }
    };

    const renderPenanggungJawab = () => {
        const forms = [];
        for (let i = 1; i <= penanggungJawabCount; i++) {
            forms.push(
                <div key={i}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name={`namaPenanggungJawab${i}`}
                                label={`Nama Penanggung Jawab ${i} :`}
                                rules={[{ required: true, message: `Please enter the name of Penanggung Jawab ${i}` }]}
                            >
                                <Input name={`namaPenanggungJawab${i}`} placeholder={`Enter the name of Penanggung Jawab ${i}`} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={`jabatanPenanggungJawab${i}`}
                                label={`Jabatan Penanggung Jawab ${i} :`}
                                rules={[{ required: true, message: `Please enter the position of Penanggung Jawab ${i}` }]}
                            >
                                <Input name={`jabatanPenanggungJawab${i}`} placeholder={`Enter the position of Penanggung Jawab ${i}`} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            );
        }
        return forms;
    }

    const renderPeralatanKantor = () => {
        const forms = [];
        for (let i = 1; i <= peralatanKantorCount; i++) {
            forms.push(
                <div key={i}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name={`officeEquipment[${i}]`}
                                label={`Peralatan Kantor ${i} :`}
                                rules={[{ required: true, message: `Please enter the peralatan kantor ${i}` }]}
                            >
                                <Input name={`officeEquipment[${i}]`} placeholder={`Enter the peralatan kantor ${i}`} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            );
        }
        return forms;
    }

    return (
        <Form layout="vertical" form={form}>

            {/* <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="customerField"
                        label="Customer Field :"
                    >
                        <Select
                            placeholder="Select Customer"
                            onChange={(value) => handleSelectChange(value, 'customerField')}
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
                        name="nomorTelp"
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
                        name="akta"
                        label="Akta"
                        rules={[{ required: true, message: 'Please upload the Akta' }]}
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
                        name="npwp"
                        label="NPWP"
                        rules={[{ required: true, message: 'Please upload the NPWP' }]}
                    >
                        <Draggable
                            icon={<PiIdentificationBadgeDuotone />}
                            topText="Click or drag file NPWP to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('npwp', file)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="nibOssRba"
                        label="NIB OSS RBA Dengan KBLI 46691"
                        rules={[{ required: true, message: 'Please upload the NIB OSS' }]}
                    >
                        <Input name="nibOssRba" placeholder="Enter the NIB OSS RBA Dengan KBLI 46691" onChange={handleChange} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="ruko"
                        label="Ruko"
                        rules={[{ required: true, message: 'Please upload the Ruko Type' }]}
                    >
                        <Radio.Group name="ruko" onChange={handleChange}>
                            <Radio value="SEWA">Sewa</Radio>
                            <Radio value="MILIK">Milik Sendiri</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="rukoImage"
                        label="Foto Ruko"
                        rules={[{ required: true, message: 'Please upload the Foto Ruko' }]}
                    >
                        <Draggable
                            icon={<PiBuildingOfficeDuotone />}
                            topText="Click or drag file Foto Ruko to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('rukoImage', file)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            {renderPenanggungJawab()}

            <Button type="primary" onClick={addPenanggungJawab} className="w-full my-4 bg-main">
                Tambahkan Penanggung Jawab +
            </Button>

            {renderPeralatanKantor()}

            <Button type="primary" onClick={addPeralatanKantor} className="w-full my-4 bg-main">
                Tambahkan Peralatan Kantor +
            </Button>

            <Button type="primary" onClick={handleSubmit} className="w-full my-4 bg-main">
                Submit
            </Button>

        </Form>
    )
}

export default IDAK