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
    const { rows } = await query(`
        select drive_id,pd.company_id,company_name, job_role, num_of_rounds, training_package, permanent_package,
            drive_mode, drive_type, start_date, last_date_to_submit, 
            no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, 
            focused_branches,work_location,  description, registration_link
        from placement_drive pd join company c on pd.company_id=c.company_id`);
    return rows;
};

export const deleteDrive = async (drive_id) => {
    try {
        await query("BEGIN");

        // Delete all rounds associated with the drive
        await query(`DELETE FROM placement_round WHERE drive_id = $1;`, [drive_id]);

        // Delete the drive itself
        const { rows } = await query(
            `DELETE FROM placement_drive WHERE drive_id = $1 RETURNING *;`, 
            [drive_id]
        );

        if (rows.length === 0) {
            await query("ROLLBACK");
            return { success: false, message: "Drive not found" };
        }

        await query("COMMIT");
        return { success: true, message: "Drive and all related rounds deleted successfully" };
    } catch (error) {
        console.error("🔥 DELETE ERROR:", error.message);
        await query("ROLLBACK");
        throw error;
    }
};



export const getUpcomingDrives = async () => {
    const { rows } = await query(`
        select drive_id,pd.company_id,company_name, job_role, num_of_rounds, training_package, permanent_package,
            drive_mode, drive_type, start_date, last_date_to_submit, 
            no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, 
            focused_branches,work_location,  description, registration_link
        from placement_drive pd join company c on pd.company_id=c.company_id
        WHERE start_date > CURRENT_DATE
    `);
    return rows;
};

export const getPastDrives = async () => {
    const { rows } = await query(`
        select drive_id,pd.company_id,company_name, job_role, num_of_rounds, training_package, permanent_package,
            drive_mode, drive_type, start_date, last_date_to_submit, 
            no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, 
            focused_branches,work_location,  description, registration_link
        from placement_drive pd join company c on pd.company_id=c.company_id
        WHERE start_date + duration < CURRENT_DATE
    `);
    return rows;
};

export const getOngoingDrives = async () => {
    const { rows } = await query(`
        select drive_id,pd.company_id,company_name, job_role, num_of_rounds, training_package, permanent_package,
            drive_mode, drive_type, start_date, last_date_to_submit, 
            no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, 
            focused_branches,work_location,  description, registration_link
        from placement_drive pd join company c on pd.company_id=c.company_id
        WHERE start_date <= CURRENT_DATE
        AND start_date + duration >= CURRENT_DATE
    `);
    return rows;
};

export const updateDrive = async (drive_id, updatedData) => {
    const {
        company_id, job_role, start_date, // These are part of the unique constraint
    } = updatedData;

    // Check if a row already exists with the same company_id, job_role, start_date (excluding current drive_id)
    const existingDrive = await query(
        `SELECT * FROM placement_drive 
         WHERE company_id = $1 
           AND job_role = $2 
           AND start_date = $3 
           AND drive_id <> $4`,  // Exclude the current row
        [company_id, job_role, start_date, drive_id]
    );

    if (existingDrive.rows.length > 0) {
        throw new Error("A placement drive with the same company, role, and start date already exists.");
    }

    // If no duplicate, proceed with update
    const { rows } = await query(
        `
        UPDATE placement_drive 
        SET 
            company_id = $1, 
            job_role = $2, 
            num_of_rounds = $3, 
            training_package = $4, 
            permanent_package = $5, 
            drive_mode = $6, 
            drive_type = $7, 
            start_date = $8, 
            last_date_to_submit = $9, 
            no_of_backlogs_permitted = $10, 
            supply_history_allowed = $11, 
            min_cgpa_required = $12, 
            focused_branches = $13, 
            description = $14, 
            registration_link = $15, 
            work_location = $16
            
        WHERE drive_id = $17
        RETURNING *;
        `,
        [
            company_id, job_role, updatedData.num_of_rounds, updatedData.training_package, 
            updatedData.permanent_package, updatedData.drive_mode, updatedData.drive_type, 
            start_date, updatedData.last_date_to_submit, updatedData.no_of_backlogs_permitted, 
            updatedData.supply_history_allowed, updatedData.min_cgpa_required, 
            updatedData.focused_branches, updatedData.description, updatedData.registration_link, 
            updatedData.work_location, drive_id
        ]
    );

    return rows[0]; // Returns the updated placement drive
};

export const getAllPlacementDrives = async () => {
    try {
        const { rows: drives } = await query(`
            SELECT pd.*, c.company_name 
            FROM placement_drive pd
            INNER JOIN company c ON pd.company_id = c.company_id;
        `);

        return drives; // Returning the combined result
    } catch (error) {
        console.error("Error fetching placement drives:", error);
        throw new Error("Failed to fetch placement drives.");
    }
};

export const getDrivesByCompany = async (companyId) => {
    const drive_query = `
        SELECT pd.*, c.company_name 
        FROM placement_drive pd
        INNER JOIN company c ON pd.company_id = c.company_id
        WHERE pd.company_id = $1;
    `;

    try {
        const { rows } = await query(drive_query, [companyId]);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};
