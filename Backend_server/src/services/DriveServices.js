import { query } from "../db.js";

export const insertDrive = async (driveData) => {
    const { 
        company_id,
        job_role,
        num_of_rounds,
        training_package,  // Moved up to match DB order
        permanent_package, // Moved up to match DB order
        drive_mode,
        drive_type,
        start_date,
        last_date_to_submit, // Moved up to match DB order
        no_of_backlogs_permitted,
        supply_history_allowed,
        min_cgpa_required,
        focused_branches,
        description,
        registration_link,  // Moved up to match DB order
        work_location,
        duration
    } = driveData; 

    const { rows } = await query(
        `
        INSERT INTO placement_drive (
            company_id, job_role, num_of_rounds, training_package, permanent_package,
            drive_mode, drive_type, start_date, last_date_to_submit, 
            no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, 
            focused_branches, description, registration_link, work_location, duration
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
        ) RETURNING *;
        `,
        [
            company_id, job_role, num_of_rounds, training_package, permanent_package,
            drive_mode, drive_type, start_date, last_date_to_submit, 
            no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, 
            focused_branches, description, registration_link, work_location, duration
        ]
    );

    return rows[0]; // Returns the newly inserted placement drive
};

export const getAllDrives = async () => {
    const { rows } = await query(`select *from placement_drive`);
    return rows;
};

export const getUpcomingDrives = async () => {
    const { rows } = await query(`
        SELECT * FROM placement_drive
        WHERE start_date > CURRENT_DATE
    `);
    return rows;
};

export const getPastDrives = async () => {
    const { rows } = await query(`
        SELECT * FROM placement_drive
        WHERE start_date + duration < CURRENT_DATE
    `);
    return rows;
};

export const getOngoingDrives = async () => {
    const { rows } = await query(`
        SELECT * FROM placement_drive
        WHERE start_date <= CURRENT_DATE
        AND start_date + duration >= CURRENT_DATE
    `);
    return rows;
};