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

// async function getDetails(req, res) {
//     const name = req.body.username;
//     try{
//         const result = await db.query("SELECT * FROM users WHERE username = $1 AND islogged = $2", [name, 'true']);
//         if(result.rows.length === 0){
//             return res.status(401).json({message: "User not found or logged in."});
//         }
//         // const username = result.rows[0].username;
//         const password = result.rows[0].password_hash;

//         return res.status(200).json({password: password});
//     }catch(err){
//         console.log(err);
//     }
// }

async function saveDetails(req, res){
    const id = req.user.userId;
    console.log(id);
    const {newName, newPassword, editField} = req.body;
    console.log("Edit field:", editField);
    console.log("New username:", newName);
    console.log("New password:", newPassword);

    try{
        if(editField === "username"){
            // const name = req.body.username;
            await db.query("UPDATE users SET username = $1 WHERE user_id = $2", [newName, id]);
            return res.status(200).json({message: "Username update successful"});
        }
        else if(editField === "password"){
            await db.query("UPDATE users SET password_hash = $1 WHERE user_id = $2", [newPassword, id])
            return res.status(200).json({message: "Password update successful"});
        }
    }catch(err){
        console.log(err);
    }
    

}

export default saveDetails;
