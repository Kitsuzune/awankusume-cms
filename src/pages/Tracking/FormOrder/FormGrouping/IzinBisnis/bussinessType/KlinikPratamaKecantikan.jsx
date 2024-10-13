import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Checkbox, message } from 'antd'
import Draggable from '../../../../../../components/ui/File Upload/Draggable';
import { PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiEnvelopeSimpleDuotone, PiFactoryDuotone, PiFarmDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';
import { apiRequest } from '../../../../../../utils/api';

const { Option } = Select;

const KlinikPratamaKecantikan = ({ customerId, makelarId }) => {
    const [dokterCount, setDokterCount] = useState(1);
    const [form] = Form.useForm();
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        fullName: '',
        email: '',
        nomorTelp: '',
        namaPerawat: '',
        doctor: [
            JSON.stringify({ name: '', penanggungJawab: 0 }), 
            JSON.stringify({ name: '', penanggungJawab: 0 }) 
        ],
    });
    const [files, setFiles] = useState({});

    const addDokter = () => {
        setDokterCount(dokterCount + 1);
        setData(prevData => {
            const newDoctor = JSON.stringify({ name: '', penanggungJawab: 0 });
            return { ...prevData, doctor: [...prevData.doctor, newDoctor] };
        });
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
            const updatedResponsible = [...prevData.doctor];
            const responsibleObj = JSON.parse(updatedResponsible[index] || '{}');
            responsibleObj[field] = field === 'penanggungJawab' ? (value ? 1 : 0) : value;
            updatedResponsible[index] = JSON.stringify(responsibleObj);
            return { ...prevData, doctor: updatedResponsible };
        });
    };

    const handleSubmit = async () => {
        const newErrors = {};
        if (!data.fullName) newErrors.fullName = 'Please enter your full name';
        if (!data.email) newErrors.email = 'Please enter your email';
        if (!data.nomorTelp) newErrors.nomorTelp = 'Please enter your phone number';
        for (let i = 0; i < dokterCount; i++) {
            const responsibleObj = JSON.parse(data.doctor[i] || '{}');
            if (!responsibleObj.name) newErrors[`namaDokter${i}`] = `Please enter the name of doctor ${i + 1}`;
        }
        if (!data.namaPerawat) newErrors.namaPerawat = 'Please enter the name of nurse';
        if (!files.buktiStr) newErrors.buktiStr = 'Please upload the STR certificate';
        if (!files.tempatPraktek) newErrors.tempatPraktek = 'Please upload the Ruko/Rumah';
        if (!files.lahanParkir) newErrors.lahanParkir = 'Please upload the Lahan Parkir';
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

            console.log(filesAndData);

            await apiRequest('post', 'order/8', filesAndData);
            message.success('Order created successfully');
        } catch (error) {
            message.error('Failed to create order');
        }
    };

    const renderDokterForms = () => {
        const forms = [];
        for (let i = 0; i <= dokterCount; i++) {
            forms.push(
                <div key={i}>
                    <Row gutter={16}>
                        <Col span={20}>
                            <Form.Item
                                name={`namaDokter${i}`}
                                label={`Nama dokter ${i + 1} :`}
                                rules={[{ required: true, message: `Please enter the name of doctor ${i}` }]}
                                validateStatus={errors[`namaDokter${i}`] ? 'error' : ''}
                                help={errors[`namaDokter${i}`]}
                            >
                                <Input name={`name`} placeholder={`Enter the name of doctor ${i + 1}`} onChange={(e) => handleResponsibleChange(i, 'name', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={4} className="flex items-center">
                            <Form.Item
                                name={`penanggungjawab${i}`}
                                valuePropName="checked"
                                className="mb-0"
                            >
                                <Checkbox onChange={(e) => handleResponsibleChange(i, 'penanggungJawab', e.target.checked)}>
                                    Penanggung Jawab
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            );
        }
        return forms;
    };

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
                        validateStatus={errors.namaPerawat ? 'error' : ''}
                        help={errors.namaPerawat}
                    >
                        <Input name="namaPerawat" placeholder="Enter the name of nurse" onChange={handleChange} />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="buktiSTR"
                        label="Bukti STR :"
                        rules={[{ required: true, message: 'Please upload the STR certificate' }]}
                        validateStatus={errors.buktiStr ? 'error' : ''}
                        help={errors.buktiStr}
                    >
                        <Draggable
                            icon={<PiEnvelopeSimpleDuotone />}
                            topText="Click or drag file STR certificate to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('buktiStr', file)}
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
                        validateStatus={errors.tempatPraktek ? 'error' : ''}
                        help={errors.tempatPraktek}
                    >
                        <Draggable
                            icon={<PiFactoryDuotone />}
                            topText="Click or drag file Ruko/Rumah to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('tempatPraktek', file)}
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
                        validateStatus={errors.lahanParkir ? 'error' : ''}
                        help={errors.lahanParkir}
                    >
                        <Draggable
                            icon={<PiFarmDuotone />}
                            topText="Click or drag file Ruko/Rumah to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('lahanParkir', file)}
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

export default KlinikPratamaKecantikan