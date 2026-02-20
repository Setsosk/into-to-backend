//import statements
import { Router } from "express";
import { logoutUser, registerUser, loginUser } from "../controller/user.controller.js";


const router = Router();

//post cause we are creating data on website
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

export default router;