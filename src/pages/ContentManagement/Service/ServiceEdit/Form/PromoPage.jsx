import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Switch, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { apiRequest } from '../../../../../utils/api'
import Loading from '../../../../../components/ui/Loading/Loading'

const PromoPage = ({ data, language, setData }) => {
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);

    const handleSubmit = async (item) => {
        try {
            setLoading(true);

            const dataLanguage = data.filter((item) => item.languageId === language)[0];
            setActive(item);

            const response = await apiRequest('PATCH', `/content/service-content/${dataLanguage.id}`, {
                promoShow: item ? '1' : '0',
            });

            setLoading(false);

            if (response.status === 200) {
                Modal.success({
                    title: 'Success',
                    content: 'Data has been updated',
                    centered: true,
                });
            }

        } catch (error) {
            setLoading(false);
            message.error(error.response?.data?.message || 'Something went wrong');
        }
    }

    useEffect(() => {
        const dataLanguage = data.filter((item) => item.languageId === language)[0];
        setActive(dataLanguage.promoShow == 1 ? true : false);
    }, [])

    return (
        <>
            <div className="mt-5 p-10 bg-white border rounded-lg">
                <div className='flex justify-between items-center'>
                    <div className='text-[24px] mb-5 text-main inline-block'>Promo</div>

                    <div className='flex justify-end gap-3'>
                        <span className='text-[15px]'>Hide</span>
                        <Switch
                            checked={active}
                            className='mx-2'
                            onClick={(checked) => handleSubmit(checked)}
                        />
                        <span className='text-[15px]'>Show</span>
                    </div>

                </div>
            </div>
            <Loading isLoading={loading} />

        </>
    )
}

export default PromoPage