import { query } from "../db.js"


export const insertStudent = async (studentData) => {
    const { 
        ktu_id, student_name, department, rit_email, phone_number, program,
        semester, date_of_birth, year_of_graduation, gender, cgpa,
        no_of_backlogs, supply_history
    } = studentData; 

    // Debugging: Check if ktu_id exists
    if (!ktu_id) {
        console.error("❌ Error: ktu_id is missing or undefined in studentData", studentData);
        throw new Error("ktu_id is required but missing");
    }

    const { rows } = await query(
        `
        INSERT INTO student (
            ktu_id, student_name, department, rit_email, phone_number, program,
            semester, date_of_birth, year_of_graduation, gender, cgpa,
            no_of_backlogs, supply_history
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
        ) RETURNING *;
        `,
        [ktu_id, student_name, department, rit_email, phone_number, program,
            semester, date_of_birth, year_of_graduation, gender, cgpa,
            no_of_backlogs, supply_history]
    );

    return rows[0];
};


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
            SELECT pd.* ,company_name
            FROM placement_drive pd JOIN company c ON pd.company_id=c.company_id
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

export const getAllStudents = async () => {
  const stud_query = "SELECT * FROM student";
  const { rows } = await query(stud_query);
  return rows;
};

export const getStudentsByGraduationYear = async (year) => {
  const stud_query = "SELECT * FROM student WHERE year_of_graduation = $1";
  const { rows } = await query(stud_query, [year]);
  return rows;
};

export const getStudentsByDepartment = async (department) => {
  const stud_query = "SELECT * FROM student WHERE department = $1";
  const { rows } = await query(stud_query, [department]);
  return rows;
};

export const getPlacedStudents = async () => {
  const stud_query = `
    SELECT s.*, dr.drive_id, c.company_name, pd.job_role, pd.permanent_package
    FROM student s
    JOIN drive_result dr ON s.ktu_id = dr.ktu_id
    JOIN placement_drive pd ON dr.drive_id = pd.drive_id
    JOIN company c ON pd.company_id = c.company_id
    WHERE dr.result = 'Selected'
  `;
  const { rows } = await query(stud_query);
  return rows;
};

export const getRegisteredStudents = async () => {
  const stud_query = `
    SELECT DISTINCT s.*
    FROM student s
    JOIN drive_registered dr ON s.ktu_id = dr.ktu_id
  `;
  const { rows } = await query(stud_query);
  return { count: rows.length, students: rows };
};

// Get count of placed students for a particular year_of_graduation
export const getPlacedCountByGraduationYear = async (year) => {
  const stud_query = `
    SELECT COUNT(DISTINCT s.ktu_id) AS placed_count
    FROM student s
    JOIN drive_result dr ON s.ktu_id = dr.ktu_id
    WHERE s.year_of_graduation = $1 AND dr.result = 'Selected'
  `;
  const { rows } = await query(stud_query, [year]);
  return rows[0];
};

// Get department-wise placement statistics
export const getDepartmentWiseStats = async (year) => {
  const stud_query = `
    SELECT s.department, COUNT(DISTINCT dr.ktu_id) AS placed_count
    FROM student s
    JOIN drive_result dr ON s.ktu_id = dr.ktu_id
    WHERE dr.result = 'Selected' AND s.year_of_graduation = $1 
    GROUP BY s.department
  `;
  const { rows } = await query(stud_query,[year]);
  return rows;
};


export const getPlacedStudentCountByLast10Years = async () => {
    try {
        const stud_query = `
            SELECT s.year_of_graduation AS year, COUNT(DISTINCT dr.ktu_id) AS placed_count
            FROM drive_result dr
            JOIN student s ON dr.ktu_id = s.ktu_id
            WHERE dr.result = 'Selected'
            AND s.year_of_graduation >= EXTRACT(YEAR FROM CURRENT_DATE) - 10
            GROUP BY s.year_of_graduation
            ORDER BY s.year_of_graduation;
        `;

        const { rows } = await query(stud_query);
        
        // Convert query result into the desired JSON format
        const placementData = {};
        rows.forEach(row => {
            placementData[row.year] = row.placed_count;
        });

        return { placement_data: placementData };
    } catch (error) {
        throw error;
    }
};

