import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import ServiceEditStep1 from './Step/ServiceEditStep1';
import ServiceEditStep2 from './Step/ServiceEditStep2';

const ServiceEdit = () => {
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [currentStep, setCurrentStep] = useState(1); // State untuk mengelola langkah saat ini

    const handleNextPage = () => {
        setCurrentStep(2); // Ubah ke langkah kedua
    };

    return (
        <Row className="w-full">
            <Col span={24}>
                <div className="rounded-lg">
                    <Row>
                        <Col span={24}>
                            <div className="flex flex-col">
                                <div className='bg-white p-5 rounded-lg'>
                                    <Row>
                                        <Col span={24}>
                                            <div className='text-[24px] text-main inline-block'>
                                                Service / {id} {currentStep === 2 && '/ Detail'}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                                {currentStep === 1 ? (
                                    <ServiceEditStep1 image={image} setImage={setImage} onNext={handleNextPage} />
                                ) : (
                                    <ServiceEditStep2 />
                                )}

                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
};

export default ServiceEdit;