import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export const sendTransaction = async (wallet, amount, cartItems) => {
    const SYNDICA_ENDPOINT = "https://solana-mainnet.api.syndica.io/api-token/2bcw5XHbAeSaSZcaFWyxdWW7n3AyZX61JzfJRyFDAWKwvqproSuvDUF4uPwF5UhbLKCQ2xGobMGaTkKmak6e6WGRfYSonRYZsPRwgVixkfDYb1zDPVkcdRjTpKeDaDEn4jromMPEE1WU1pvm19XUDaALyYfN8xSGQ9wJC2Yrbzzybwh6eRNYvyra5vpoT4KMR1N6VxdXYRHrDLJnA7zuZEMFACFudKqVPytJAqRmk4XXkbWs6HyVu5CLXhfzCUo33pMCgA9Q5d7Y67KUFajKm1HTZLRPvyXaaBtVzvfceXQrqmbDFBETAF2dkNpBaKsXwtgPGdZ4Q4jepYaszEsgqwAV1xu2nhsGJHPEvQWrbXjuYdXHpkGs1MY1zVVsJRnhrmkhFwZ3jadCTALhGuJRM2cVwrLr2EgvLP3zqGPTHV7yCz9uUSuSoosSjtZVAs2mT8Hm8Kp1ccr16XXJ5fkbRenFbntngvaaADVNnmMaLvaLqKmgYxGURjsYGciE5";
    const connection = new Connection(SYNDICA_ENDPOINT, 'confirmed');

    try {
        console.log("[SolanaTransactions] Initializing connection...");
        console.log(`[SolanaTransactions] Connecting to Syndica at: ${SYNDICA_ENDPOINT}`);
        const connectionInfo = await connection.getVersion();
        console.log(`[SolanaTransactions] Connected to Syndica RPC. Version: ${connectionInfo['solana-core']}`);

        const receiverAddress = new PublicKey('dovP29ni96gmfecU6YmiZhY84pvh4HMr2ADuxL4mkUu');
        console.log(`[SolanaTransactions] Receiver address: ${receiverAddress.toString()}`);

        const lamports = amount * LAMPORTS_PER_SOL;
        console.log(`[SolanaTransactions] Preparing to send ${amount} SOL (${lamports} lamports) to ${receiverAddress.toString()}`);

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
        console.log("[SolanaTransactions] Transaction created and ready for signing.");

        const signedTransaction = await wallet.signTransaction(transaction);
        console.log("[SolanaTransactions] Transaction signed, sending...");

        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        console.log(`[SolanaTransactions] Transaction sent. Signature: ${signature}`);

        const confirmation = await connection.confirmTransaction(signature, 'finalized');
        console.log(`[SolanaTransactions] Transaction confirmed. Status: ${confirmation.value.err ? "Failed" : "Success"}`);

        return signature;
    } catch (error) {
        console.error("[SolanaTransactions] Transaction failed:", error);
        console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            code: error.code,
            instruction: error.instruction,
            timeout: error.timeout
        });
        throw error;
    }
};
