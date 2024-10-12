import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Radio, message } from 'antd'
import Draggable from '../../../../../../components/ui/File Upload/Draggable';
import { PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';
import { apiRequest } from '../../../../../../utils/api';

const { Option } = Select;

const SMKPO = ({ customerId, makelarId }) => {
    const [penanggungJawabCount, setPenanggungJawabCount] = useState(1);
    const [peralatanKantorCount, setPeralatanKantorCount] = useState(1);
    const [form] = Form.useForm();
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        fullName: '',
        email: '',
        nomorTelp: '',
        bentuk: '',
        nibOssRba: '',
        ruko: '',
        responsible: [''], // Array of string
        officeEquipment: [''], // Array of string
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
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleResponsibleChange = (index, field, value) => {
        setData(prevData => {
            const updatedResponsible = [...prevData.responsible];
            const responsibleObj = JSON.parse(updatedResponsible[index] || '{}');
            responsibleObj[field] = value;
            updatedResponsible[index] = JSON.stringify(responsibleObj);
            return { ...prevData, responsible: updatedResponsible };
        });
    };

    const handleOfficeEquipmentChange = (index, value) => {
        setData(prevData => {
            const updatedOfficeEquipment = [...prevData.officeEquipment];
            updatedOfficeEquipment[index] = JSON.stringify({ peralatanKantor: value });
            return { ...prevData, officeEquipment: updatedOfficeEquipment };
        });
    };

    const handleSubmit = async () => {
        const newErrors = {};
        if (!data.fullName) newErrors.fullName = 'Please enter your full name';
        if (!data.email) newErrors.email = 'Please enter your email';
        if (!data.nomorTelp) newErrors.nomorTelp = 'Please enter your phone number';
        if (!data.bentuk) newErrors.bentuk = 'Please enter the type of company';
        if (!data.akta) newErrors.akta = 'Please upload the Akta';
        if (!data.sk) newErrors.sk = 'Please upload the SK';
        if (!data.npwp) newErrors.npwp = 'Please upload the NPWP';
        if (!data.nibOssRba) newErrors.nibOssRba = 'Please upload the NIB OSS RBA';
        if (!data.ruko) newErrors.ruko = 'Please enter the type of Ruko';
        if (!files.rukoImage) newErrors.rukoImage = 'Please upload the Foto Ruko';
        for (let i = 0; i < penanggungJawabCount; i++) {
            if (!data[`name${i}`]) newErrors[`name${i}`] = `Please enter the name of Penanggung Jawab ${i + 1}`;
        }
        for (let i = 0; i < peralatanKantorCount; i++) {
            if (!data[`peralatanKantor${i}`]) newErrors[`peralatanKantor${i}`] = `Please enter the peralatan kantor ${i + 1}`;
        }
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

            await apiRequest('post', 'order/7', filesAndData);
            message.success('Order created successfully');
        } catch (error) {
            message.error('Failed to create order');
        }
    };

    const renderPenanggungJawab = () => {
        const forms = [];
        for (let i = 0; i < penanggungJawabCount; i++) {
            forms.push(
                <div key={i}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name={`name${i}`}
                                label={`Nama Penanggung Jawab ${i + 1} :`}
                                rules={[{ required: true, message: `Please enter the name of Penanggung Jawab ${i + 1}` }]}
                                validateStatus={errors[`name${i}`] ? 'error' : ''}
                                help={errors[`name${i}`]}
                            >
                                <Input name={`name`} placeholder={`Enter the name of Penanggung Jawab ${i + 1}`} onChange={(e) => handleResponsibleChange(i, 'name', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={`jabatan${i}`}
                                label={`Jabatan Penanggung Jawab ${i + 1} :`}
                                rules={[{ required: true, message: `Please enter the position of Penanggung Jawab ${i + 1}` }]}
                                validateStatus={errors[`jabatan${i}`] ? 'error' : ''}
                                help={errors[`jabatan${i}`]}
                            >
                                <Input name={`jabatan`} placeholder={`Enter the position of Penanggung Jawab ${i + 1}`} onChange={(e) => handleResponsibleChange(i, 'jabatan', e.target.value)} />
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
        for (let i = 0; i < peralatanKantorCount; i++) {
            forms.push(
                <div key={i}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name={`peralatanKantor${i}`}
                                label={`Peralatan Kantor ${i + 1} :`}
                                rules={[{ required: true, message: `Please enter the peralatan kantor ${i + 1}` }]}
                                validateStatus={errors[`peralatanKantor${i}`] ? 'error' : ''}
                                help={errors[`peralatanKantor${i}`]}
                            >
                                <Input name={`peralatanKantor`} placeholder={`Enter the peralatan kantor ${i + 1}`} onChange={(e) => handleOfficeEquipmentChange(i, e.target.value)} />
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

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="berbentuk"
                        label="Berbentuk :"
                        rules={[{ required: true, message: 'Please enter the type of company' }]}
                        validateStatus={errors.bentuk ? 'error' : ''}
                        help={errors.bentuk}
                    >
                        <Radio.Group name="bentuk" onChange={handleChange}>
                            <Radio value="PT">PT</Radio>
                            <Radio value="CV">CV</Radio>
                        </Radio.Group>
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
                        name="npwp"
                        label="NPWP"
                        rules={[{ required: true, message: 'Please upload the NPWP' }]}
                        validateStatus={errors.npwp ? 'error' : ''}
                        help={errors.npwp}
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
                        label="NIB OSS RBA"
                        rules={[{ required: true, message: 'Please upload the NIB OSS' }]}
                        validateStatus={errors.nibOssRba ? 'error' : ''}
                        help={errors.nibOssRba}
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
                        validateStatus={errors.ruko ? 'error' : ''}
                        help={errors.ruko}
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
                        name="fotoRuko"
                        label="Foto Ruko"
                        rules={[{ required: true, message: 'Please upload the Foto Ruko' }]}
                        validateStatus={errors.rukoImage ? 'error' : ''}
                        help={errors.rukoImage}
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

export default SMKPO