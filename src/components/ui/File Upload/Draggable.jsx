import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const Draggable = ({ icon = <InboxOutlined />, topText = "Click or drag file to this area to upload", bottomText = "Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files." }) => {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      {/* <p className="ant-upload-drag-icon">
        {icon}
      </p> */}
      <div className="flex flex-col items-center justify-center text-[60px]">
        {icon}
      </div>
      <p className="ant-upload-text">{topText}</p>
      {bottomText && <p className="ant-upload-hint">{bottomText}</p>}
    </Dragger>
  );
};

export default Draggable;