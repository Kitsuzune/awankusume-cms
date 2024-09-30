import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Col, Row } from 'antd';
import { BiArrowToRight } from 'react-icons/bi';

Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue',
        data: [15, 10, 5, 2, 20, 30],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
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
                      <span className='text-[24px] font-bold inline-block'>Welcome, Alex!</span>
                      <br />
                      <span className='text-[15px] inline-block mt-5'>Everything is in your control, use quick access buttons to manage related actions easily.</span>
                    </Col>
                  </Row>
                </div>

                <div className='mt-5'>
                  <Row gutter={16} className='flex'>
                    <Col span={16} className='flex flex-col'>
                      <div className='bg-white rounded-lg border border-gray-200 flex-grow'>
                        <div className='text-center border-b border-gray-200 p-5'>
                          <span className='text-[23px] inline-block'>Sales Overview</span>
                        </div>
                        <div className='p-10'>
                          <Line data={lineData} width={100} height={40} />
                        </div>
                      </div>
                    </Col>

                    <Col span={8} className='flex flex-col'>
                      <div className='bg-white rounded-lg border border-gray-200 flex-grow'>
                        <div className='border-b border-gray-200 px-5 py-3'>
                          <span className='text-[13px] inline-block'>
                            On Going Projects
                          </span>
                          <br />
                          <span className='text-[18px] font-bold inline-block'>
                            12
                          </span>
                        </div>

                        {[1, 2, 3, 4, 5, 6].map((index) => (
                          <div key={index} className='px-5 py-2 border-b border-gray-200'>
                            <span className='text-[13px] inline-block'>
                              Lorem ipsum dolor sit amet
                            </span>
                            <br />
                            <span className='text-[13px] inline-block text-second'>
                              Published, 22 Mei 2024
                            </span>
                          </div>
                        ))}

                        <div className='px-5 py-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer'>
                          <div className='flex items-center'>
                            <div className='text-[13px]'>
                              See More ...
                            </div>
                            <BiArrowToRight className='inline-block ml-3 text-[20px]' />
                          </div>
                          
                        </div>

                      </div>
                    </Col>
                  </Row>
                </div>

                <div className='mt-5'>
                  <Row>
                    <Col span={8}>
                      <div className='bg-white rounded-lg border border-gray-200 flex-grow'>
                        <div className='text-center border-b border-gray-200 p-5'>
                          <span className='text-[23px] inline-block'>Sales Overview</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>


              </div>
            </Col>

          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default Dashboard;