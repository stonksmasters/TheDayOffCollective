// src/components/NftList.js
import React from 'react';
import NftItem from './NftItem'; // We will create this component next
import Nfts from '../data/Nfts'; // Ensure the path to Nfts.js is correct

const NftList = () => {
    return (
        <div className="product-list">
            {Nfts.map(nft => (
                <NftItem key={nft.id} nft={nft} />
            ))}
        </div>
    );
};

export default NftList;
