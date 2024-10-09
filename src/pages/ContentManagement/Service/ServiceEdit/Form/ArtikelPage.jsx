import React from 'react'
import { Button, Row, Col, Switch } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const ArtikelPage = () => {
    return (
        <div className="mt-5 p-10 bg-white border rounded-lg">
            <div className='flex justify-between items-center'>
                <div className='text-[24px] mb-5 text-main inline-block'>Artikel</div>

                <div className='flex justify-end gap-3'>
                    <span className='text-[15px]'>Hide</span>
                    <Switch defaultChecked />
                    <span className='text-[15px]'>Show</span>
                </div>

            </div>
        </div>
    )
}

export default ArtikelPage