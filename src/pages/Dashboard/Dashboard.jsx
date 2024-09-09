import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Col, Row } from 'antd';

Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

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

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    // <div>
    //   <h2>Dashboard</h2>
    //   <div>
    //     <h3>Bar Chart</h3>
    //     <Bar data={barData} />
    //   </div>
    //   <div>
    //     <h3>Line Chart</h3>
    //     <Line data={lineData} />
    //   </div>
    //   <div>
    //     <h3>Pie Chart</h3>
    //     <Pie data={pieData} />
    //   </div>
    // </div>
    <Row className="w-full">
      <Col span={24}>
        <div className="rounded-lg">
          <Row>
            <Col span={24}>
              <div className="flex flex-col">
                <div className="">

                  <div className='bg-white p-5 rounded-lg'>
                    <Row>
                      <Col span={24}>
                        <h3 className='text-[30px] font-bold text-center'>Insight Dashboard</h3>
                      </Col>
                    </Row>
                    <Row gutter={40} align="middle" className="mb-4">
                      <Col span={12}>
                        <Bar data={barData} />
                      </Col>
                      <Col span={12}>
                        <Line data={lineData} />
                      </Col>
                    </Row>
                  </div>

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