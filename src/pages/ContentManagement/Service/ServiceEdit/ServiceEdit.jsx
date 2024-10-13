import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import ServiceEditStep1 from './Step/ServiceEditStep1';
import ServiceEditStep2 from './Step/ServiceEditStep2';

const ServiceEdit = () => {
    const [ id, setId ] = useState(useParams().id);
    const [image, setImage] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [desainId, setDesainId] = useState(null);
    const [data, setData] = useState([]);
    const [language, setLanguage] = useState(1);
    const [showcase, setShowcase] = useState({});

    const handleNextPage = () => {
        setCurrentStep(2);
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
                                    <ServiceEditStep1 image={image} setImage={setImage} onNext={handleNextPage} id={id} setId={setId} data={data} setData={setData} language={language} setLanguage={setLanguage} setDesainId={setDesainId}/>
                                ) : (
                                    <ServiceEditStep2 desainId={desainId} setDesainId={setDesainId} data={data} setData={setData} language={language} showcase={showcase} setShowcase={setShowcase}/>
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