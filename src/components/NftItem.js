// src/components/NftItem.js
import React, { useState, useEffect } from 'react';

const NftItem = ({ nft }) => {
    const [solPrice, setSolPrice] = useState(null);

    useEffect(() => {
        const fetchSolPrice = async () => {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
            const data = await response.json();
            setSolPrice(data.solana.usd);
        };

        fetchSolPrice();
    }, []);

    const priceInSol = solPrice ? (nft.price / solPrice).toFixed(2) : "Loading...";

    return (
        <div className="product-item">
            <img src={nft.imageUrl} alt={nft.name} />
            <h3>{nft.name}</h3>
            <p>{nft.description}</p>
            <p>Price: {priceInSol} SOL</p>
        </div>
    );
};

export default NftItem;
