import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function verifyToken(req, res, next) {
    const authheaders = req.headers.authorization;

    if(!authheaders || !authheaders.startsWith("Bearer ")){
        res.status(401).json({message: "Unauthorizated"});
    }

    const token = authheaders && authheaders.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
    }
}