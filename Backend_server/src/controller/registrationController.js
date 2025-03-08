import { verifyStudentDetails, updateStudentDetails, uploadResume, generateToken } from '../services/registrationServices.js';
import logger from '../utils/logger.js';

export const registerStudent = async (req, res) => {
    const { ktuId, studentName,skills, password, confirmPassword } = req.body;
    const file = req.file;

    // Validate required fields
    if (!ktuId || !studentName || !skills || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Check file type
    if (file.mimetype !== 'application/pdf') {
        return res.status(400).json({ message: 'Invalid file type. Only PDFs are allowed.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const student = await verifyStudentDetails(ktuId,file);
        if (!student) {
            return res.status(404).json({ message: 'Student details not found' });
        }

        const resumeUrl = await uploadResume(file,ktuId, studentName);
        await updateStudentDetails(ktuId,skills, resumeUrl, password);

        const token = generateToken(ktuId);
        res.status(200).json({ message: 'Registration successful', token });
    } catch (error) {
        logger.error(`Registration failed: ${error.message}`);
       if (error.message.includes("Student details not found")) {
            return res.status(404).json({ message: error.message });
        } else if (error.message.includes("Student is already registered")) {
            return res.status(400).json({ message: error.message });
        } else if (error.message.includes("Invalid file type")) {
            return res.status(400).json({ message: error.message });
        } else if (error.message.includes("File size exceeds")) {
            return res.status(400).json({ message: error.message });
        } else if (error.message.includes("Failed to upload resume")) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'Registration failed', error: error.message });
        }
    }
};