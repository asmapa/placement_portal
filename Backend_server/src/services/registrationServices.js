import { query } from "../db.js";
import cloudinary from "./cloudinaryServices.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import logger from "../utils/logger.js"; // Assuming you have a logger utility

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export const verifyStudentDetails = async (ktuId,file) => {
    const reg_query = `
        SELECT * FROM student 
        WHERE ktu_id = $1;
    `;
    const values = [ktuId];

    try {
        const result = await query(reg_query, values);
        
        if (!result.rows[0]) {
            fs.unlinkSync(file.path); // Delete temp file
            logger.warn(`Student not found: ${ktuId}`);
            return null; // Student not found
        }
        if (result.rows[0].password) { 
            fs.unlinkSync(file.path); // Delete temp file
            logger.warn(`Student already registered: ${ktuId}`);
            throw new Error("Student is already registered");
        }
        
        return result.rows[0];
    } catch (error) {
        logger.error(`Database error: ${error.message}`);
        throw new Error("Failed to verify student details");
    }
};

export const updateStudentDetails = async (ktuId,skills, resumeUrl, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const reg_query = `
        UPDATE student 
        SET skills = $1, resume_url = $2, password = $3 
        WHERE ktu_id = $4
    `;
    const values = [skills,resumeUrl, hashedPassword, ktuId];

    try {
        await query(reg_query, values);
        logger.info(`Student details updated: ${ktuId}`);
    } catch (error) {
        logger.error(`Database error: ${error.message}`);
        throw new Error("Failed to update student details");
    }
};

export const uploadResume = async (file,ktuId, studentName) => {
    if (!file || file.mimetype !== "application/pdf") {
        throw new Error("Invalid file type. Only PDFs are allowed.");
    }

    // Check file size (e.g., 5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        throw new Error("File size exceeds the limit of 5MB.");
    }

    // Generate a custom file name
    const timestamp = Date.now(); // Add a timestamp for uniqueness
    const customFileName = `${ktuId}_${studentName}_${timestamp}`; // Example: "12345_JohnDoe_1697200000000.pdf"

    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "resumes",
            resource_type: "raw",
            public_id: customFileName, // Use the custom file name
            format: "pdf",
        });
        logger.info(`Resume uploaded successfully: ${result.secure_url}`);
        return result.secure_url;
    } catch (error) {
        logger.error(`File upload error: ${error.message}`);
        throw new Error("Failed to upload resume: " + error.message);
    } finally {
        // Delete temp file after upload (even if an error occurs)
        fs.unlinkSync(file.path);
    }
};

export const generateToken = (ktuId) => {
    return jwt.sign({ ktu_id: ktuId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }); // Token expires in 1 hour
};