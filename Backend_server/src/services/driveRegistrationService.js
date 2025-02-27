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


export const getRegisteredStudents = async (driveId) => {
    const drive_query = `
        SELECT s.ktu_id, s.student_name, s.department, s.rit_email, s.phone_number, 
               s.program, s.semester, s.cgpa, s.no_of_backlogs, s.skills, s.resume_url
        FROM drive_registered dr
        JOIN student s ON dr.ktu_id = s.ktu_id
        WHERE dr.drive_id = $1;
    `;

    try {
        const { rows } = await query(drive_query, [driveId]);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

export { registerForDrive, isStudentRegistered };