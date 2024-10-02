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



const IzinBisnis = () => {
    const { Option } = Select;
    const [businessType, setBusinessType] = useState(null);

    const handleBusinessTypeChange = (value) => {
        setBusinessType(value);
    };

    return (
        <Form layout="vertical">
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="businessType"
                        label="Business Type :"
                        rules={[{ required: true, message: 'Please enter the business type' }]}
                    >
                        <Select placeholder="Select a business type" onChange={handleBusinessTypeChange}>
                            <Option value="IDAK">IDAK</Option>
                            <Option value="BPOM">BPOM</Option>
                            <Option value="Trademark Untuk Lokal Perorangan">Trademark Untuk Lokal Perorangan</Option>
                            <Option value="Trademark Untuk Badan Usaha">Trademark Untuk Badan Usaha</Option>
                            <Option value="Trademark Untuk Luar Negeri Perorangan">Trademark Untuk Luar Negeri Perorangan</Option>
                            <Option value="Trademark Untuk Badan Usaha Luar Negeri">Trademark Untuk Badan Usaha Luar Negeri</Option>
                            <Option value="SMKPO">SMKPO</Option>
                            <Option value="Klinik Pratama atau Klinik Kecantikan">Klinik Pratama atau Klinik Kecantikan</Option>
                            <Option value="INSW">INSW</Option>
                            <Option value="AKL">AKL</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            {businessType == 'IDAK' && (
                <IDAK />
            )}

            {businessType === 'BPOM' && (
                <BPOM />
            )}

            {businessType === 'Trademark Untuk Lokal Perorangan' && (
                <TrademarkLokalPerorangan />
            )}

            {businessType === 'Trademark Untuk Badan Usaha' && (
                <TrademarkBadanUsaha />
            )}

            {businessType === 'Trademark Untuk Luar Negeri Perorangan' && (
                <TrademarkLuarNegeriPerorangan />
            )}

            {businessType === 'Trademark Untuk Badan Usaha Luar Negeri' && (
                <TrademarkBadanUsahaLuarNegeri />
            )}

            {businessType === 'SMKPO' && (
                <SMKPO />
            )}

            {businessType === 'Klinik Pratama atau Klinik Kecantikan' && (
                <KlinikPratamaKecantikan />
            )}

            {businessType === 'INSW' && (
                <INSW />
            )}

            {businessType === 'AKL' && (
                <AKL />
            )}
        </Form>
    )

}

export default IzinBisnis