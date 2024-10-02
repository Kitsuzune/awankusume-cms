import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const Draggable = ({ icon = <InboxOutlined />, topText = "Click or drag file to this area to upload", bottomText = "Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.", onFileChange }) => {
  const [fileList, setFileList] = useState([]);

  const props = {
    name: 'file',
    multiple: false,
    beforeUpload: (file) => {
      setFileList([file]);
      onFileChange(file); 
      return false;
    },
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
    <Dragger {...props} fileList={fileList}>
      <div className="flex flex-col items-center justify-center text-[60px]">
        {icon}
      </div>
      <p className="ant-upload-text">{topText}</p>
      {bottomText && <p className="ant-upload-hint">{bottomText}</p>}
    </Dragger>
  );
};

export default Draggable;