import express from "express";
import { sendOTP, verifyOTPController } from "../controller/otpController.js";

const router = express.Router();

router.post("/send-otp", sendOTP);
/*
http://localhost:3000/portal/send-otp

body
{
    "email": "22br15233@rit.ac.in"
}*/
router.post("/verify-otp", verifyOTPController);
/*
http://localhost:3000/portal/verify-otp

body
{
    "email": "22br15233@rit.ac.in",
    "otp": "436918"
}
*/

export default router;
