import { query } from "../db.js"

// Function to insert student data
export const insertStudent = async (studentData) => {  // Change from createStudent to insertStudent
  const { rows } = await query( `
    INSERT INTO student (
      ktu_id, student_name, department, rit_email, phone_number, program,
      semester, date_of_birth, year_of_graduation, gender, sgpa, cgpa,
      no_of_backlogs, supply_history
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
    ) RETURNING *;
  `);

  const values = [
    studentData.ktu_id,
    studentData.student_name,
    studentData.department,
    studentData.rit_email,
    studentData.phone_number,
    studentData.program,
    studentData.semester,
    studentData.date_of_birth,
    studentData.year_of_graduation,
    studentData.gender,
    studentData.sgpa, // Expecting an array
    studentData.cgpa,
    studentData.no_of_backlogs,
    studentData.supply_history
  ];

  return rows[0];
};

