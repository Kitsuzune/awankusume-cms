import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Form, Button, message } from 'antd';
import Draggable from '../../../../../../../components/ui/File Upload/Draggable';
import { PiFoldersDuotone } from 'react-icons/pi';
import { DownSquareTwoTone } from '@ant-design/icons';

const AKL = ({ dataView, handleDownload, handleDownloadZip }) => {

    const renderMaterialMSDS = () => {
        return dataView.businessOrder.material.map((material, i) => (
            <div key={i}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name={`listMaterialMSDS${i}`}
                            label={`List Material di dalam dan MSDS ${i + 1} :`}
                        >
                            <Draggable
                                icon={<PiFoldersDuotone />}
                                topText={`File: ${material.material}`}
                                bottomText="Supported Format : PDF, Max Size : 10 MB"
                                disabled={true}
                            />
                            <Button className='mt-2 w-full' onClick={() => {
                                handleDownload(dataView.businessOrder.material[i].material);
                            }}>
                                <DownSquareTwoTone />
                                Download
                            </Button>
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

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="loa"
                        label="LoA yang telah di legalisir oleh KBRI atau apostile :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.loa}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.loa);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="cfs"
                        label="CFS :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.cfs}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.cfs);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            {dataView.businessOrder.iso13485 && (
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="iso13485"
                            label="ISO 13485 :"
                        >
                            <Draggable
                                icon={<PiFoldersDuotone />}
                                topText={`File: ${dataView?.businessOrder?.iso13485}`}
                                bottomText="Supported Format : PDF, Max Size : 10 MB"
                                disabled
                            />
                            <Button className='mt-2 w-full' onClick={() => {
                                handleDownload(dataView?.businessOrder?.iso13485);
                            }}>
                                <DownSquareTwoTone />
                                Download
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            )}

            {renderMaterialMSDS()}

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="flowProductionChart"
                        label="Flow Production chart :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.flowProductionChart}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.flowProductionChart);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="clinicalTrial"
                        label="Clinical Trial :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.clinicalTrial}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.clinicalTrial);
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
                        name="spesificationAndBrosshure"
                        label="Specification dan Broshure :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.spesificationAndBrosshure}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.spesificationAndBrosshure);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="documentVerificationAndValidation"
                        label="Document Verification and Validation :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.documentVerificationAndValidation}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.documentVerificationAndValidation);
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
                        name="biocompatibility"
                        label="Biocompatibility :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.biocompatibility}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.biocompatibility);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="preclinicalTrial"
                        label="Pre Clinical Trial :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.preclinicalTrial}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.preclinicalTrial);
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
                        name="clinicalEvaluation"
                        label="Clinical Evaluation :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.clinicalEvaluation}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.clinicalEvaluation);
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
                        name="iso14971"
                        label="ISO 14971 :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.iso14971}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.iso14971);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="coa"
                        label="CoA :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.coa}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.coa);
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
                        name="penandaLuarIndonesia"
                        label="Penanda di luar Indonesia :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.penandaLuarIndonesia}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.penandaLuarIndonesia);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="simbolPackagingLuar"
                        label="Simbol di packaging luar :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.simbolPackagingLuar}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.simbolPackagingLuar);
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
                        name="tandaExpiredDate"
                        label="Tanda Expired Date :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.tandaExpiredDate}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.tandaExpiredDate);
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
                        name="manualGuideline"
                        label="Manual Guideline :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.manualGuideline}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.manualGuideline);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="aksesorisDisertakan"
                        label="Aksesoris Disertakan :"
                    >
                        <Draggable
                            icon={<PiFoldersDuotone />}
                            topText={`File: ${dataView?.businessOrder?.aksesorisDisertakan}`}
                            bottomText="Supported Format : PDF, Max Size : 10 MB"
                            disabled
                        />
                        <Button className='mt-2 w-full' onClick={() => {
                            handleDownload(dataView?.businessOrder?.aksesorisDisertakan);
                        }}>
                            <DownSquareTwoTone />
                            Download
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            <Button className='mt-4 w-full' onClick={handleDownloadZip}>
                <DownSquareTwoTone />
                Download All File In This Form As Zip
            </Button>

        </Form>
    );
};

export default AKL;
