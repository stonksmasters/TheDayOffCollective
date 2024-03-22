// src/solanaTransactions.js
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export const sendTransaction = async (wallet, amount, cartItems) => {
    try {
        const ALCHEMY_ENDPOINT = "https://solana-mainnet.g.alchemy.com/v2/7VqGQlnQ0MGxXUj4dOdEKjr7v-Q6r5DZ";
        const connection = new Connection(ALCHEMY_ENDPOINT, 'confirmed');

        console.log("[SolanaTransactions] Connection established to mainnet-beta using Alchemy.");

        const receiverAddress = new PublicKey('HeGffZqFhB9euhind4aJFWy8waLCppTkie4gvW8bQhzp');
        console.log(`[SolanaTransactions] Receiver address: ${receiverAddress.toString()}`);

        const lamports = amount * LAMPORTS_PER_SOL;
        console.log(`[SolanaTransactions] Sending ${amount} SOL (${lamports} lamports) to ${receiverAddress.toString()}`);

        // Fetch the recent blockhash to ensure the transaction is recent
        const { blockhash } = await connection.getRecentBlockhash('finalized');
        console.log(`[SolanaTransactions] Recent blockhash: ${blockhash}`);

        const transaction = new Transaction({
            recentBlockhash: blockhash,
            feePayer: wallet.publicKey // Set the fee payer
        }).add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: receiverAddress,
                lamports,
            })
        );

        console.log("[SolanaTransactions] Transaction created, signing...");
        const signedTransaction = await wallet.signTransaction(transaction);
        console.log("[SolanaTransactions] Transaction signed, sending...");

        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        console.log("[SolanaTransactions] Transaction sent, signature: ", signature);

        await connection.confirmTransaction(signature, 'finalized');
        console.log("[SolanaTransactions] Transaction confirmed");

        return signature;
    } catch (error) {
        console.error('Error sending transaction:', error);
        throw error;
    }
};
