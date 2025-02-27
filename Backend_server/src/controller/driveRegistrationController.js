import { registerForDrive, isStudentRegistered,getRegisteredStudents } from "../services/driveRegistrationService.js";

// Controller function to handle drive registration
const handleDriveRegistration = async (req, res) => {
    const { ktu_id, drive_id } = req.body; // Get student ID and drive ID from request body

    if (!ktu_id || !drive_id) {
        return res.status(400).json({ message: "ktu_id and drive_id are required" });
    }

    try {
        // Check if student is already registered
        const alreadyRegistered = await isStudentRegistered(ktu_id, drive_id);
        if (alreadyRegistered) {
            return res.status(409).json({ message: "Student already registered for this drive" });
        }

        // Register student
        const registration = await registerForDrive(ktu_id, drive_id);
        res.status(201).json({ message: "Registration successful", data: registration });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const fetchRegisteredStudents = async (req, res) => {
    const { driveId } = req.params;

    if (!driveId || isNaN(driveId)) {
        return res.status(400).json({ message: 'Invalid drive ID' });
    }

    try {
        const students = await getRegisteredStudents(driveId);
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export { handleDriveRegistration };
