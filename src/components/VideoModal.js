// VideoModal.js
import React from 'react';

const VideoModal = ({ url, onClose }) => {
  // Make sure the iframe src is an embed URL like `https://www.youtube.com/embed/video_id`
  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose}>×</button>
        <iframe
          src={url}
          frameBorder="0"
          allowFullScreen
          title="Video player"
          width="560"
          height="315"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoModal;
