import { Col, Input, Row, Select } from 'antd'
import React, { useState } from 'react'
import Button from '../../components/ui/Button/Button';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { CustomPagination } from '../../components/ui/Table/CustomPagination';
import Loading from '../../components/ui/Loading/Loading';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  return (
    <React.Fragment>
      <Row className="w-full">
        <Col span={24}>
          <div className="rounded-lg">
            <Row>
              <Col span={24}>
                <div className="flex flex-col">
                  <div className="bg-white p-5 rounded-lg">
                    <Row>
                      <Col span={24}>
                        <div className="text-[24px] text-main inline-block">Post</div>
                        <br />
                        <span className="text-[15px] inline-block mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span>
                      </Col>
                    </Row>
                  </div>

                  <div className="bg-white p-5 rounded-lg mt-5 border">
                    <Row justify="space-between" align="middle" className="mb-4">
                      <Col>
                        <Select defaultValue="10" style={{ width: 120 }}>
                          <Option value="10">Show all</Option>
                          <Option>10</Option>
                          <Option>20</Option>
                        </Select>
                      </Col>
                      <Col className="flex gap-2">
                        <Input.Search placeholder="Search..." />
                        <Button type="primary" onClick={() => navigate("/app/post/add")}>
                          Add New
                          <PlusOutlined />
                        </Button>
                        <Button type="primary">
                          Edit
                          <EditOutlined />
                        </Button>
                      </Col>
                    </Row>

                    {[1, 2, 3, 4].map((index) => (
                      <div className="flex items-center p-4 border-2 bg-white rounded-lg shadow-md mb-2">
                        <img src={"https://stationers.pk/cdn/shop/articles/c1.gif?v=1715370502"} alt={"Tes"} className="w-16 h-16 rounded-md mr-4" />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{"Lorem"}</h3>
                          <p className="text-sm text-gray-500">Published By {"Lorem"}, {"Lorem"}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">⭐</span>
                          <span>20</span>
                        </div>
                      </div>
                    ))}

                    <CustomPagination
                      data={
                        [1, 2, 3, 4]
                      }
                      pagination={{ page: 1, perPage: 10, totalData: 1 }}
                      changeLimit={() => { }}
                      changePage={() => { }}
                    />

                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Loading loading={loading} />
    </React.Fragment>
  )
}

export default Post