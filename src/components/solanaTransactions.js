// src/solanaTransactions.js
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export const sendTransaction = async (wallet, amount, cartItems) => {
    try {
        // Using Alchemy's Solana mainnet endpoint
        const ALCHEMY_ENDPOINT = "https://solana-mainnet.g.alchemy.com/v2/7VqGQlnQ0MGxXUj4dOdEKjr7v-Q6r5DZ";
        const connection = new Connection(ALCHEMY_ENDPOINT, 'confirmed');

        console.log("[SolanaTransactions] Connection established to mainnet-beta using Alchemy.");

        const receiverAddress = new PublicKey('HeGffZqFhB9euhind4aJFWy8waLCppTkie4gvW8bQhzp');
        console.log(`[SolanaTransactions] Receiver address: ${receiverAddress.toString()}`);

        const lamports = amount * LAMPORTS_PER_SOL;
        console.log(`[SolanaTransactions] Sending ${amount} SOL (${lamports} lamports)`);

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: receiverAddress,
                lamports,
            })
        );

        console.log("[SolanaTransactions] Transaction created, sending...");
        const signature = await wallet.sendTransaction(transaction, connection);
        console.log("[SolanaTransactions] Transaction sent, waiting for confirmation...");

        await connection.confirmTransaction(signature);
        console.log('Transaction successful with signature:', signature);

        return signature;
    } catch (error) {
        console.error('Error sending transaction:', error);
        throw error;
    }
};
