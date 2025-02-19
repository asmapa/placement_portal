import { query } from "../db.js";
import cloudinary from "./cloudinaryServices.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyStudentDetails = async (ktuId, studentName, phoneNumber, ritEmail, yearOfGraduation, department) => {
    const reg_query = `
        SELECT * FROM student 
        WHERE ktu_id = $1;
    `;
    const values = [ktuId];
    const result = await query(reg_query, values);
    
    if (!result.rows[0]) return null; // Student not found
    if (result.rows[0].password) throw new Error("Student is already registered");
    
    return result.rows[0];
};

export const updateStudentDetails = async (ktuId, skills, resumeUrl, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const reg_query = `
        UPDATE student 
        SET skills = $1, resume_url = $2, password = $3 
        WHERE ktu_id = $4
    `;
    const values = [skills, resumeUrl, hashedPassword, ktuId];
    await query(reg_query, values);
};

export const uploadResume = async (file) => {
    if (!file || file.mimetype !== "application/pdf") {
        throw new Error("Invalid file type. Only PDFs are allowed.");
    }
    
    const result = await cloudinary.uploader.upload(file.path, {
        folder: "resumes",
        resource_type: "raw",
    });
    
    // Delete temp file after upload
    fs.unlinkSync(file.path);
    return result.secure_url;
};

export const generateToken = (ktuId) => {
    return jwt.sign({ ktuId }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};
