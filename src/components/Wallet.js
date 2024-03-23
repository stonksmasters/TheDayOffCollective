// src/components/Wallet.js
import React, { useEffect, useMemo } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletStatusChecker = () => {
    const wallet = useWallet();

    useEffect(() => {
        console.log(`[WalletStatusChecker] Wallet connection status: ${wallet.connected ? 'Connected' : 'Disconnected'}`);
        if (wallet.connected) {
            console.log(`[WalletStatusChecker] Wallet address: ${wallet.publicKey?.toString()}`);
        }
    }, [wallet.connected, wallet.publicKey]);

    return null;  // This component is for logging purposes only
};

const Wallet = ({ children, showButton = true }) => {  // Add showButton prop to control the display of the WalletMultiButton
    console.log("[Wallet] Component rendering...");

    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => {
        console.log(`[Wallet] Network set to: ${network}`);
        return clusterApiUrl(network);
    }, [network]);

    const wallets = useMemo(() => {
        console.log("[Wallet] Initializing wallets...");
        return [new PhantomWalletAdapter()];
    }, []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {showButton} 
                    <WalletStatusChecker />
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default Wallet;
