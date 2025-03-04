import { getStudentDriveStats,getStudentProfile, updateStudentProfile,getRegisteredDrives ,getStudentRoundResults,getStudentProgress,getDriveStatus} from '../services/StudDashboardServices.js';

export const viewProfile = async (req, res) => {
    try {
        const ktuId = req.user.ktu_id; // Extracted from JWT token
        const student = await getStudentProfile(ktuId);
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const editProfile = async (req, res) => {
    try {
        const ktuId = req.user.ktu_id; // Extracted from JWT token
        const updateData = req.body;

        if (updateData.ktu_id || updateData.rit_email || updateData.cgpa || updateData.no_of_backlogs) {
            return res.status(400).json({ message: "You cannot update restricted fields like KTU ID, email, CGPA, or backlogs." });
        }

        const updatedStudent = await updateStudentProfile(ktuId, updateData);
        res.status(200).json({ message: 'Profile updated successfully', student: updatedStudent });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


export const getStudentRegisteredDrives = async (req, res) => {
    try {
        const ktuId = req.user.ktu_id; // Retrieve KTU ID from JWT token

        const drives = await getRegisteredDrives(ktuId);

        if (drives.length === 0) {
            return res.status(404).json({ message: "No registered drives found" });
        }

        return res.status(200).json(drives);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const getRoundResultsForDrive = async (req, res) => {
    try {
        const ktuId = req.user.ktu_id; // Extract KTU ID from token
        const { driveId } = req.params; // Extract drive ID from parameters

        if (!driveId) {
            return res.status(400).json({ message: "Drive ID is required" });
        }

        const roundResults = await getStudentRoundResults(ktuId, driveId);

        if (roundResults.length === 0) {
            return res.status(404).json({ message: "No rounds found for this drive" });
        }

        return res.status(200).json(roundResults);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const getProgressForDrive = async (req, res) => {
    try {
        const ktuId = req.user.ktu_id; // Extract KTU ID from token
        console.log(ktuId);
        const { driveId } = req.params; // Extract drive ID from parameters
        console.log(driveId);

        if (!driveId) {
            return res.status(400).json({ message: "Drive ID is required" });
        }

        const progressData = await getStudentProgress(ktuId, driveId);

        return res.status(200).json(progressData);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const fetchDriveStatus = async (req, res) => {
    try {
        const ktu_id = req.user.ktu_id; // Extracted from JWT token
        const { driveId } = req.params;

        const response = await getDriveStatus(ktu_id, driveId);

        return res.status(response.status).json(response);
    } catch (error) {
        console.error("Error in fetching drive status:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const fetchStudentDriveStats = async (req, res) => {
    try {
        const ktu_id = req.user.ktu_id; // Extract from JWT token
        const response = await getStudentDriveStats(ktu_id);
        return res.status(response.status).json(response);
    } catch (error) {
        console.error("Error fetching student drive stats:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
