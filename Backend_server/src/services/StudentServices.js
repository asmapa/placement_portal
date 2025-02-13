import { query } from "../db.js"

/*export const getStudent = async () => {
    const { rows } = await query("select *from student");
    return rows;
}*/

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
     sgpa,
     cgpa,
      no_of_backlogs,
     supply_history
} = studentData; 

    const { rows } = await query(
    `
    INSERT INTO student (
      ktu_id, student_name, department, rit_email, phone_number, program,
      semester, date_of_birth, year_of_graduation, gender, sgpa, cgpa,
      no_of_backlogs, supply_history
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
    ) RETURNING *;
  `,
    [ktu_id, student_name, department, rit_email, phone_number, program,
      semester, date_of_birth, year_of_graduation, gender, sgpa, cgpa,
      no_of_backlogs, supply_history]
);

return rows[0];  // Returns the newly inserted student


}