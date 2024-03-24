import Jwt from "jsonwebtoken";


export const generateTokens = (payload) => {
  return Jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    {expiresIn:"3d",}
  );
}

export const refreshToken = (payload) => {
  Jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_PRIVATE_KEY,
    { expiresIn: "30d" }
  );
}

export const verifyRefreshToken = (refreshToken) => {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
  return new Promise((resolve, reject) => {
    Jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
      console.log('err: ', err);
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