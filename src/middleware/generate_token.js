import jwt from "jsonwebtoken";
import { generate_signature_key } from "../utils/Common.js"



export const VeryfiToken = (req,res) =>{
  const tokenClient = req.headers.authorization.split(" ")[1];
  let resolve = undefined;
  jwt.verify(tokenClient, process.env.ACCESS_TOKEN_PRIVATE_KEY, (err, data) => {
    if (err) {
      console.log('func authenticateToken err: ', err.message); //jwt expired
    }
    resolve = typeof data !== "undefined" ? data : undefined;
  });
  return resolve;
}


export const generateTokens = (payload) => {
  const token = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    {expiresIn:"2m",}
  );
  return token;
}



export const refreshToken = (payload) => {
  jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_PRIVATE_KEY,
    { expiresIn: "30d" }
  );
}



export const verifyRefreshToken = (refreshToken) => {
  const privateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
      console.log('err: ', err.message);
      if (err)
        return reject({ error: true, message: "Invalid refresh token" });
      resolve({
        tokenDetails,
        error: false,
        message: "Valid refresh token",
      });
    });
  });
};