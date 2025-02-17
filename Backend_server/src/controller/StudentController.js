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

export const getEligibleDrives = async (req, res) => {
    try {
        const { ktu_id } = req.params;
        const eligibleDrives = await StudentServices.fetchEligibleDrives(ktu_id);

        if (!eligibleDrives) {
            return res.status(404).json({ message: "Student not found or no eligible drives" });
        }

        res.json(eligibleDrives);
    } catch (error) {
        console.error("Error fetching eligible drives:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};