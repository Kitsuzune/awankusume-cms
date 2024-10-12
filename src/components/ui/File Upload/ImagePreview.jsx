import React, { useState } from 'react';

const ImagePreviewUploader = ({ image, setImage, name }) => {
  const [preview, setPreview] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const imagePreviewShow = e.target.files[0];
    if (imagePreviewShow) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(imagePreviewShow);
    }
  };

  return (
    <div
      className="w-full h-64 flex items-center justify-center border-dashed border-2 rounded-lg relative"
      style={{
        backgroundImage: `url(${preview ? preview : image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
      }}
      onClick={() => document.getElementById('fileInput').click()}
      onMouseEnter={() => setIsBlurred(true)}
      onMouseLeave={() => setIsBlurred(false)}
    >
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: isBlurred ? 'blur(2px)' : 'none',
        }}
      ></div>
      {(!image || isBlurred) && (
        <span
          className="absolute text-[15px]"
          style={{
            zIndex: 1,
            pointerEvents: 'none',
            color: image ? 'white' : 'black',
          }}
        >
          Choose File...
        </span>
      )}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        name={name}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImagePreviewUploader;