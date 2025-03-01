import express from "express";
import { login } from "../controller/authController.js";

const router = express.Router();

router.post("/login", login);
/*
response object:
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrdHVfaWQiOiJLVEUyNENTMDE1IiwiaWF0IjoxNzQwODAzNzA2LCJleHAiOjE3NDA4MDczMDZ9.rlgPl3UYqlqqQX2PZMKUZQjOzbLZNvdu6PlPGjh_8SY"
}*/
export default router;
