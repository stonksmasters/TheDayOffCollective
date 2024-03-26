// src/components/Comics.js
import React from 'react';
import comics from '../data/comics'; // Import comics data
import HeroSections from './HeroSections';

const comicsImages = ['/images/comic.jpg', '/images/comic.jpg'];
const Comics = () => {
    return (
        <div className="comics">
            <h1>Comics</h1>
           
            <HeroSections
    images={comicsImages}
    title="Discover Our Comics"
    text="Dive into the world of adventure and mystery."
/>

            <div className="comics-list">
                {comics.map((comic) => (
                    <div key={comic.id} className="comic-item">
                        <img src={comic.imageUrl} alt={comic.title} />
                        <h2>{comic.title}</h2>
                        <p>Issue: {comic.issue}</p>
                        <p>{comic.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comics;
