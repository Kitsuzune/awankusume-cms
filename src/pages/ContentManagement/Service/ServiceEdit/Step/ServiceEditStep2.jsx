import React from 'react';
import { Row, Col, Form, Input, Button, Switch } from 'antd';
import StylePage from '../Form/StylePage';
import ShowcasePage from '../Form/ShowcasePage';
import ServiceSyaratPage from '../Form/ServiceSyaratPage';
import FaqPage from '../Form/FaqPage';
import ArtikelPage from '../Form/ArtikelPage';
import PromoPage from '../Form/PromoPage';

const ServiceEditStep2 = () => {
    return (

        <Form layout="vertical">
            <StylePage />

            <ShowcasePage />

            <ServiceSyaratPage />

            <FaqPage />

            <ArtikelPage />

            <PromoPage />

            <div className="mt-5 flex justify-end">
                <Button type="default" className="mr-2">Cancel</Button>
                <Button type="primary" className='bg-main'>Save</Button>
            </div>
        </Form>

    );
};

export default ServiceEditStep2;