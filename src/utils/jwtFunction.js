import jwt from "jsonwebtoken";

export const JWT_SECRET = "sicre";

export function generateToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h" 
    });
    return token;
}

export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded; 
    } catch (error) {
        console.log(`Error verifying token: ${error}`);
        throw error;
    }
}