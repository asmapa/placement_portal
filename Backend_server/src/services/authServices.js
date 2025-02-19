import { query } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (rit_email, password) => {
  try {
    // Check if user exists
    const userQuery = "SELECT * FROM student WHERE rit_email = $1";
    const result = await query(userQuery, [rit_email]);

    if (result.rows.length === 0) {
      return { success: false, message: "Invalid email or password" };
    }

    const user = result.rows[0];

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Invalid email or password" };
    }

    // Generate JWT Token
    const token = jwt.sign(
      { ktu_id: user.ktu_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { success: true, token };
  } catch (error) {
    throw new Error(error.message);
  }
};
