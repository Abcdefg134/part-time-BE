import jwt from 'jsonwebtoken';

export async function generateToken(payload: Object, secretKey: string, tokenLife: string){
    const token = await jwt.sign(payload, secretKey, {expiresIn: tokenLife});
    return token;
}

export async function verifyToken(token: string, secretKey: string){
    const decoded = await jwt.verify(token, secretKey);
    return decoded;
}