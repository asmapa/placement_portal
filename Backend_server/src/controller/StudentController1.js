import * as StudentServices from "../services/StudentServices2.js"

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
        
    } catch (err) {
        console.err("Error for inserting data !!", err);
    }
}