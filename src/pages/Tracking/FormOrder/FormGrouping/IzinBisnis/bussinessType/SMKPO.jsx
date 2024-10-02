import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Radio } from 'antd'
import Draggable from '../../../../../../components/ui/File Upload/Draggable';
import { PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';

const { Option } = Select;

const SMKPO = () => {
    const [penanggungJawabCount, setPenanggungJawabCount] = useState(1);
    const [peralatanKantorCount, setPeralatanKantorCount] = useState(1);

    const addPenanggungJawab = () => {
        setPenanggungJawabCount(penanggungJawabCount + 1);
    };

    const addPeralatanKantor = () => {
        setPeralatanKantorCount(peralatanKantorCount + 1);
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
                    <Input placeholder={`Enter the name of Penanggung Jawab ${i}`} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={`jabatanPenanggungJawab${i}`}
                    label={`Jabatan Penanggung Jawab ${i} :`}
                    rules={[{ required: true, message: `Please enter the position of Penanggung Jawab ${i}` }]}
                  >
                    <Input placeholder={`Enter the position of Penanggung Jawab ${i}`} />
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
                                name={`peralatanKantor${i}`}
                                label={`Peralatan Kantor ${i} :`}
                                rules={[{ required: true, message: `Please enter the peralatan kantor ${i}` }]}
                            >
                                <Input placeholder={`Enter the peralatan kantor ${i}`} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            );
        }
        return forms;
    }

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

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="berbentuk"
                        label="Berbentuk :"
                        rules={[{ required: true, message: 'Please enter the type of company' }]}
                    >
                        <Radio.Group>
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
                    >
                        <Draggable
                            icon={<PiCalendarDuotone />}
                            topText="Click or drag file Akta to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
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
                    >
                        <Input placeholder="Enter the NIB OSS RBA" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="rukoType"
                        label="Ruko"
                        rules={[{ required: true, message: 'Please upload the Ruko Type' }]}
                    >
                        <Radio.Group>
                            <Radio value="sewa">Sewa</Radio>
                            <Radio value="milikSendiri">Milik Sendiri</Radio>
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
                    >
                        <Draggable
                            icon={<PiBuildingOfficeDuotone />}
                            topText="Click or drag file Foto Ruko to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
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

        </Form>
    )
}

export default SMKPO