import jwt from "jsonwebtoken";

const JWT_SECRET = "SECRET_KEY";

export const generateToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};



// --------------------
// import jwt from "jsonwebtoken";

// const ACCESS_SECRET = "ACCESS_SECRET";
// const REFRESH_SECRET = "REFRESH_SECRET";

// export const generateAccessToken = (payload: any) => {
//   return jwt.sign(payload, ACCESS_SECRET, {
//     expiresIn: "15m",
//   });
// };

// export const generateRefreshToken = (payload: any) => {
//   return jwt.sign(payload, REFRESH_SECRET, {
//     expiresIn: "7d",
//   });
// };

// export const verifyAccessToken = (token: string) => {
//   return jwt.verify(token, ACCESS_SECRET);
// };

// export const verifyRefreshToken = (token: string) => {
//   return jwt.verify(token, REFRESH_SECRET);
// };