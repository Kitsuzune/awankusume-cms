import React, { useState, useCallback } from 'react'
import { Col, Input, Row, Select, Form, Typography, Button, message } from 'antd'
import Draggable from '../../../../../components/ui/File Upload/Draggable';
import { PiIdentificationBadgeDuotone, PiIdentificationCardDuotone } from 'react-icons/pi';
import { apiRequest } from '../../../../../utils/api';

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

const LegalitasPP = ({ customerId, makelarId }) => {
  const [pengurusCount, setPengurusCount] = useState(1);
  const [perusahaanType, setPerusahaanType] = useState(null);

  const [data, setData] = useState({
    companyType: '',
    fullName: '',
    email: '',
    nomorTelp: '',
    namaPt: '',
    namaPt1: '',
    namaPt2: '',
    modalPasarDitempatkan: '',
    modalPasarDisetor: '',
    bidangUsaha: [''],
    emailTambahan: '',
    nomorTelpKantor: '',
    alamat: '',
    administrator: [''],
  });

  const [files, setFiles] = useState({});

  const handleFileChangeArray = (name, index, file) => {
    setFiles(
      prevFiles => ({
        ...prevFiles,
        [name]: [
          ...(prevFiles[name] || []).slice(0, index),
          file,
          ...(prevFiles[name] || []).slice(index + 1)
        ]
      })
    )
  };

  const handleAdministratorChange = (index, field, value) => {
    setData(prevData => {
      const updatedResponsible = [...prevData.administrator];
      const responsibleObj = JSON.parse(updatedResponsible[index] || '{}');
      responsibleObj[field] = value;
      updatedResponsible[index] = JSON.stringify(responsibleObj);
      return { ...prevData, administrator: updatedResponsible };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const addPengurus = () => {
    setPengurusCount(pengurusCount + 1);
  };

  const handlePerusahaanTypeClick = (type) => {
    setPerusahaanType(type);
    setData(prevData => ({ ...prevData, companyType: type }));
  };

  const handleSubmit = async () => {
    try {
      const filesAndData = {
        ...files,
        ...data,
        ...(makelarId ? { makelarId: makelarId.toString() } : {}),
        ...(customerId ? { customerId: customerId.toString() } : {}),
      };

      console.log(filesAndData);

      await apiRequest('post', 'order/company-order', filesAndData , {}, 'json', true);
      message.success('Order created successfully');
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const renderPengurusForms = () => {
    const forms = [];
    for (let i = 0; i < pengurusCount; i++) {
      forms.push(
        <div key={i}>
          <span className='text-center font-bold inline-block w-full text-[20px] py-5 text-second'>Pengurus {i + 1}</span>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={`name${i}`}
                label={`Nama :`}
                rules={[{ required: true, message: `Please enter the name of manager ${i + 1}` }]}
              >
                <Input name={`name`} placeholder={`Enter the name of Penanggung Jawab ${i + 1}`} onChange={(e) => handleAdministratorChange(i, 'name', e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={`jabatan${i}`}
                label="Jabatan :"
                rules={[{ required: true, message: 'Please enter the position' }]}
              >
                <Input name={`jabatan`} placeholder={`Enter the position ${i + 1}`} onChange={(e) => handleAdministratorChange(i, 'jabatan', e.target.value)} />
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
                <Input name={`saham`} placeholder={`Enter the shares ${i + 1}`} onChange={(e) => handleAdministratorChange(i, 'saham', e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={`nomorTelp${i}`}
                label="No. HP"
                rules={[{ required: true, message: 'Please enter the phone number' }]}
              >
                <Input name={`nomorTelp`} placeholder={`Enter the phone number ${i + 1}`} onChange={(e) => handleAdministratorChange(i, 'nomorTelp', e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={`email${i}`}
                label="Email"
                rules={[{ required: true, message: 'Please enter the email' }]}
              >
                <Input name={`email`} placeholder={`Enter the email ${i + 1}`} onChange={(e) => handleAdministratorChange(i, 'email', e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} className="mt-4">
            <Col span={12}>
              <Form.Item
                name={`ktp${i}`}
                label="KTP"
                rules={[{ required: true, message: 'Please upload the KTP' }]}
              >
                <Draggable
                  icon={<PiIdentificationCardDuotone />}
                  topText="Click or drag file KTP to this area to upload"
                  bottomText="Supported Format : PDF, Max Size : 10 MB"
                  onFileChange={(file) => handleFileChangeArray('ktp', i, file)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={`npwp${i}`}
                label="NPWP"
                rules={[{ required: true, message: 'Please upload the NPWP' }]}
              >
                <Draggable
                  icon={<PiIdentificationBadgeDuotone />}
                  topText="Click or drag file NPWP to this area to upload"
                  bottomText="Supported Format : PDF, Max Size : 10 MB"
                  onFileChange={(file) => handleFileChangeArray('npwp', i, file)}
                />
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


      {/* <Row gutter={16}>
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
      </Row> */}

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="fullName"
            label="Full name :"
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input name="fullName" placeholder="Enter your full name" onChange={handleChange} />
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
            <Input name="email" placeholder="Enter your email" onChange={handleChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="No.Phone :"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input name="nomorTelp" placeholder="Enter your phone number" onChange={handleChange} />
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
            <Input name="namaPt" placeholder="Enter the name of the PT" onChange={handleChange} />
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
            <Input name="namaPt1" placeholder="Enter the first alternative name of the PT" onChange={handleChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="namaAlternatifPT2"
            label="Nama Alternatif PT 2 :"
            rules={[{ required: true, message: 'Please enter the second alternative name of the PT' }]}
          >
            <Input name="namaPt2" placeholder="Enter the second alternative name of the PT" onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>

      {renderPengurusForms()}

      <Button type="primary" onClick={addPengurus} className="w-full mt-4 bg-main">
        Tambahkan Pengurus +
      </Button>

      <span className='text-center font-bold inline-block w-full text-[20px] py-5 text-second'>Modal Pasar</span>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="ditempatkan"
            label="Ditempatkan"
            rules={[{ required: true, message: 'Please enter the modal pasar' }]}
          >
            <Input name="modalPasarDitempatkan" placeholder="Enter the modal pasar" onChange={handleChange} addonBefore="Rp." />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="disetor"
            label="Disetor"
            rules={[{ required: true, message: 'Please enter the modal pasar' }]}
          >
            <Input name="modalPasarDisetor" placeholder="Enter the modal pasar" onChange={handleChange} addonBefore="Rp." />
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
              onChange={(value) => setData(prevData => ({ ...prevData, bidangUsaha: value }))}
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
            <Input name="emailTambahan" placeholder="Enter the email" onChange={handleChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="noHPTambahan"
            label="No. HP Tambahan :"
            rules={[{ required: true, message: 'Please enter the phone number' }]}
          >
            <Input name="nomorTelpKantor" placeholder="Enter the phone number" onChange={handleChange} />
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
              name="alamat"
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
      </Row>

      <Button type="primary" onClick={handleSubmit} className="w-full my-4 bg-main">
        Submit
      </Button>


    </Form>
  )
}

export default LegalitasPP