import CryptoJS from "crypto-js";

export const encryptHex = (password) => {
  // console.log('CryptoJS.AES.encrypt(password, process.env.ACCESS_SECRET).toString();: ', CryptoJS.AES.encrypt(password, process.env.ACCESS_SECRET).toString());
  return CryptoJS.AES.encrypt(password, process.env.ACCESS_SECRET).toString();
}

export const decryptHex = encryptedHex => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedHex, process.env.ACCESS_SECRET);
  // console.log('decryptedBytes: ', decryptedBytes.toString(CryptoJS.enc.Utf8));
  return decryptedBytes.toString(CryptoJS.enc.Utf8);
}