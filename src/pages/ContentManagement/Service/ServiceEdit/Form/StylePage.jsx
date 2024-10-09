import React from 'react'
import { Row, Col, Form, Input, Select, Button } from 'antd';

const StylePage = () => {
    return (
        <div className="mt-5 p-10 bg-white border rounded-lg">
            <Row>
                <Col span={24}>
                    <Form.Item
                        name="stylePage"
                        label="Style Page"
                    >
                        <Select
                            showSearch
                            placeholder="Select Style"
                            optionFilterProp="label"
                            options={[
                                {
                                    value: 'Modern',
                                    label: 'Modern',
                                },
                                {
                                    value: 'Classic',
                                    label: 'Classic',
                                },
                                {
                                    value: 'Minimalist',
                                    label: 'Minimalist',
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <div className="mt-5 flex justify-end">
                <Button type="default" className="mr-2">Cancel</Button>
                <Button type="primary" className='bg-main'>Save</Button>
            </div>
        </div>
    )
}

export default StylePage