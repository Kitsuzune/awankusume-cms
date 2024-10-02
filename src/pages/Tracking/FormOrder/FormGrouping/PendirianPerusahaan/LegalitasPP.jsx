import React, { useState } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button } from 'antd'
import Draggable from '../../../../../components/ui/File Upload/Draggable';
import { PiIdentificationBadgeDuotone, PiIdentificationCardDuotone } from 'react-icons/pi';

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

const LegalitasPP = () => {
  const [pengurusCount, setPengurusCount] = useState(1);
  const [perusahaanType, setPerusahaanType] = useState(null);

  const addPengurus = () => {
    setPengurusCount(pengurusCount + 1);
  };

  const handlePerusahaanTypeClick = (type) => {
    setPerusahaanType(type);
  };

  const renderPengurusForms = () => {
    const forms = [];
    for (let i = 1; i <= pengurusCount; i++) {
      forms.push(
        <div key={i}>
          <span className='text-center font-bold inline-block w-full text-[20px] py-5 text-second'>Pengurus {i}</span>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={`namaPengurus${i}`}
                label={`Nama Pengurus ${i} :`}
                rules={[{ required: true, message: `Please enter the name of manager ${i}` }]}
              >
                <Input placeholder={`Enter the name of manager ${i}`} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={`jabatan${i}`}
                label="Jabatan :"
                rules={[{ required: true, message: 'Please enter the position' }]}
              >
                <Input placeholder="Enter the position" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={`saham${i}`}
                label="Saham :"
                rules={[{ required: true, message: 'Please enter the shares' }]}
              >
                <Input placeholder="Enter the shares" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={`noHP${i}`}
                label="No. HP"
                rules={[{ required: true, message: 'Please enter the phone number' }]}
              >
                <Input placeholder="Enter the phone number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={`emailPengurus${i}`}
                label="Email"
                rules={[{ required: true, message: 'Please enter the email' }]}
              >
                <Input placeholder="Enter the email" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      );
    }
    return forms;
  };

  return (
    <Form layout="vertical">
      <Row gutter={16} className="mb-4">
        <Col span={12}>
          <div
            className={`p-4 text-center border rounded cursor-pointer ${perusahaanType === 'PT' ? 'bg-main text-white' : 'text-main'}`}
            onClick={() => handlePerusahaanTypeClick('PT')}
          >
            <div>PT</div>
            <div>(Perseroan Terbatas)</div>
          </div>
        </Col>
        <Col span={12}>
          <div
            className={`p-4 text-center border rounded cursor-pointer ${perusahaanType === 'CV' ? 'bg-main text-white' : 'text-main'}`}
            onClick={() => handlePerusahaanTypeClick('CV')}
          >
            <div>CV</div>
            <div>(Commanditaire Vennootschap)</div>
          </div>
        </Col>
      </Row>


      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="customerField"
            label="Customer Field :"
          >
            <Select
              placeholder="Select Customer"
            >
              <Option value="Customer 1">Customer 1</Option>
              <Option value="Customer 2">Customer 2</Option>
              <Option value="Customer 3">Customer 3</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="fullName"
            label="Full name :"
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email :"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="No.Phone :"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>
        </Col>
      </Row>

      <span className='text-center font-bold inline-block w-full text-[20px] py-5 text-second'>Nama PT</span>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="namaPT"
            label="Nama PT :"
            rules={[{ required: true, message: 'Please enter the name of the PT' }]}
          >
            <Input placeholder="Enter the name of the PT" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="namaAlternatifPT1"
            label="Nama Alternatif PT 1 :"
            rules={[{ required: true, message: 'Please enter the first alternative name of the PT' }]}
          >
            <Input placeholder="Enter the first alternative name of the PT" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="namaAlternatifPT2"
            label="Nama Alternatif PT 2 :"
            rules={[{ required: true, message: 'Please enter the second alternative name of the PT' }]}
          >
            <Input placeholder="Enter the second alternative name of the PT" />
          </Form.Item>
        </Col>
      </Row>

      {renderPengurusForms()}

      <Button type="primary" onClick={addPengurus} className="w-full mt-4 bg-main">
        Tambahkan Pengurus +
      </Button>

      <Row gutter={50} className="mt-4">
        <Col span={12}>
          <Form.Item
            name="ktp"
            label="KTP"
            rules={[{ required: true, message: 'Please upload the KTP' }]}
          >
            <Draggable
              icon={<PiIdentificationCardDuotone />}
              topText="Click or drag file KTP to this area to upload"
              bottomText="Supported Format : PDF, Max Size : 10 MB"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="npwp"
            label="NPWP"
            rules={[{ required: true, message: 'Please upload the NPWP' }]}
          >
            <Draggable
              icon={<PiIdentificationBadgeDuotone />}
              topText="Click or drag file NPWP to this area to upload"
              bottomText="Supported Format : PDF, Max Size : 10 MB"
            />
          </Form.Item>
        </Col>
      </Row>


      <span className='text-center font-bold inline-block w-full text-[20px] py-5 text-second'>Modal Pasar</span>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="ditempatkan"
            label="Ditempatkan"
            rules={[{ required: true, message: 'Please enter the modal pasar' }]}
          >
            <Input placeholder="Enter the modal pasar" addonBefore="Rp." />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="disetor"
            label="Disetor"
            rules={[{ required: true, message: 'Please enter the modal pasar' }]}
          >
            <Input placeholder="Enter the modal pasar" addonBefore="Rp." />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="bidangUsaha"
            label="Bidang Usaha (KBLI 2020) :"
            rules={[{ required: true, message: 'Please enter the bidang usaha' }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Select Bidang Usaha"
              options={[
                { value: '1', label: 'Bidang Usaha 1' },
                { value: '2', label: 'Bidang Usaha 2' },
                { value: '3', label: 'Bidang Usaha 3' },
              ]}
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
            rules={[{ required: true, message: 'Please enter the email' }]}
          >
            <Input placeholder="Enter the email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="noHPTambahan"
            label="No. HP Tambahan :"
            rules={[{ required: true, message: 'Please enter the phone number' }]}
          >
            <Input placeholder="Enter the phone number" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="alamatTambahan"
            label="Alamat Tambahan :"
            rules={[{ required: true, message: 'Please enter the address' }]}
          >
            <TextArea
              placeholder="Enter the address"
              autoSize={{ minRows: 6, maxRows: 6 }}
            />
          </Form.Item>
        </Col>
      </Row>

    </Form>
  )
}

export default LegalitasPP