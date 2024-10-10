import React, { useState } from 'react';

const VideoPreviewUploader = ({ video, setVideo }) => {
  const [isBlurred, setIsBlurred] = useState(false);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="w-full h-64 flex items-center justify-center border-dashed border-2 rounded-lg relative"
      style={{
        cursor: 'pointer',
      }}
      onClick={() => document.getElementById('videoInput').click()}
      onMouseEnter={() => setIsBlurred(true)}
      onMouseLeave={() => setIsBlurred(false)}
    >
      {video && (
        <video
          className="absolute inset-0"
          style={{
            filter: isBlurred ? 'blur(2px)' : 'none',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src={video}
          controls
        />
      )}
      {(!video || isBlurred) && (
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
        style={{ display: 'none' }}
        onChange={handleVideoChange}
      />
    </div>
  );
};

export default VideoPreviewUploader;