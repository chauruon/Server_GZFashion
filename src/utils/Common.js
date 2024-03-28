import CryptoJS from "crypto-js";


/**
  * TypeMenu Header
	* @param {
  *  0:"Áo",
  *  1:"Quần",
  *  2:"Giày",
  * }
	*/
export const TypeCategories = [
  "Áo",
  "Quần",
  "Giày",
]


function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Generate a random message
// const message = generateRandomString(20); // Change the length as needed

// Generate a random secret key
// const secretKey = generateRandomString(32); // Change the length as needed

// Compute HMAC-SHA256 hash
// const hmac = CryptoJS.HmacSHA256(message, secretKey).toString(CryptoJS.enc.Hex);

export const generate_signature_key = () => {
  // Number of bytes for the random buffer
  const numBytes = 32;
  // var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, process.env.ACCESS_TOKEN_PUBLIC_KEY);
  // console.log('hmacHasher: ', hmacHasher);
  // Generate random bytes
  const randomBytes = CryptoJS.lib.WordArray.random(numBytes);
  // const secretKey = generateRandomString(32);
  // Convert random bytes to hexadecimal string
  const token = CryptoJS.HmacSHA256(randomBytes).toString(CryptoJS.enc.Hex);
  console.log('generate_signature_key: ', token);
}
































export const encryptHex = (password) => {
  // console.log('CryptoJS.AES.encrypt(password, process.env.ACCESS_SECRET).toString();: ', CryptoJS.AES.encrypt(password, process.env.ACCESS_SECRET).toString());
  return CryptoJS.AES.encrypt(password, process.env.ACCESS_SECRET).toString();
}

export const decryptHex = encryptedHex => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedHex, process.env.ACCESS_SECRET);
  // console.log('decryptedBytes: ', decryptedBytes.toString(CryptoJS.enc.Utf8));
  return decryptedBytes.toString(CryptoJS.enc.Utf8);
}