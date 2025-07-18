import express from "express";
import router from "./utils/router.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/" ,router);


app.listen(3000, () => {console.log("server running on 3000");});