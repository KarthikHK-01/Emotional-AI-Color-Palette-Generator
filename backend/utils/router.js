import { apis } from "./api.js";
import {login, signup, logout} from "../Authentication/Auth.js";
import generateColors from "../AI API/generate-colors.js";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import saveDetails from "./profileDetails.js";
import verifyToken from "../Authentication/verifyToken.js";
import saveColor from "./saveColors.js";
import getFavourites from "./getFavourites.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); 
router.use(cors()); 


router.post(apis.login, login);
router.post(apis.signup, signup);

router.post(apis.generate_colors, generateColors);
router.post(apis.save_details, verifyToken, saveDetails);
router.post(apis.save_colors, verifyToken, saveColor);
router.get(apis.get_favourites, verifyToken, getFavourites)

router.post(apis.logout, logout);
// router.get(apis.profile_details, getDetails);

export default router;
