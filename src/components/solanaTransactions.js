// src/solanaTransactions.js
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export const sendTransaction = async (wallet, amount, cartItems) => {
    const ALCHEMY_ENDPOINT = "https://solana-mainnet.g.alchemy.com/v2/mWiElK3fB0MSkZjeiTm_HABjmWW1RgAd";
    const connection = new Connection(ALCHEMY_ENDPOINT, 'confirmed');

    try {
        console.log("[SolanaTransactions] Connection established to mainnet-beta using Alchemy.");

        const receiverAddress = new PublicKey('HeGffZqFhB9euhind4aJFWy8waLCppTkie4gvW8bQhzp');
        console.log(`[SolanaTransactions] Receiver address: ${receiverAddress.toString()}`);

        const lamports = amount * LAMPORTS_PER_SOL;
        console.log(`[SolanaTransactions] Sending ${amount} SOL (${lamports} lamports) to ${receiverAddress.toString()}`);

        const { blockhash } = await connection.getRecentBlockhash('finalized');
        console.log(`[SolanaTransactions] Recent blockhash: ${blockhash}`);

        const transaction = new Transaction({
            recentBlockhash: blockhash,
            feePayer: wallet.publicKey
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

        const confirmation = await connection.confirmTransaction(signature, 'finalized');
        console.log("[SolanaTransactions] Transaction confirmed with status:", confirmation.status);

        return signature;
    } catch (error) {
        console.error("[SolanaTransactions] Error sending transaction:", error);
        console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            code: error.code,
            instruction: error.instruction, // Specific for Solana if available
            timeout: error.timeout // Specific for Solana if available
        });
        // Decide how to handle the error: throw, return, etc.
        throw error;
    }
};
