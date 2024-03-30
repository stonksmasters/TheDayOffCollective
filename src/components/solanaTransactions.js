import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Adding a callback parameter to be called after successful transaction confirmation
export const sendTransaction = async (wallet, amount, cartItems, callback) => {
    const ALCHEMY_ENDPOINT = "https://solana-mainnet.g.alchemy.com/v2/7VqGQlnQ0MGxXUj4dOdEKjr7v-Q6r5DZ";
    const connection = new Connection(ALCHEMY_ENDPOINT, 'confirmed');

    try {
        const receiverAddress = new PublicKey('HeGffZqFhB9euhind4aJFWy8waLCppTkie4gvW8bQhzp');
        const lamports = amount * LAMPORTS_PER_SOL;

        const { blockhash } = await connection.getRecentBlockhash('finalized');
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
        await connection.confirmTransaction(signature, 'finalized');

        console.log("[SolanaTransactions] Transaction confirmed with signature:", signature);

        // Call the callback function to submit the form data after the transaction is confirmed
        if (callback) {
            console.log("[SolanaTransactions] Calling callback to submit form data.");
            callback();
        }

        return signature;
    } catch (error) {
        console.error("[SolanaTransactions] Error sending transaction:", error);
        throw error;
    }
};
