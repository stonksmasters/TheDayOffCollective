// src/components/Videos.js
import React, { useState } from 'react';
import VideoModal from './VideoModal';

const Videos = () => {
  const [modalVideoUrl, setModalVideoUrl] = useState(null); // State for the modal video URL

  const videos = [
    { id: 1, title: "What are NFTs", url: "https://www.youtube.com/watch?v=zpROwouRo_M" },
    { id: 2, title: "NFTs, Explained", url: "https://www.youtube.com/watch?v=Oz9zw7-_vhM" },
    { id: 3, title: "NFTs - SNL", url: "https://www.youtube.com/watch?v=mrNOYudaMAc" },
    { id: 4, title: "SOLANA PRICE PREDICTION🔥", url: "https://www.youtube.com/watch?v=183_sk4a5Ls" }
  ];

  // Function to open the modal with the video URL
  const openModal = (videoId) => {
    // Construct the embed URL from the video ID
    setModalVideoUrl(`https://www.youtube.com/embed/${videoId}`);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVideoUrl(null);
  };

  // Function to extract the video ID from the URL
  const getVideoId = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  };

  return (
    <div className="video-container">
      {videos.map((video) => (
        <div key={video.id} className="video" onClick={() => openModal(getVideoId(video.url))}>
          <img src={`http://img.youtube.com/vi/${getVideoId(video.url)}/0.jpg`} alt={video.title} />
          <p>{video.title}</p>
        </div>
      ))}
      {modalVideoUrl && <VideoModal url={modalVideoUrl} onClose={closeModal} />}
    </div>
  );
};

export default Videos;
