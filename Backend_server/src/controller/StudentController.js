import * as StudentServices from "../services/StudentServices.js"

export const getStudent = async (req, res) => {
    try {
        const students = await StudentServices.getStudent();
        res.status(200).json(students);
    } catch (err) {
        console.error("Error for fetching Data!",err);
    }
}

export const createStudent = async (req, res) => {
    try {
        const studentData = await req.body;
        const newStudentData = await StudentServices.createStudent(studentData);
        res.status(200).json(newStudentData);
    } catch (err) {
        console.error("Error for inserting data !!", err);
    }
}