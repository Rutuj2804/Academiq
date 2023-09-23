import CryptoJS from "crypto-js";

// Define the custom hook
const useCrypto = (): {
    encrypt: (data: string) => string;
    decrypt: (encryptedData: string) => string | null;
} => {
    // Encryption function
    const encrypt = (data: string): string => {
        const key: any = process.env.REACT_APP_CRYPTOJS_ENCRYPTION_KEY;

        const encrypted = CryptoJS.AES.encrypt(data, key).toString();
        return encodeURIComponent(encrypted);
    };

    // Decryption function
    const decrypt = (encryptedData: string): string | null => {
        try {
            const key: any = process.env.REACT_APP_CRYPTOJS_ENCRYPTION_KEY;

            const decoded = decodeURIComponent(encryptedData)

            const decrypted = CryptoJS.AES.decrypt(decoded, key);
            return decrypted.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error("Decryption error:", error);
            return null;
        }
    };

    return { encrypt, decrypt };
};

export default useCrypto;
