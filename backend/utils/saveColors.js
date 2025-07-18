import pg from "pg";

const db = new pg.Client({
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
});

db.connect();

async function saveColor (req, res) {
    const userID = req.user.userId;
    const mood = req.body.mood;
    const colors = req.body.colors;
    const pgArray = `{${colors.join(",")}}`;
    try{
        await db.query("INSERT INTO favourites (user_id, mood, colors) VALUES ($1, $2, $3)", [userID, mood, pgArray]);
        return res.status(200).json({message: "Succesful addition to your favourites."});
    }catch(err){
        console.log(err);
    }
}

export default saveColor;