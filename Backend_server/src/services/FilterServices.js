import { query } from "../db.js";

export const filterStudents = async ({ department, minCgpa, no_of_backlogs,noSupplyHistory, placed, graduationYear }) => {
  let stud_query = `SELECT ktu_id, student_name, department, rit_email, phone_number, program, semester, 
                    date_of_birth, year_of_graduation, gender, cgpa, no_of_backlogs, supply_history, 
                    skills, resume_url 
                    FROM student WHERE password IS NOT NULL`;
  const params = [];
  
  if (department) {
    params.push(department);
    stud_query += ` AND department = $${params.length}`;
  }
  
  if (minCgpa) {
    params.push(minCgpa);
    stud_query += ` AND cgpa >= $${params.length}`;
  }
  
  if (no_of_backlogs) {
    params.push(no_of_backlogs);
    stud_query += ` AND no_of_backlogs <= $${params.length}`;
  }

  if (placed !== undefined) {
  params.push(placed === "true" ? "Selected" : "Not Selected");
  stud_query += ` AND EXISTS (
    SELECT 1 FROM drive_result dr 
    WHERE dr.ktu_id = student.ktu_id 
    AND dr.result = $${params.length}
  )`;
}


if (noSupplyHistory !== undefined) {
    params.push(noSupplyHistory === "false"); // Convert "true" to boolean
    stud_query += ` AND supply_history = $${params.length}`;
  }

  if (graduationYear) {
    params.push(graduationYear);
    stud_query += ` AND year_of_graduation = $${params.length}`;
  }

  const { rows } = await query(stud_query, params);
  return rows;
};
