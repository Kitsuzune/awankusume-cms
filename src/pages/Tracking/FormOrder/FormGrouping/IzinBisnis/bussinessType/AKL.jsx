import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Button, message } from 'antd'
import Draggable from '../../../../../../components/ui/File Upload/Draggable';
import { PiFileArchiveDuotone, PiFilmScriptDuotone, PiFlowerLotusDuotone, PiFoldersDuotone } from 'react-icons/pi';
import { apiRequest } from '../../../../../../utils/api';

const { Option } = Select;

const AKL = ({ customerId, makelarId }) => {
    const [materialMSDSCount, setMaterialMSDSCount] = useState(1);
    const [form] = Form.useForm();
    const [errors, setErrors] = useState({});

    const [data, setData] = useState({
        fullName: '',
        email: '',
        nomorTelp: '',
    });
    const [files, setFiles] = useState({});

    const addMaterialMSDS = () => {
        setMaterialMSDSCount(materialMSDSCount + 1);
    };

    const handleFileChange = (name, file) => {
        setFiles(prevFiles => ({ ...prevFiles, [name]: file }));
    };

    const handleFileChangeArray = (name, index, file) => {
        setFiles(
            prevFiles => ({
                ...prevFiles,
                [name]: [
                    ...(prevFiles[name] || []).slice(0, index),
                    file, 
                    ...(prevFiles[name] || []).slice(index + 1) 
                ]
            })
        )
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        const newErrors = {};
        if (!data.fullName) newErrors.fullName = 'Please enter your full name';
        if (!data.email) newErrors.email = 'Please enter your email';
        if (!data.nomorTelp) newErrors.nomorTelp = 'Please enter your phone number';
        if (!files.loa) newErrors.loa = 'Please upload the LoA';
        if (!files.cfs) newErrors.cfs = 'Please upload the CFS';
        if (!files.iso13485) newErrors.iso13485 = 'Please upload the ISO 13485';
        for (let i = 0; i < materialMSDSCount; i++) {
            if (!files[`material${i}`]) newErrors[`material${i}`] = `Please upload the List Material MSDS ${i + 1}`;
        }
        if (!files.flowProductionChart) newErrors.flowProductionChart = 'Please upload the Flow Production chart';
        if (!files.clinicalTrial) newErrors.clinicalTrial = 'Please upload the Clinical Trial';
        if (!files.specificationBrochure) newErrors.specificationBrochure = 'Please upload the Specification dan Broshure';
        if (!files.documentVerificationAndValidation) newErrors.documentVerificationAndValidation = 'Please upload the Document Verification and Validation';
        if (!files.biocompatibility) newErrors.biocompatibility = 'Please upload the Biocompatibility';
        if (!files.preClinicalTrial) newErrors.preClinicalTrial = 'Please upload the Pre Clinical Trial';
        if (!files.clinicalEvaluation) newErrors.clinicalEvaluation = 'Please upload the Clinical Evaluation';
        if (!files.iso14971) newErrors.iso14971 = 'Please upload the ISO 14971';
        if (!files.coa) newErrors.coa = 'Please upload the CoA';
        if (!files.penandaLuarIndonesia) newErrors.penandaLuarIndonesia = 'Please upload the Penanda di luar Indonesia';
        if (!files.simbolPackagingLuar) newErrors.simbolPackagingLuar = 'Please upload the Simbol di packaging luar';
        if (!files.tandaExpiredDate) newErrors.tandaExpiredDate = 'Please upload the Tanda Expired Date';
        if (!files.manualGuideline) newErrors.manualGuideline = 'Please upload the Manual Guideline';
        if (!files.aksesoris) newErrors.aksesoris = 'Please upload the Aksesoris';

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

            await apiRequest('post', 'order/10', filesAndData);
            message.success('Order created successfully');
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    const renderMaterialMSDS = () => {
        const forms = [];
        for (let i = 0; i < materialMSDSCount; i++) {
            forms.push(
                <div key={i}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name={`listMaterialMSDS${i}`}
                                label={`List Material di dalam dan MSDS ${i + 1} :`}
                                rules={[{ required: true, message: `Please enter the name of List Material MSDS ${i}` }]}
                                validateStatus={errors[`listMaterialMSDS${i}`] ? 'error' : ''}
                                help={errors[`listMaterialMSDS${i}`]}
                            >
                                <Draggable
                                    icon={<PiFoldersDuotone />}
                                    topText="Click or drag file List Material MSDS to this area to upload"
                                    bottomText="Supported Format : PDF, Max Size : 10 MB"
                                    onFileChange={(file) => handleFileChangeArray('material', i, file)}
                                    multiple 
                                />
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

            <Row gutter={16} className="mt-4">
                <Col span={12}>
                    <Form.Item
                        name="loa"
                        label="LoA yang telah di legalisir oleh KBRI atau apostile :"
                        rules={[{ required: true, message: 'Please upload the LoA' }]}
                        validateStatus={errors.loa ? 'error' : ''}
                        help={errors.loa}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file LoA to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('loa', file)}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="cfs"
                        label="CFS :"
                        rules={[{ required: true, message: 'Please upload the CFS' }]}
                        validateStatus={errors.cfs ? 'error' : ''}
                        help={errors.cfs}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file CFS to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('cfs', file)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="iso13485"
                        label="ISO 13485 :"
                        rules={[{ required: true, message: 'Please upload the ISO 13485' }]}
                        validateStatus={errors.iso13485 ? 'error' : ''}
                        help={errors.iso13485}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file ISO 13485 to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('iso13485', file)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            {/* <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="listMaterial"
                        label="List Material di dalam dan MSDS :"
                        rules={[{ required: true, message: 'Please upload the List Material' }]}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file List Material to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
            </Row> */}

            {renderMaterialMSDS()}

            <Button type="primary" onClick={addMaterialMSDS} className="my-4 w-full bg-main">
                Tambah +
            </Button>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="flowProductionChart"
                        label="Flow Production chart :"
                        rules={[{ required: true, message: 'Please upload the Flow Production chart' }]}
                        validateStatus={errors.flowProductionChart ? 'error' : ''}
                        help={errors.flowProductionChart}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Flow Production chart to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('flowProductionChart', file)}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="clinicalTrial"
                        label="Clinical Trial :"
                        rules={[{ required: true, message: 'Please upload the Clinical Trial' }]}
                        validateStatus={errors.clinicalTrial ? 'error' : ''}
                        help={errors.clinicalTrial}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Clinical Trial to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('clinicalTrial', file)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="specificationBrochure"
                        label="Specification dan Broshure :"
                        rules={[{ required: true, message: 'Please upload the Specification dan Broshure' }]}
                        validateStatus={errors.specificationBrochure ? 'error' : ''}
                        help={errors.specificationBrochure}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Specification dan Broshure to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('spesificationAndBrosshure', file)}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="documentVerification"
                        label="Document Verification and Validation :"
                        rules={[{ required: true, message: 'Please upload the Document Verification and Validation' }]}
                        validateStatus={errors.documentVerificationAndValidation ? 'error' : ''}
                        help={errors.documentVerificationAndValidation}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Document Verification and Validation to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('documentVerificationAndValidation', file)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="biocompatibility"
                        label="Biocompatibility :"
                        rules={[{ required: true, message: 'Please upload the Biocompatibility' }]}
                        validateStatus={errors.biocompatibility ? 'error' : ''}
                        help={errors.biocompatibility}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Biocompatibility to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('biocompatibility', file)}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="preClinicalTrial"
                        label="Pre Clinical Trial :"
                        rules={[{ required: true, message: 'Please upload the Pre Clinical Trial' }]}
                        validateStatus={errors.preClinicalTrial ? 'error' : ''}
                        help={errors.preClinicalTrial}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Pre Clinical Trial to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('preclinicalTrial', file)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="clinicalEvaluation"
                        label="Clinical Evaluation :"
                        rules={[{ required: true, message: 'Please upload the Clinical Evaluation' }]}
                        validateStatus={errors.clinicalEvaluation ? 'error' : ''}
                        help={errors.clinicalEvaluation}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Clinical Evaluation to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('clinicalEvaluation', file)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="iso14971"
                        label="ISO 14971 :"
                        rules={[{ required: true, message: 'Please upload the ISO 14971' }]}
                        validateStatus={errors.iso14971 ? 'error' : ''}
                        help={errors.iso14971}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file ISO 14971 to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('iso14971', file)}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="coa"
                        label="CoA :"
                        rules={[{ required: true, message: 'Please upload the CoA' }]}
                        validateStatus={errors.coa ? 'error' : ''}
                        help={errors.coa}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file CoA to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('coa', file)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="penandaLuarIndonesia"
                        label="Penanda di luar Indonesia :"
                        rules={[{ required: true, message: 'Please upload the Penanda di luar Indonesia' }]}
                        validateStatus={errors.penandaLuarIndonesia ? 'error' : ''}
                        help={errors.penandaLuarIndonesia}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Penanda di luar Indonesia to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('penandaLuarIndonesia', file)}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="simbolPackagingLuar"
                        label="Simbol di packaging luar :"
                        rules={[{ required: true, message: 'Please upload the Simbol di packaging luar' }]}
                        validateStatus={errors.simbolPackagingLuar ? 'error' : ''}
                        help={errors.simbolPackagingLuar}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Simbol di packaging luar to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('simbolPackagingLuar', file)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="tandaExpiredDate"
                        label="Tanda Expired Date :"
                        rules={[{ required: true, message: 'Please upload the Tanda Expired Date' }]}
                        validateStatus={errors.tandaExpiredDate ? 'error' : ''}
                        help={errors.tandaExpiredDate}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Tanda Expired Date to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('tandaExpiredDate', file)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="manualGuideline"
                        label="Manual Guideline Bahasa Indonesia & Bahasa Inggris :"
                        rules={[{ required: true, message: 'Please upload the Manual Guideline' }]}
                        validateStatus={errors.manualGuideline ? 'error' : ''}
                        help={errors.manualGuideline}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Manual Guideline to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('manualGuideline', file)}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="aksesoris"
                        label="Aksesoris yang dilertakan :"
                        rules={[{ required: true, message: 'Please upload the Aksesoris' }]}
                        validateStatus={errors.aksesoris ? 'error' : ''}
                        help={errors.aksesoris}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Aksesoris to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            onFileChange={(file) => handleFileChange('aksesorisDisertakan', file)}
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

export default AKL