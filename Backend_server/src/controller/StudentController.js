import * as StudentServices from "../services/StudentServices.js"

// Controller function to handle student insertion
export const addStudent = async (req, res) => {
  try {
    const students = req.body; // Receiving an array of students

    if (!Array.isArray(students)) {
      return res.status(400).json({ error: "Expected an array of students" });
    }

    const insertedStudents = [];
    for (const student of students) {
      console.log("📢 Inserting student:", student);
      const newStudent = await StudentServices.insertStudent(student);
      insertedStudents.push(newStudent);
    }

    res.status(201).json({ message: "✅ Students added successfully", students: insertedStudents });
  } catch (error) {
    console.error("❌ Error inserting students:", error);
    res.status(500).json({ error: "Failed to add students" });
  }
};



export const getEligibleDrives = async (req, res) => {
    try {
        const ktuId =  req.user.ktu_id;
        const eligibleDrives = await StudentServices.fetchEligibleDrives(ktuId);

        if (!eligibleDrives) {
            return res.status(404).json({ message: "Student not found or no eligible drives" });
        }

        res.json(eligibleDrives);
    } catch (error) {
        console.error("Error fetching eligible drives:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getStudents = async (req, res) => {
  try {
    const students = await StudentServices.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentsByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const students = await StudentServices.getStudentsByGraduationYear(year);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentsByDepartment = async (req, res) => {
  try {
    const { dept } = req.params;
    const students = await StudentServices.getStudentsByDepartment(dept);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlaced = async (req, res) => {
  try {
    const students = await StudentServices.getPlacedStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRegistered = async (req, res) => {
  try {
    const students = await StudentServices.getRegisteredStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchPlacementStatsByGraduationYear = async (req, res) => {
  try {
    const { year } = req.params;
    const stats = await StudentServices.getPlacementStatsByGraduationYear(year);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controller to get department-wise placement statistics
export const fetchDepartmentWiseStats = async (req, res) => {
  try {
    const { year } = req.params;
    const stats = await StudentServices.getDepartmentWiseStats(year);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlacedStudentCountByLast10YearController = async (req, res) => {
    try {
        const data = await StudentServices.getPlacedStudentCountByLast10Years();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching placement data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};