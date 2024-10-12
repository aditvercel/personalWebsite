import axios from "axios";
import CryptoJS from "crypto-js";

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
});
const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET;

// Encrypt function
export const encrypt = (data) => {
  const text = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  // console.log(
  //   "SECRET_KEY:",
  //   SECRET_KEY,
  //   "Encrypted: ",
  //   encrypted,
  //   `from: ${text}`
  // );
  return encrypted;
};

export const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  // console.log(
  //   "SECRET_KEY:",
  //   SECRET_KEY,
  //   "Decrypted: ",
  //   decrypted,
  //   `from: ${cipherText}`
  // );
  return decrypted;
};
// Request interceptor to encrypt the request payload
api.interceptors.request.use(
  (config) => {
    // Encrypt request data
    if (config.data) {
      const encryptedPayload = encrypt(config.data);
      config.data = {
        status: "informational",
        encryptedData: encryptedPayload,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to decrypt the response data
api.interceptors.response.use(
  (response) => {
    // Decrypt the response data if it contains encrypted data
    if (response.data && response.data.result) {
      const decryptedresult = JSON.parse(decrypt(response.data.result));
      // console.log("Decrypted result: ", decryptedresult);

      // Replace the encrypted result with the decrypted ones in the response
      return {
        ...response,
        data: { ...response.data, result: decryptedresult },
      };
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
