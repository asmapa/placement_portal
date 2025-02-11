import { query } from "../db.js"

export const getStudent = async () => {
    const { rows } = await query("select *from student_registration");
    return rows;
}

export const createStudent = async (studentData) => {
    const { 
    ktuid, 
    name, 
    gender, 
    year_of_study, 
    course, 
    branch, 
    cgpa, 
    program, 
    ritmail, 
    phone_number, 
    password, 
    dob 
} = studentData; 

    const { rows } = await query(
    `INSERT INTO student_registration 
    (ktuid, name, gender, year_of_study, course, branch, cgpa, program, ritmail, phone_number, password, dob)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
    RETURNING *`,
    [ktuid, name, gender, year_of_study, course, branch, cgpa, program, ritmail, phone_number, password, dob]
);

return rows[0];  // Returns the newly inserted student


}