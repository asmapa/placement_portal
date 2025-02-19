import { verifyStudentDetails, updateStudentDetails, uploadResume, generateToken } from '../services/registrationServices.js';

export const registerStudent = async (req, res) => {
    const { ktuId, studentName, phoneNumber, ritEmail, yearOfGraduation, department, skills, password, confirmPassword } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Check file type (e.g., allow only PDFs)
    if (file.mimetype !== 'application/pdf') {
        return res.status(400).json({ message: 'Invalid file type. Only PDFs are allowed.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const student = await verifyStudentDetails(ktuId, studentName, phoneNumber, ritEmail, yearOfGraduation, department,file);
        if (!student) {
            return res.status(404).json({ message: 'Student details not found' });
        }

        const resumeUrl = await uploadResume(file);
        await updateStudentDetails(ktuId, skills, resumeUrl, password);

        const token = generateToken(ktuId);
        res.status(200).json({ message: 'Registration successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};