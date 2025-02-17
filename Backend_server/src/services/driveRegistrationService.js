import { query } from "../db.js";
const registerForDrive = async (ktu_id, drive_id) => {
    try {
        const insertQuery = `
            INSERT INTO drive_registered (drive_id, ktu_id)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const result = await query(insertQuery, [drive_id, ktu_id]);
        return result.rows[0]; // Return inserted row
    } catch (error) {
        throw error;
    }
};

// Function to check if a student is already registered for a drive
const isStudentRegistered = async (ktu_id, drive_id) => {
    try {
        const checkQuery = `
            SELECT * FROM drive_registered
            WHERE drive_id = $1 AND ktu_id = $2;
        `;
        const result = await query(checkQuery, [drive_id, ktu_id]);
        return result.rows.length > 0;
    } catch (error) {
        throw error;
    }
};

export { registerForDrive, isStudentRegistered };