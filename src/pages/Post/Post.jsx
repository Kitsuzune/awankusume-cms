import { Col, Input, message, Modal, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import Button from '../../components/ui/Button/Button';
import { DeleteOutlined, EditOutlined, EyeInvisibleTwoTone, EyeTwoTone, PlusOutlined } from '@ant-design/icons';
import { CustomPagination } from '../../components/ui/Table/CustomPagination';
import Loading from '../../components/ui/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../utils/api';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

const Post = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  const [pagination, setPagination] = useState({ page: 1, perPage: 10, totalData: 1 });
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState({
    key: 'id',
    order: 'desc',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiRequest('get', '/blog', {}, {
        page: pagination.page,
        perPage: pagination.perPage,
        where: "",
        orderBy: "id:desc"
      });

      setData(response.data.data.map((item) => ({
        ...item,
        key: item.id,
      })));

      setPagination({
        page: response.data.meta.currentPage,
        perPage: response.data.meta.perPage,
        totalData: response.data.meta.total,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.message ? error.response?.data?.message : 'Error While Fetching Data');
    }
  }

  useEffect(() => {
    fetchData();
  }, [pagination.page, pagination.perPage, search]);

  const deleteData = async (id) => {
    try {
      const response = await apiRequest('delete', `/blog/${id}`);
      message.success(response.data.message);
      fetchData();
      Modal.destroyAll();
    } catch (error) {
      message.error(error.response?.data?.message ? error.response?.data?.message : 'Error While Deleting Data');
    }
  }

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
                        <span className="text-[15px] mr-3">Query For: </span>
                        <Select
                          defaultValue={pagination.perPage}
                          style={{ width: 80 }}
                          onChange={(value) => {
                            setPagination({ ...pagination, perPage: value });
                          }}
                        >
                          <Option value={10}>10</Option>
                          <Option value={20}>20</Option>
                          <Option value={30}>30</Option>
                        </Select>
                        <span className="text-[15px] ml-3">Items Per Page</span>
                      </Col>
                      <Col className="flex gap-2">
                        <Input.Search placeholder="Search..."
                          onSearch={(value) => {
                            setSearch(value);
                            setPagination({
                              ...pagination,
                              page: 1,
                            });
                          }}
                        />
                        <Button type="primary" onClick={() => navigate("/app/post/add")}>
                          Add New
                          <PlusOutlined />
                        </Button>
                      </Col>
                    </Row>

                    {data.map((item) => (
                      <div className="flex items-center p-4 border-2 bg-white rounded-lg shadow-md mb-2 cursor-pointer hover:bg-gray-50 transition-all duration-300 hover:shadow-none">
                        <img src={`${process.env.REACT_APP_API_URL_CSM}/public/blog/${item.image}`} alt={item.title} className="w-16 h-16 rounded-md mr-4" />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <p className="text-sm text-gray-500">Published By {item.createdAt}</p>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                          {/* <span className="mr-2">⭐</span>
                          <span>{item.view}</span> */}

                          {item.show === 1 ? (
                            <BsEyeFill className="text-2xl text-second cursor-pointer hover:text-main transition-all duration-300" />
                          ) : (
                            <BsEyeSlashFill className="text-2xl text-second cursor-pointer hover:text-main transition-all duration-300" />
                          )}

                          <Button type="primary" onClick={() => navigate(`/app/post/${item.id}`)}>
                            Edit
                            <EditOutlined />
                          </Button>

                          <Button
                            onClick={() => {
                              Modal.info({
                                title: 'Delete Data',
                                centered: true,
                                content: (
                                  <React.Fragment>
                                    <div>Are you sure you want to delete this data?</div>
                                    <div className="mt-5 flex justify-end">
                                      <Button
                                        type="default"
                                        className="mr-2"
                                        onClick={() => {
                                          Modal.destroyAll();
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        type="primary"
                                        className="bg-main"
                                        onClick={() => deleteData(item.id)}
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </React.Fragment>
                                ),
                                footer: null,
                              });
                            }}
                          >
                            Delete
                            <DeleteOutlined />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <CustomPagination
                      data={data}
                      pagination={pagination}
                      changeLimit={(perPage) => {
                        setPagination({
                          ...pagination,
                          perPage,
                        });
                      }}
                      changePage={(page) => {
                        setPagination({
                          ...pagination,
                          page,
                        });
                      }}
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