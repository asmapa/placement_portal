import { query } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../utils/logger.js"; // Ensure you have a logger

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export const loginUser = async (rit_email, password) => {
  try {
    // Check if user exists
    const userQuery = "SELECT * FROM student WHERE rit_email = $1";
    const result = await query(userQuery, [rit_email]);

    if (result.rows.length === 0) {
      logger.warn(`Login attempt failed: Email not found (${rit_email})`);
      return { success: false, message: "Invalid email or password." };
    }

    const user = result.rows[0];

    // Check if the account has expired
    if (user.expires_at && new Date(user.expires_at) < new Date()) {
      logger.warn(`Login attempt failed: Account expired (${rit_email})`);
      return { success: false, message: "Your account has expired. Please contact the admin." };
    }

    if(user.password==null){
      return { success: false, message: "You are not registered" };
    }
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login attempt failed: Incorrect password (${rit_email})`);
      return { success: false, message: "Invalid email or password." };
    }

    // Generate JWT Token
    const token = jwt.sign(
      { ktu_id: user.ktu_id , student_name :user.student_name , gender:user.gender},
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  
    logger.info(`User logged in successfully: ${rit_email}`);
    return { success: true, token };
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    throw new Error("An error occurred during login.");
  }
};
