import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Button } from 'antd'
import Draggable from '../../../../../../components/ui/File Upload/Draggable';
import { PiFileArchiveDuotone, PiFilmScriptDuotone, PiFlowerLotusDuotone, PiFoldersDuotone } from 'react-icons/pi';

const { Option } = Select;

const AKL = () => {
    const [materialMSDSCount, setMaterialMSDSCount] = useState(1);

    const addMaterialMSDS = () => {
        setMaterialMSDSCount(materialMSDSCount + 1);
    };

    const renderMaterialMSDS = () => {
        const forms = [];
        for (let i = 1; i <= materialMSDSCount; i++) {
            forms.push(
                <div key={i}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name={`listMaterialMSDS${i}`}
                                label={`List Material MSDS ${i} :`}
                                rules={[{ required: true, message: `Please enter the name of List Material MSDS ${i}` }]}
                            >
                                <Draggable
                                    icon={<PiFoldersDuotone />}
                                    topText="Click or drag file List Material MSDS to this area to upload"
                                    bottomText="Supported Format : PDF, Max Size : 10 MB"
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

            <Row gutter={16} className="mt-4">
                <Col span={12}>
                    <Form.Item
                        name="loa"
                        label="LoA yang telah di legalisir oleh KBRI atau apostile :"
                        rules={[{ required: true, message: 'Please upload the LoA' }]}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file LoA to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="cfs"
                        label="CFS :"
                        rules={[{ required: true, message: 'Please upload the CFS' }]}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file CFS to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
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
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file ISO 13485 to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
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
            </Row>

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
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Flow Production chart to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="clinicalTrial"
                        label="Clinical Trial :"
                        rules={[{ required: true, message: 'Please upload the Clinical Trial' }]}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Clinical Trial to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
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
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Specification dan Broshure to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="documentVerification"
                        label="Document Verification and Validation :"
                        rules={[{ required: true, message: 'Please upload the Document Verification and Validation' }]}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Document Verification and Validation to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
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
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Biocompatibility to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="preClinicalTrial"
                        label="Pre Clinical Trial :"
                        rules={[{ required: true, message: 'Please upload the Pre Clinical Trial' }]}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Pre Clinical Trial to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
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
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Clinical Evaluation to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
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
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file ISO 14971 to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="coa"
                        label="CoA :"
                        rules={[{ required: true, message: 'Please upload the CoA' }]}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file CoA to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
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
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Penanda di luar Indonesia to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="simbolPackagingLuar"
                        label="Simbol di packaging luar :"
                        rules={[{ required: true, message: 'Please upload the Simbol di packaging luar' }]}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Simbol di packaging luar to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
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
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Tanda Expired Date to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
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
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Manual Guideline to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="aksesoris"
                        label="Aksesoris yang dilertakan :"
                        rules={[{ required: true, message: 'Please upload the Aksesoris' }]}
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText="Click or drag file Aksesoris to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default AKL