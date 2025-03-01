import express from "express";
import { login } from "../controller/authController.js";
import bcrypt from "bcrypt"; // Ensure bcrypt is installed
import { query } from "../db.js"; // Import PostgreSQL query function
const router = express.Router();
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const result = await query("SELECT * FROM admins WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const admin = result.rows[0];

     // **Simple password comparison (No Hashing)**
    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Return name & role on successful login
    res.json({
      message: "Login successful",
      admin: { name: admin.name, role: admin.role, email: admin.email },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});




router.post("/login", login);
/*
response object:
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrdHVfaWQiOiJLVEUyNENTMDE1IiwiaWF0IjoxNzQwODAzNzA2LCJleHAiOjE3NDA4MDczMDZ9.rlgPl3UYqlqqQX2PZMKUZQjOzbLZNvdu6PlPGjh_8SY"
}*/
export default router;
