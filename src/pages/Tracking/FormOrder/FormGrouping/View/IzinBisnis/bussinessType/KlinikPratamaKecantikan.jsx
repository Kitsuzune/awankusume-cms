import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Checkbox, message } from 'antd'
import Draggable from '../../../../../../../components/ui/File Upload/Draggable';
import { PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiEnvelopeSimpleDuotone, PiFactoryDuotone, PiFarmDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';
import { apiRequest } from '../../../../../../../utils/api';
import { DownSquareTwoTone } from '@ant-design/icons';

const { Option } = Select;

const KlinikPratamaKecantikan = ({ dataView }) => {

    const renderDokterForms = () => {
        return dataView.businessOrder.dokter.map((dokter, i) => (
            <div key={i}>
                    <Row gutter={16}>
                        <Col span={20}>
                            <Form.Item
                                name={`namaDokter${i}`}
                                label={`Nama dokter ${i + 1} :`}
                            >
                                <Input name={`name`} defaultValue={dokter.name} disabled />
                            </Form.Item>
                        </Col>
                        <Col span={4} className="flex items-center">
                            <Form.Item
                                name={`penanggungjawab${i}`}
                                valuePropName="checked"
                                className="mb-0"
                            >
                                <Checkbox 
                                    defaultChecked={dokter.penanggungJawab}
                                    disabled
                                >
                                    Penanggung Jawab
                                </Checkbox>
                            </Form.Item>
                    </Col>
                </Row>
            </div>
        ));
    };

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

            {renderDokterForms()}

            <Row gutter={50}>
                <Col span={12}>
                    <Form.Item
                        name="namaPerawat"
                        label="Nama Perawat :"
                    >
                        <Input name="namaPerawat" defaultValue={dataView?.businessOrder?.namaPerawat} disabled />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="buktiSTR"
                        label="Bukti STR :"
                    >
                        <Draggable
                            icon={<PiEnvelopeSimpleDuotone />}
                            topText={`File: ${dataView?.businessOrder?.buktiStr}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            window.open(`${process.env.REACT_APP_API_URL_CSM}/public/showcase/${dataView?.businessOrder?.buktiStr}`, '_blank');
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
                        name="rukoRumah"
                        label="Ruko/Rumah :"
                    >
                        <Draggable
                            icon={<PiFactoryDuotone />}
                            topText={`File: ${dataView?.businessOrder?.rukoRumah}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            window.open(`${process.env.REACT_APP_API_URL_CSM}/public/showcase/${dataView?.businessOrder?.rukoRumah}`, '_blank');
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
                        name="lahanParkir"
                        label="Lahan Parkir :"
                    >
                        <Draggable
                            icon={<PiFarmDuotone />}
                            topText={`File: ${dataView?.businessOrder?.lahanParkir}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            window.open(`${process.env.REACT_APP_API_URL_CSM}/public/showcase/${dataView?.businessOrder?.lahanParkir}`, '_blank');
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            <Button className='mt-4 w-full'>
                <DownSquareTwoTone />
                Download All File In This Form As Zip
            </Button>

        </Form>
    )
}

export default KlinikPratamaKecantikan