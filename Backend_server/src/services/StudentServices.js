import { query } from "../db.js"

export const insertStudent = async (studentData) => {
    const { 
     ktu_id,
     student_name,
     department,
     rit_email,
     phone_number,
     program,
    semester,
     date_of_birth,
     year_of_graduation,
     gender,
     cgpa,
      no_of_backlogs,
     supply_history
} = studentData; 

    const { rows } = await query(
    `
    INSERT INTO student (
      ktu_id, student_name, department, rit_email, phone_number, program,
      semester, date_of_birth, year_of_graduation, gender,cgpa,
      no_of_backlogs, supply_history
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
    ) RETURNING *;
  `,
    [ktu_id, student_name, department, rit_email, phone_number, program,
      semester, date_of_birth, year_of_graduation, gender, cgpa,
      no_of_backlogs, supply_history]
);

return rows[0];  // Returns the newly inserted student


}

export const fetchEligibleDrives = async (ktu_id) => {
    try {
        // 🔹 1. Fetch student details
        const studentQuery = `
            SELECT ktu_id, cgpa, no_of_backlogs, supply_history,department
            FROM student WHERE ktu_id = $1
        `;
        const studentRes = await query(studentQuery, [ktu_id]);

        if (studentRes.rowCount === 0) return null;

        const { cgpa, no_of_backlogs, supply_history,department } = studentRes.rows[0];

        // 🔹 2. Fetch drives where the student meets CGPA, backlog, and supply history criteria
        const driveQuery = `
            SELECT * FROM placement_drive 
            WHERE min_cgpa_required <= $1
            AND no_of_backlogs_permitted >= $2
            AND (supply_history_allowed OR $3 = false)
            AND $4=ANY(focused_branches)
            AND start_date>CURRENT_DATE
            AND last_date_to_submit>=CURRENT_DATE
        `;
        const drivesRes = await query(driveQuery, [cgpa, no_of_backlogs, supply_history,department]);

        let eligibleDrives = drivesRes.rows;

        // 🔹 3. Check past placements for filtering
        const pastPlacementQuery = `
            SELECT d.drive_type 
            FROM drive_result dr
            JOIN placement_drive d ON dr.drive_id = d.drive_id
            WHERE dr.ktu_id = $1 AND dr.result = 'Selected'
        `;
        const pastRes = await query(pastPlacementQuery, [ktu_id]);
        const pastPlacements = pastRes.rows.map((row) => row.drive_type);

        // 🔹 4. Filter based on past placement rules
        eligibleDrives = eligibleDrives.filter((drive) => {
            const { drive_type } = drive;

            if (pastPlacements.includes("Dream") && drive_type !== "Core") return false;
            if (pastPlacements.includes("Core") && drive_type !== "Dream") return false;
            if (pastPlacements.includes("IT") && !["Core", "Dream"].includes(drive_type)) return false;
            if (pastPlacements.includes("Open")) return true; // Open allows all
            return pastPlacements.length < 2 || drive_type === "Open"; // Max 2 placements allowed
        });

        // 🔹 5. Separate On-Campus and Off-Campus drives
        const onCampusDrives = eligibleDrives.filter((drive) => drive.drive_mode === "On Campus");
        const offCampusDrives = eligibleDrives.filter((drive) => drive.drive_mode === "Off Campus");

        return { on_campus: onCampusDrives, off_campus: offCampusDrives };
    } catch (error) {
        console.error("Error fetching eligible drives:", error);
        throw error;
    }
};