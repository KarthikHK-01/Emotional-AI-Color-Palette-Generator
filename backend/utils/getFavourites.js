import pg from "pg";

const db = new pg.Client({
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
});

db.connect();

async function getFavourites(req, res) {
    const userID = req.user.userId;
    try{
        const result = await db.query("SELECT * FROM favourites WHERE user_id = $1", [userID]);
        console.log(result.rows);
        if(result.rows.length === 0){
            return res.status(400).json({message: "No favourites found."});
        }
        res.status(200).json({favourites: result.rows});
    }catch(err){
        console.log(err);
    }
    
}

export default getFavourites;