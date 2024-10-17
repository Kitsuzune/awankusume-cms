import React, { useState, useCallback } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, message } from 'antd'
import { PiIdentificationBadgeDuotone, PiIdentificationCardDuotone } from 'react-icons/pi';
import { DownSquareTwoTone } from '@ant-design/icons';
import Draggable from '../../../../../../components/ui/File Upload/Draggable';

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

const LegalitasPP = ({ dataView }) => {

  const renderPengurusForms = () => {
    return dataView.companyOrder.administrator.map((administrator, i) => (
      <div key={i}>
        <span className='text-center font-bold inline-block w-full text-[20px] py-5 text-second'>Pengurus {i + 1}</span>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={`name${i}`}
              label={`Nama :`}
            >
              <Input name={`name${i}`} defaultValue={administrator.name} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={`jabatan${i}`}
              label="Jabatan :"
            >
              <Input name={`jabatan${i}`} defaultValue={administrator.jabatan} disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name={`saham${i}`}
              label="Saham :"
            >
              <Input name={`saham${i}`} defaultValue={administrator.saham} disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name={`nomorTelp${i}`}
              label="No. HP"
            >
              <Input name={`nomorTelp${i}`} defaultValue={administrator.nomorTelp} disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name={`email${i}`}
              label="Email"
            >
              <Input name={`email${i}`} defaultValue={administrator.email} disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="mt-4">
          <Col span={12}>
            <Form.Item
              name={`ktp${i}`}
              label="KTP"
            >
              <Draggable
                icon={<PiIdentificationCardDuotone />}
                topText={`File: ${administrator.ktp}`}
                bottomText="Supported Format : PDF, Max Size : 10 MB"
                disabled
              />
              <Button className='mt-2 w-full' onClick={() => {
                window.open(`${process.env.REACT_APP_API_URL_CSM}/public/showcase/${administrator.ktp}`, '_blank');
              }}>
                <DownSquareTwoTone />
                Download
              </Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={`npwp${i}`}
              label="NPWP"
            >
              <Draggable
                icon={<PiIdentificationBadgeDuotone />}
                topText={`File: ${administrator.npwp}`}
                bottomText="Supported Format : PDF, Max Size : 10 MB"
                disabled
              />
              <Button className='mt-2 w-full' onClick={() => {
                window.open(`${process.env.REACT_APP_API_URL_CSM}/public/showcase/${administrator.npwp}`, '_blank');
              }}>
                <DownSquareTwoTone />
                Download
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>
    ));
  }

  return (
    <Form layout="vertical">
      <Row gutter={16} className="mb-4">
        <Col span={24}>
          <Form.Item
            name="perusahaanType"
            label="Perusahaan Type :"
          >
            <Input name="perusahaanType" defaultValue={dataView?.companyOrder?.companyType} disabled />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="fullName"
            label="Full name :"
          >
            <Input name="fullName" defaultValue={dataView?.companyOrder?.fullName} disabled />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email :"
          >
            <Input name="email" defaultValue={dataView?.companyOrder?.email} disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="No.Phone :"
          >
            <Input name="nomorTelp" defaultValue={dataView?.companyOrder?.nomorTelp} disabled />
          </Form.Item>
        </Col>
      </Row>

      <span className='text-center font-bold inline-block w-full text-[20px] py-5 text-second'>Nama PT</span>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="namaPT"
            label="Nama PT :"
          >
            <Input name="namaPt" defaultValue={dataView?.companyOrder?.namaPt} disabled />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="namaAlternatifPT1"
            label="Nama Alternatif PT 1 :"
          >
            <Input name="namaPt1" defaultValue={dataView?.companyOrder?.namaPt1} disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="namaAlternatifPT2"
            label="Nama Alternatif PT 2 :"
          >
            <Input name="namaPt2" defaultValue={dataView?.companyOrder?.namaPt2} disabled />
          </Form.Item>
        </Col>
      </Row>

      {renderPengurusForms()}

      <span className='text-center font-bold inline-block w-full text-[20px] py-5 text-second'>Modal Pasar</span>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="ditempatkan"
            label="Ditempatkan"
          >
            <Input name="modalPasarDitempatkan" defaultValue={dataView?.companyOrder?.modalPasarDitempatkan} disabled addonBefore="Rp." />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="disetor"
            label="Disetor"
          >
            <Input name="modalPasarDisetor" defaultValue={dataView?.companyOrder?.modalPasarDisetor} disabled addonBefore="Rp." />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="bidangUsaha"
            label="Bidang Usaha (KBLI 2020) :"
          >
            <Select
              // mode="multiple"
              // allowClear
              // style={{ width: '100%' }}
              // placeholder="Select Bidang Usaha"
              // onChange={(value) => setData(prevData => ({ ...prevData, bidangUsaha: value }))}
              // options={[
              //   { value: '1', label: 'Bidang Usaha 1' },
              //   { value: '2', label: 'Bidang Usaha 2' },
              //   { value: '3', label: 'Bidang Usaha 3' },
              // ]}
              defaultValue={dataView?.companyOrder?.bidangUsaha}
              disabled
            />
          </Form.Item>
        </Col>
      </Row>


      <span className='text-center font-bold inline-block w-full text-[20px] py-5 text-second'>Tambahan</span>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="emailTambahan"
            label="Email Tambahan :"
          >
            <Input name="emailTambahan" defaultValue={dataView?.companyOrder?.emailTambahan} disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="noHPTambahan"
            label="No. HP Tambahan :"
          >
            <Input name="nomorTelpKantor" defaultValue={dataView?.companyOrder?.nomorTelpKantor} disabled />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="alamatTambahan"
            label="Alamat Tambahan :"
          >
            <TextArea
              placeholder="Enter the address"
              autoSize={{ minRows: 6, maxRows: 6 }}
              name="alamat"
              defaultValue={dataView?.companyOrder?.alamat}
              disabled
            />
          </Form.Item>
        </Col>
      </Row>

      <Button className='mt-4 w-full'>
        <DownSquareTwoTone />
        Download All File In This Form As Zip
      </Button>


    </Form>
  )
}

export default LegalitasPP