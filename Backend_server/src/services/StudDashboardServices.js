import { query } from "../db.js";

export const getStudentProfile = async (ktuId) => {
    const stud_query = 'SELECT ktu_id, student_name, department, rit_email, phone_number, program, semester, date_of_birth, year_of_graduation, gender, cgpa, no_of_backlogs, supply_history, skills, resume_url FROM student WHERE ktu_id = $1';
    const { rows } = await query(stud_query, [ktuId]);
    return rows[0];
};

export const updateStudentProfile = async (ktuId, updateData) => {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    
    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const stud_query = `UPDATE student SET ${setClause} WHERE ktu_id = $1 RETURNING *`;

    const { rows } = await query(stud_query, [ktuId, ...values]);
    return rows[0];
};


export const getRegisteredDrives = async (ktuId) => {
    try {
        const drive_query = `
            SELECT 
                pd.*,company_name
            FROM (drive_registered dr
            JOIN placement_drive pd ON dr.drive_id = pd.drive_id) JOIN company c ON pd.company_id = c.company_id
            WHERE dr.ktu_id = $1
        `;

        const { rows } = await query(drive_query, [ktuId]);

        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getStudentRoundResults = async (ktuId, driveId) => {
    try {
        const round_query = `
            SELECT 
                pr.round_number, 
                pr.round_name, 
                pr.round_date, 
                pr.duration, 
                pr.location, 
                pr.mode,
                COALESCE(rr.status, 'Pending') AS status
            FROM placement_round pr
            LEFT JOIN round_result rr 
                ON pr.drive_id = rr.drive_id 
                AND pr.round_number = rr.round_number 
                AND rr.ktu_id = $1
            WHERE pr.drive_id = $2
            ORDER BY pr.round_number ASC
        `;

        const { rows } = await query(round_query, [ktuId, driveId]);

        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};
