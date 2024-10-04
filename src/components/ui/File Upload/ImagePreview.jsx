import React, { useState } from 'react';

const ImagePreviewUploader = ({ image, setImage }) => {
  const [isBlurred, setIsBlurred] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="w-full h-64 flex items-center justify-center border-dashed border-2 rounded-lg relative"
      style={{
        backgroundImage: `url(${image})`,
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
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImagePreviewUploader;