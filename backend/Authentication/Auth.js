import jwt from "jsonwebtoken";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
});

db.connect();

async function login(req, res) {
    const name = req.body.username;
    const password_rec = req.body.password; 
    try{
        const data = await db.query("SELECT * FROM users WHERE username = $1", [name]);
        if(data.rows.length === 0) console.log("User Not Found. Please signup.");
        else{
            const user = data.rows[0];
            const passwordInDB = user.password_hash;
            console.log(user);
            console.log(user.user_id);
            const payload = { userId: user.user_id };

            if(passwordInDB === password_rec){
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
                db.query("UPDATE users SET islogged = $1 WHERE username = $2", ['true', name]);
                console.log("Logged In");
                return res.status(200).json({ message: "Login successful", token, username: user.username });
            }else {
                return res.status(401).json({message: "Passwords do not match. Please re-enter"});
            }
        }
    } catch(err){
        console.log(err);
    }
};

async function signup (req, res){
    const name = req.body.username;
    const password_rec = req.body.password;
    const confPassword = req.body.confirm_password;

    try{
        const data = await db.query("SELECT * FROM users WHERE username = $1", [name]);
        if(data.rows.length != 0){
            return res.status(409).json({message: "User already exists. Please login"});
        }
        
        if(password_rec === confPassword){
            const data_ins = await db.query("INSERT INTO users (username, password_hash) VALUES ($1, $2)", [name, password_rec]);
            return res.status(201).json({message: "User signed up successfully. Please log-in."});
        }else{
            return res.status(400).json({message: "Passwords do not match"});
        }
        

    }catch(err){
        console.log(err);
        return res.status(501).json({message: "Internal Server error"});
    }
} 

async function logout(req, res) {
  const name = req.body.name;
  try {
    await db.query("UPDATE users SET islogged = $1 WHERE username = $2", ['false', name]);
    console.log("Logged out");
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Logout error:", err.message);
    return res.status(500).json({ error: "Logout failed" });
  }
}


export {login, signup, logout};