import React, { useState } from 'react';

const VideoPreviewUploader = ({ video, setVideo, name, disabled }) => {
  const [preview, setPreview] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false);

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
    const videoPreviewShow = e.target.files[0];
    if (videoPreviewShow) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(videoPreviewShow);
    }
  };

  return (
    <div
      className="w-full h-64 flex items-center justify-center border-dashed border-2 rounded-lg relative"
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onClick={() => !disabled && document.getElementById('videoInput').click()}
      onMouseEnter={() => !disabled && setIsBlurred(true)}
      onMouseLeave={() => !disabled && setIsBlurred(false)}
    >
      {video && (
        <video
          className="absolute inset-0"
          style={{
            filter: !disabled && isBlurred ? 'blur(2px)' : 'none', // Apply blur only if not disabled
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src={preview ? preview : video}
          controls
        />
      )}
      {(!video || (isBlurred && !disabled)) && (
        <span
          className="absolute text-[15px]"
          style={{
            zIndex: 1,
            pointerEvents: 'none',
            color: video ? 'white' : 'black',
          }}
        >
          Choose Video...
        </span>
      )}
      <input
        id="videoInput"
        type="file"
        accept="video/*"
        name={name}
        style={{ display: 'none' }}
        onChange={handleVideoChange}
        disabled={disabled}
      />
    </div>
  );
};

export default VideoPreviewUploader;
