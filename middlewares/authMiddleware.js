import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = await Admin.findById(decoded.id).select("-password -token -confirmed");
            return next();
        } catch (error) {
            const e = new Error("Token no valido");
            return res.status(401).json({msg: e.message});
        }
    }   
    
    if (!token) {
        const error = new Error("Token no valido o inexistente");
        return res.status(401).json({msg: error.message});//puse return
    }
    next();
}


export default checkAuth;