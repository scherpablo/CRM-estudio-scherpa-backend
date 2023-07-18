import jwt from 'jsonwebtoken';

const secretJWT = process.env.JWT_SECRET;

const generateJWT = (id) => {
    return jwt.sign({id}, secretJWT, {expiresIn: '30d'}) 
}

export default generateJWT;