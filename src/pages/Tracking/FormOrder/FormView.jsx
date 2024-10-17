import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from '../../../utils/api';
import IzinBisnis from './FormGrouping/View/IzinBisnis/IzinBisnis';
import Loading from './../../../components/ui/Loading/Loading';
import { Col, Form, Row, Input, message } from 'antd';
import LegalitasPP from './FormGrouping/View/PendirianPerusahaan/LegalitasPP';

const FormView = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataView, setDataView] = useState(null);

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                setLoading(true);
                const response = await apiRequest('GET', `/order/${id}`);
                setDataView(response?.data?.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                message.error('Failed to fetch form data');
                console.error('Failed to fetch form data', error);
            }
        };

        fetchFormData();
    }, []);

    return (
        <React.Fragment>

            <Row className="w-full">
                <Col span={24}>
                    <Row>
                        <Col span={24}>
                            <div className="bg-white p-5 rounded-lg">
                                <Row>
                                    <Col span={24}>
                                        <div className="text-[24px] text-main inline-block">Form Order {dataView?.serialCode}</div>
                                        <br />
                                        <span className="text-[15px] inline-block mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mt-5 flex flex-col border rounded-lg">
                                <div className='bg-white px-10 py-5 rounded-lg'>
                                    <Form layout="vertical">
                                        <Row gutter={16}>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="customerId"
                                                    label="Customer :"
                                                >
                                                    <Input defaultValue={dataView?.businessOrder?.fullName} disabled />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={16}>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="makelarId"
                                                    label="Makelar :"
                                                >
                                                    <Input defaultValue={null} disabled />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {dataView?.serviceType === 'IZIN_BISNIS' && (
                                            <IzinBisnis dataView={dataView} />
                                        )}

                                        {dataView?.serviceType === 'PENDIRIAN_PERUSAHAAN' && (
                                            <LegalitasPP dataView={dataView} />
                                        )}

                                    </Form>

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>



            <Loading className='h-screen' isLoading={loading} />

        </React.Fragment>
    );
};

export default FormView;