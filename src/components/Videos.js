// src/components/Videos.js
import React from 'react';

const Videos = () => {
    const videos = [
        { id: 1, title: "What are NFTs", url: "https://www.youtube.com/watch?v=zpROwouRo_M" },
        { id: 2, title: "NFTs, Explained", url: "https://www.youtube.com/watch?v=Oz9zw7-_vhM" },
        { id: 3, title: "NFTs - SNL", url: "https://www.youtube.com/watch?v=mrNOYudaMAc" },
        { id: 4, title: "SOLANA PRICE PREDICTION🔥", url: "https://www.youtube.com/watch?v=183_sk4a5Ls" }
    ];

    return (
        <div className="video-container">
            {videos.map(video => (
                <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="video">
                    <img src={`http://img.youtube.com/vi/${video.url.split('v=')[1]}/0.jpg`} alt={video.title} />
                    <p>{video.title}</p>
                </a>
            ))}
        </div>
    );
};

export default Videos;
