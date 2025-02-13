import * as StudentServices from "../services/StudentServices.js"

// Controller function to handle student insertion
export const addStudent = async (req, res) => {
  try {
    const studentData = req.body; // JSON object received from frontend
    const newStudent = await StudentServices.insertStudent(studentData);
    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    console.error("Error inserting student:", error);
    res.status(500).json({ error: "Failed to add student" });
  }
};