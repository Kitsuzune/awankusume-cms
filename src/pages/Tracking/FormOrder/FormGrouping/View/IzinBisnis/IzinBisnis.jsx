import React, { useEffect, useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button } from 'antd'
import { PiIdentificationBadgeDuotone, PiIdentificationCardDuotone } from 'react-icons/pi';
import IDAK from './bussinessType/IDAK';
import BPOM from './bussinessType/BPOM';
import TrademarkLokalPerorangan from './bussinessType/TrademarkLokalPerorangan';
import TrademarkBadanUsaha from './bussinessType/TrademarkBadanUsaha';
import TrademarkLuarNegeriPerorangan from './bussinessType/TrademarkLuarNegeriPerorangan';
import TrademarkBadanUsahaLuarNegeri from './bussinessType/TrademarkBadanUsahaLuarNegeri';
import SMKPO from './bussinessType/SMKPO';
import KlinikPratamaKecantikan from './bussinessType/KlinikPratamaKecantikan';
import INSW from './bussinessType/INSW';
import AKL from './bussinessType/AKL';



const IzinBisnis = ({ dataView }) => {
    const { Option } = Select;
    const [businessType, setBusinessType] = useState(dataView.businessOrder.businessTypeId);

    return (
        <>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="businessType"
                        label="Business Type :"
                        rules={[{ required: true, message: 'Please enter the business type' }]}
                    >
                        <Select defaultValue={businessType} value={businessType} disabled>
                            <Option value={1}>IDAK</Option>
                            <Option value={2}>BPOM</Option>
                            <Option value={3}>Trademark Untuk Lokal Perorangan</Option>
                            <Option value={4}>Trademark Untuk Badan Usaha</Option>
                            <Option value={5}>Trademark Untuk Luar Negeri Perorangan</Option>
                            <Option value={6}>Trademark Untuk Badan Usaha Luar Negeri</Option>
                            <Option value={7}>SMKPO</Option>
                            <Option value={8}>Klinik Pratama atau Klinik Kecantikan</Option>
                            <Option value={9}>INSW</Option>
                            <Option value={10}>AKL</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>



            {businessType == 1 && (
                <IDAK dataView={dataView} />
            )}

            {businessType === 2 && (
                <BPOM dataView={dataView} />
            )}

            {businessType === 3 && (
                <TrademarkLokalPerorangan dataView={dataView} />
            )}

            {businessType === 4 && (
                <TrademarkBadanUsaha dataView={dataView} />
            )}

            {businessType === 5 && (
                <TrademarkLuarNegeriPerorangan dataView={dataView} />
            )}

            {businessType === 6 && (
                <TrademarkBadanUsahaLuarNegeri dataView={dataView} />
            )}

            {businessType === 7 && (
                <SMKPO dataView={dataView} />
            )}

            {businessType === 8 && (
                <KlinikPratamaKecantikan dataView={dataView} />
            )}

            {businessType === 9 && (
                <INSW dataView={dataView} />
            )}

            {businessType === 10 && (
                <AKL dataView={dataView} />
            )}
        </>
    )

}

export default IzinBisnis