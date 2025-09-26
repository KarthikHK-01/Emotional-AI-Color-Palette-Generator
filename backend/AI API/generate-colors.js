import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;

const endpoint = "https://openrouter.ai/api/v1/chat/completions";

async function generateColors(req, res){
    const {mood} = req.body;
    try{
        const result = await axios.post(endpoint,
        {
            model: "google/gemini-2.5-flash",
            messages :[{
                role: "system",
                content: "You are a color palette generator. Given a mood, return exactly 5 hex color codes as a JSON array like this: [\"#FFFFFF\", \"#000000\", \"#FF0000\", \"#00FF00\", \"#0000FF\"]. Do not include any explanation or extra text."
            },
            {
                role: "user",
                content: `Generate me a color palette based on the mood : ${mood}`
            }],

            temperature: 0.7,
            max_tokens: 100
        },
        {
            headers:{
                "Authorization": `Bearer ${API_KEY}`,
                "Content-type": "application/json"
            }
        }
    );

    const colors = result.data.choices[0].message.content;
    console.log( result.data.choices);
    res.json({colors});
    }catch(err){
        console.error("API error: ", err.message);
        res.status(500).json({error: "Failed to generate colors"});
    }
    
}

export default generateColors;

