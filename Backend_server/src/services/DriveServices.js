import { query } from "../db.js";

export const insertDrive = async (driveData) => {
    const { 
        company_id,
        job_role,
        num_of_rounds,
        drive_mode,
        drive_type,
        start_date,
        no_of_backlogs_permitted,
        supply_history_allowed,
        min_cgpa_required,
        focused_branches,
        description,
        training_package,
        permanent_package,
        last_date_to_submit,
        registration_link,
        work_location
    } = driveData; 

    const { rows } = await query(
        `
        INSERT INTO placement_drive (
            company_id, job_role, num_of_rounds, drive_mode, drive_type,
            start_date, no_of_backlogs_permitted, supply_history_allowed, 
            min_cgpa_required, focused_branches, description, training_package, 
            permanent_package, last_date_to_submit, registration_link, work_location
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
        ) RETURNING *;
        `,
        [
            company_id, job_role, num_of_rounds, drive_mode, drive_type,
            start_date, no_of_backlogs_permitted, supply_history_allowed,
            min_cgpa_required, focused_branches, description, training_package,
            permanent_package, last_date_to_submit, registration_link, work_location
        ]
    );

    return rows[0]; // Returns the newly inserted placement drive
};
