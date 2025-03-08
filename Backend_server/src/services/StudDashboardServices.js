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

        const company_query = `
            SELECT c.company_name 
            FROM company c
            INNER JOIN placement_drive pd ON c.company_id = pd.company_id
            WHERE pd.drive_id = $1
        `;

        const { rows: roundResults } = await query(round_query, [ktuId, driveId]);
        const { rows: companyData } = await query(company_query, [driveId]);

        const companyName = companyData.length > 0 ? companyData[0].company_name : null;

        return { companyName, roundResults };    
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getStudentProgress = async (ktuId, driveId) => {
    try {
        // Get total number of rounds for the given drive
        const totalRoundsQuery = `
            SELECT num_of_rounds FROM placement_drive WHERE drive_id = $1
        `;
        const totalRoundsResult = await query(totalRoundsQuery, [driveId]);

        if (totalRoundsResult.rows.length === 0) {
            throw new Error("Drive not found");
        }

        const totalRounds = totalRoundsResult.rows[0].num_of_rounds;

        // Get the number of rounds the student has cleared
        const clearedRoundsQuery = `
            SELECT COUNT(*) AS cleared_rounds
            FROM round_result
            WHERE drive_id = $1 AND ktu_id = $2 AND status = 'Cleared'
        `;
        const clearedRoundsResult = await query(clearedRoundsQuery, [driveId, ktuId]);
        const clearedRounds = parseInt(clearedRoundsResult.rows[0].cleared_rounds, 10);

        // Calculate progress percentage
        const progressPercentage = totalRounds > 0 ? (clearedRounds / totalRounds) * 100 : 0;

        return {
            driveId,
            ktuId,
            totalRounds,
            clearedRounds,
            progressPercentage: progressPercentage.toFixed(2) // Keep two decimal places
        };
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getDriveStatus = async (ktu_id, drive_id) => {
    try {
        // Check if the student is registered for the drive
        const registeredCheckQuery = `
            SELECT * FROM drive_registered 
            WHERE drive_id = $1 AND ktu_id = $2
        `;
        const registeredResult = await query(registeredCheckQuery, [drive_id, ktu_id]);

        if (registeredResult.rowCount === 0) {
            return { status: 404, message: "Student is not registered for this drive" };
        }

        // Check if drive result exists
        const resultQuery = `
            SELECT result FROM drive_result 
            WHERE drive_id = $1 AND ktu_id = $2
        `;
        const driveResult = await query(resultQuery, [drive_id, ktu_id]);

        if (driveResult.rowCount > 0) {
            return { status: 200, driveStatus: "Completed", result: driveResult.rows[0].result };
        } else {
            return { status: 200, driveStatus: "Ongoing" };
        }
    } catch (error) {
        console.error("Error retrieving drive status:", error);
        return { status: 500, message: "Internal Server Error" };
    }
};



export const getStudentDriveStats = async (ktu_id) => {
    try {
        // Count total registered drives
        const totalDrivesQuery = `
            SELECT COUNT(*) AS total_registered
            FROM drive_registered
            WHERE ktu_id = $1
        `;
        const totalDrivesResult = await query(totalDrivesQuery, [ktu_id]);
        const totalRegistered = totalDrivesResult.rows[0].total_registered;

        // Count ongoing drives (drives where no entry exists in drive_result)
        const ongoingDrivesQuery = `
            SELECT COUNT(*) AS ongoing_drives
            FROM drive_registered dr
            LEFT JOIN drive_result drs 
            ON dr.drive_id = drs.drive_id AND dr.ktu_id = drs.ktu_id
            WHERE dr.ktu_id = $1 AND drs.ktu_id IS NULL
        `;
        const ongoingDrivesResult = await query(ongoingDrivesQuery, [ktu_id]);
        const ongoingDrives = ongoingDrivesResult.rows[0].ongoing_drives;

        // Count drives where student is placed
        const placedDrivesQuery = `
            SELECT COUNT(*) AS placed_count
            FROM drive_result
            WHERE ktu_id = $1 AND result = 'Selected'
        `;
        const placedDrivesResult = await query(placedDrivesQuery, [ktu_id]);
        const placedCount = placedDrivesResult.rows[0].placed_count;

        return {
            status: 200,
            totalRegistered: parseInt(totalRegistered),
            ongoingDrives: parseInt(ongoingDrives),
            placedDrives: parseInt(placedCount)
        };
    } catch (error) {
        console.error("Error retrieving student drive stats:", error);
        return { status: 500, message: "Internal Server Error" };
    }
};
