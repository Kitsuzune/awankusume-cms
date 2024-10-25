import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, Radio, message } from 'antd'
import Draggable from '../../../../../../../components/ui/File Upload/Draggable';
import { PiAlignBottomDuotone, PiBookBookmarkDuotone, PiBuildingOfficeDuotone, PiCalendarDuotone, PiCardholderDuotone, PiCardsThreeDuotone, PiCashRegisterDuotone, PiDiamondDuotone, PiFileArchiveDuotone, PiFilmScriptDuotone, PiFlowerLotusDuotone, PiIdentificationBadgeDuotone } from 'react-icons/pi';
import { apiRequest } from '../../../../../../../utils/api';
import { DownSquareTwoTone } from '@ant-design/icons';

const { Option } = Select;

const INSW = ({ dataView, handleDownload, handleDownloadZip }) => {
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

            <Row gutter={50} className="mt-4">
                <Col span={12}>
                    <Form.Item
                        name="tandaTanganDirektur"
                        label="TTD Utama Di Kertas Kosong :"
                    >
                        <Draggable
                            icon={<PiFileArchiveDuotone />}
                            topText={`File: ${dataView?.businessOrder?.tandaTanganDirektur}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.tandaTanganDirektur);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="tandaTanganPenanggungJawab"
                        label="TTD Penanggung Jawab Di Kertas Kosong :"
                    >
                        <Draggable
                            icon={<PiFilmScriptDuotone />}
                            topText={`File: ${dataView?.businessOrder?.tandaTanganPenanggungJawab}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.tandaTanganPenanggungJawab);
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
                        name="capPerusahaan"
                        label="CAP Perusahaan :"
                    >
                        <Draggable
                            icon={<PiFlowerLotusDuotone />}
                            topText={`File: ${dataView?.businessOrder?.capPerusahaan}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.capPerusahaan);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name={`username`}
                        label={`Username :`}
                    >
                        <Input name="ossUsername" defaultValue={dataView?.businessOrder?.ossUsername} disabled />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name={`passwords`}
                        label={`Password :`}
                    >
                        <Input name="ossPassword" defaultValue={dataView?.businessOrder?.ossPassword} disabled />
                    </Form.Item>
                </Col>
            </Row>

            <Button className='mt-4 w-full' onClick={handleDownloadZip}>
                <DownSquareTwoTone />
                Download All File In This Form As Zip
            </Button>

        </Form>
    )
}

export default INSW