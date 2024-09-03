import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const JWT_SECRET = config.JWT_SECRET;

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