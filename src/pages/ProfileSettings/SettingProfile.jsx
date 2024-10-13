import React from 'react'
import { Row, Col, Card, Avatar, Divider, Button } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { FaBookBookmark } from 'react-icons/fa6'
import { LuArrowLeftRight, LuHistory } from 'react-icons/lu'

const SettingProfile = () => {
    return (
        <Card className="rounded-lg shadow-lg p-10 m-10">
            <Row gutter={16}>
                <Col xs={24} sm={24} md={6}>
                    <Avatar shape="square" size={100} src="https://via.placeholder.com/100" />
                    <div className="mt-3 text-lg font-bold">Billy Dwi F</div>
                    <span className="text-gray-500">CEO / Co-Founder</span>
                </Col>
                <Col xs={24} sm={24} md={18}>
                    <Button type="link" className="float-right" icon={<SettingOutlined />}>
                        Edit Profile
                    </Button>
                </Col>
            </Row>

            <Row gutter={16} className="mt-10">
                <Col xs={24} sm={24} md={11}>
                    <div className="text-base font-semibold">Profile Information</div>
                    <span>
                        Hi, I'm Alec Thompson. Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
                    </span>
                    <Divider className='border-main rounded' />
                    <div><strong>Full Name:</strong> Kevin Dwi Teguh</div>
                    <div><strong>Mobile:</strong> (+62) 123 1234 123</div>
                    <div><strong>Email:</strong> kevinteguh@gmail.com</div>
                    <div><strong>Location:</strong> IDN</div>
                </Col>
                <Col xs={0} sm={0} md={1}>
                    <Divider type="vertical" className="h-full border-main border-2 rounded" />
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <div className="text-base font-semibold">Overview</div>

                    <div className="flex flex-wrap justify-between">

                        <div className='border rounded-xl flex justify-between p-4 gap-10 w-full md:w-80'>
                            <div className='flex flex-col'>
                                <span>On going</span>
                                <div className="text-2xl font-bold">1000000</div>
                            </div>

                            <div className='h-full flex items-center p-4 bg-main rounded-xl shadow-lg text-white'>
                                <FaBookBookmark />
                            </div>
                        </div>

                        <div className='border rounded-xl flex justify-between p-4 gap-10 w-full md:w-80'>
                            <div className='flex flex-col'>
                                <span>Completed</span>
                                <div className="text-2xl font-bold">1000000</div>
                            </div>

                            <div className='h-full flex items-center p-4 bg-main rounded-xl shadow-lg text-white'>
                                <FaBookBookmark />
                            </div>
                        </div>

                    </div>
                    
                    <div className="flex flex-wrap justify-between mt-5">

                        <div className='border rounded-xl flex justify-between p-4 gap-10 w-full md:w-80'>
                            <div className='flex flex-col'>
                                <span>On going</span>
                                <div className="text-2xl font-bold">1000000</div>
                            </div>

                            <div className='h-full flex items-center p-4 bg-main rounded-xl shadow-lg text-white'>
                                <FaBookBookmark />
                            </div>
                        </div>

                        <div className='flex flex-col justify-normal gap-2 w-full md:w-80'>
                            <div className='flex items-center gap-2 border rounded-xl p-2 hover:bg-main hover:text-white transition-all duration-300 cursor-pointer'>
                                <LuArrowLeftRight />
                                <span>Tukarkan Komisi</span>
                            </div>

                            <div className='flex items-center gap-2 border rounded-xl p-2 hover:bg-main hover:text-white transition-all duration-300 cursor-pointer'>
                                <LuHistory />
                                <span>Riwayat</span>
                            </div>
                        </div>

                    </div>
                </Col>
            </Row>
        </Card>
    )
}

export default SettingProfile
