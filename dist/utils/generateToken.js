import jwt from "jsonwebtoken";
const JWT_SECRET = "SECRET_KEY";
export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1d",
    });
};
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
