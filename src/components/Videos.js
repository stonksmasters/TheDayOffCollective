import React, { useState } from 'react';

const Videos = () => {
    const [activeVideoId, setActiveVideoId] = useState(null);
    const [activeVideoTitle, setActiveVideoTitle] = useState('');

    const videos = [
        { id: 1, title: "What are NFTs", url: "https://www.youtube.com/watch?v=zpROwouRo_M" },
        { id: 2, title: "NFTs, Explained", url: "https://www.youtube.com/watch?v=Oz9zw7-_vhM" },
        { id: 3, title: "NFTs - SNL", url: "https://www.youtube.com/watch?v=mrNOYudaMAc" },
        { id: 4, title: "SOLANA PRICE PREDICTION🔥", url: "https://www.youtube.com/watch?v=183_sk4a5Ls" }
    ];

    const getVideoId = (url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get('v');
    };

    const playVideo = (video) => {
        setActiveVideoId(getVideoId(video.url));
        setActiveVideoTitle(video.title);
    };

    return (
        <div className="video-container">
            <div className="video-thumbnails">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className={`video-thumbnail ${activeVideoId === getVideoId(video.url) ? 'active' : ''}`}
                        onClick={() => playVideo(video)}
                    >
                        <img
                            src={`https://img.youtube.com/vi/${getVideoId(video.url)}/0.jpg`}
                            alt={video.title}
                            loading="lazy"
                        />
                        <div className="play-icon"></div>
                        <div className="video-title-overlay">{video.title}</div>
                    </div>
                ))}
            </div>
            {activeVideoId && (
                <div className="video-player-section">
                    <h2 className="video-player-title">{activeVideoTitle}</h2>
                    <div className="video-player-container">
                        <iframe
                            className="video-iframe"
                            src={`https://www.youtube.com/embed/${activeVideoId}`}
                            frameBorder="0"
                            allowFullScreen
                            title={activeVideoTitle}
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Videos;
