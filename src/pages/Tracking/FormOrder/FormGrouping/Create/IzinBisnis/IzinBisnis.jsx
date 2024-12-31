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
import { apiRequest } from '../../../../../../utils/api';

const IzinBisnis = ({ customerId, makelarId }) => {
    const { Option } = Select;
    const [businessType, setBusinessType] = useState(null);
    const [businessTypeList, setBusinessTypeList] = useState([]);

    const businessComponents = {
        1: IDAK,
        2: BPOM,
        3: TrademarkLokalPerorangan,
        4: TrademarkBadanUsaha,
        5: TrademarkLuarNegeriPerorangan,
        6: TrademarkBadanUsahaLuarNegeri,
        7: SMKPO,
        8: KlinikPratamaKecantikan,
        9: INSW,
        10: AKL,
    };

    const handleBusinessTypeChange = (value) => {
        setBusinessType(value);
    };

    const fetchBusinessTypeList = async () => {
        try {
            const response = await apiRequest('get', '/order/business-type/all?type=bisnis');
            setBusinessTypeList(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBusinessTypeList();
    }, []);

    return (
        <>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="businessType"
                        label="Business Type :"
                        rules={[{ required: true, message: 'Please enter the business type' }]}
                    >
                        <Select placeholder="Select a business type" onChange={handleBusinessTypeChange}>
                            {businessTypeList.map((item) => (
                                <Option value={item.id}>{item.name}</Option>
                            ))}
                            {/* <Option value="IDAK">IDAK</Option>
                            <Option value="BPOM">BPOM</Option>
                            <Option value="Trademark Untuk Lokal Perorangan">Trademark Untuk Lokal Perorangan</Option>
                            <Option value="Trademark Untuk Badan Usaha">Trademark Untuk Badan Usaha</Option>
                            <Option value="Trademark Untuk Luar Negeri Perorangan">Trademark Untuk Luar Negeri Perorangan</Option>
                            <Option value="Trademark Untuk Badan Usaha Luar Negeri">Trademark Untuk Badan Usaha Luar Negeri</Option>
                            <Option value="SMKPO">SMKPO</Option>
                            <Option value="Klinik Pratama atau Klinik Kecantikan">Klinik Pratama atau Klinik Kecantikan</Option>
                            <Option value="INSW">INSW</Option>
                            <Option value="AKL">AKL</Option> */}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            {/* {businessType == 1 && (
                <IDAK customerId={customerId} makelarId={makelarId} />
            )}

            {businessType === 2 && (
                <BPOM customerId={customerId} makelarId={makelarId} />
            )}

            {businessType === 3 && (
                <TrademarkLokalPerorangan customerId={customerId} makelarId={makelarId} />
            )}

            {businessType === 4 && (
                <TrademarkBadanUsaha customerId={customerId} makelarId={makelarId} />
            )}

            {businessType === 5 && (
                <TrademarkLuarNegeriPerorangan customerId={customerId} makelarId={makelarId} />
            )}

            {businessType === 6 && (
                <TrademarkBadanUsahaLuarNegeri customerId={customerId} makelarId={makelarId} />
            )}

            {businessType === 7 && (
                <SMKPO customerId={customerId} makelarId={makelarId} />
            )}

            {businessType === 8 && (
                <KlinikPratamaKecantikan customerId={customerId} makelarId={makelarId} />
            )}

            {businessType === 9 && (
                <INSW customerId={customerId} makelarId={makelarId} />
            )}

            {businessType === 10 && (
                <AKL customerId={customerId} makelarId={makelarId} />
            )} */}

            {businessType && React.createElement(businessComponents[businessType], { customerId, makelarId })}

        </>
    )

}

export default IzinBisnis