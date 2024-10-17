import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Radio, message } from 'antd'
import Draggable from '../../../../../../../components/ui/File Upload/Draggable';
import { PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';
import { apiRequest } from '../../../../../../../utils/api';
import { DownSquareTwoTone } from '@ant-design/icons';

const { Option } = Select;

const SMKPO = ({ dataView }) => {

    const renderPenanggungJawab = () => {
        return dataView.businessOrder.responsible.map((responsible, i) => (
            <div key={i}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name={`name${i}`}
                            label={`Nama Penanggung Jawab ${i + 1} :`}
                        >
                            <Input name={`name${i}`} defaultValue={responsible.name} disabled />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={`jabatan${i}`}
                            label={`Jabatan Penanggung Jawab ${i + 1} :`}
                        >
                            <Input name={`jabatan${i}`} defaultValue={responsible.jabatan} disabled />
                        </Form.Item>
                    </Col>
                </Row>
            </div>
        ));
    }

    const renderPeralatanKantor = () => {
        return dataView.businessOrder.officeEquipment.map((officeEquipment, i) => (
            <div key={i}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name={`peralatanKantor${i}`}
                            label={`Peralatan Kantor ${i + 1} :`}
                        >
                            <Input name={`peralatanKantor${i}`} defaultValue={officeEquipment.peralatanKantor} disabled />
                        </Form.Item>
                    </Col>
                </Row>
            </div>
        ));
    }

    return (
        <Form layout="vertical">

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="fullName"
                        label="Full name :"
                    >
                        <Input name="fullName" defaultValue={dataView?.businessOrder?.fullName} disabled />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email :"
                    >
                        <Input name="email" defaultValue={dataView?.businessOrder?.email} disabled />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="phone"
                        label="No.Phone :"
                    >
                        <Input name="nomorTelp" defaultValue={dataView?.businessOrder?.nomorTelp} disabled />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="berbentuk"
                        label="Berbentuk :"
                    >
                        <Radio.Group name="bentuk" defaultValue={dataView?.businessOrder?.bentuk} disabled>
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
                    >
                        <Draggable
                            icon={<PiCalendarDuotone />}
                            topText={`File: ${dataView?.businessOrder?.akta}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            window.open(`${process.env.REACT_APP_API_URL_CSM}/public/showcase/${dataView?.businessOrder?.akta}`, '_blank');
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="sk"
                        label="SK"
                    >
                        <Draggable
                            icon={<PiCardholderDuotone />}
                            topText={`File: ${dataView?.businessOrder?.sk}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            window.open(`${process.env.REACT_APP_API_URL_CSM}/public/showcase/${dataView?.businessOrder?.sk}`, '_blank');
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="npwp"
                        label="NPWP"
                    >
                        <Draggable
                            icon={<PiIdentificationBadgeDuotone />}
                            topText="Click or drag file NPWP to this area to upload"
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            window.open(`${process.env.REACT_APP_API_URL_CSM}/public/showcase/${dataView?.businessOrder?.npwp}`, '_blank');
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="nibOssRba"
                        label="NIB OSS RBA"
                    >
                        <Input name="nibOssRba" defaultValue={dataView?.businessOrder?.nibOssRba} disabled />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="ruko"
                        label="Ruko"
                    >
                        <Radio.Group name="ruko" defaultValue={dataView?.businessOrder?.ruko} disabled>
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
                    >
                        <Draggable
                            icon={<PiBuildingOfficeDuotone />}
                            topText={`File: ${dataView?.businessOrder?.rukoImage}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            window.open(`${process.env.REACT_APP_API_URL_CSM}/public/showcase/${dataView?.businessOrder?.rukoImage}`, '_blank');
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            {renderPenanggungJawab()}
            
            {renderPeralatanKantor()}

            <Button className='mt-4 w-full'>
                <DownSquareTwoTone />
                Download All File In This Form As Zip
            </Button>


        </Form>
    )
}

export default SMKPO