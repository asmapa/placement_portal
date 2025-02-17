import * as DriveServices from "../services/DriveServices.js"

// Controller function to handle student insertion
export const addDrive = async (req, res) => {
  try {
    const driveData = req.body; // JSON object received from frontend
    const newDrive = await DriveServices.insertDrive(driveData);
    res.status(201).json({ message: "Drive added successfully", drive: newDrive });
  } catch (error) {
    console.error("Error inserting drive:", error);
    res.status(500).json({ error: "Failed to add drive" });
  }
};

export const getUpcomingDrivesController = async (req, res) => {
    try {
        const drives = await DriveServices.getUpcomingDrives();
        return res.status(200).json({ drives });
    } catch (error) {
        console.error('Error fetching upcoming drives:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getPastDrivesController = async (req, res) => {
    try {
        const drives = await DriveServices.getPastDrives();
        return res.status(200).json({ drives });
    } catch (error) {
        console.error('Error fetching past drives:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getOngoingDrivesController = async (req, res) => {
    try {
        const drives = await DriveServices.getOngoingDrives();
        return res.status(200).json({ drives });
    } catch (error) {
        console.error('Error fetching ongoing drives:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};