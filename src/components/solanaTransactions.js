// src/solanaTransactions.js
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';

export const sendTransaction = async (wallet, amount, cartItems) => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        console.log("[SolanaTransactions] Connection established to devnet.");

        // Ensure the wallet address is correctly formatted and not enclosed in angle brackets
        const receiverAddress = new PublicKey('dovP29ni96gmfecU6YmiZhY84pvh4HMr2ADuxL4mkUu');
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
