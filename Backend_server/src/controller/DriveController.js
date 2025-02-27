import * as DriveServices from "../services/DriveServices.js"
import ResultService from "../services/resultServices.js";

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
export const getAllDrives = async (req, res) => {
  try {
      const drives = await DriveServices.getAllDrives();
      return res.status(200).json({ drives });
  } catch (error) {
      console.error('Error fetching upcoming drives:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
  }
}
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


export const deleteDrive = async (req, res) => {
  try {
    const { drive_id } = req.params;

    if (!drive_id) {
      return res.status(400).json({ message: "Invalid drive_id" });
    }

    const response = await DriveServices.deleteDrive(drive_id);

    if (!response.success) {
      return res.status(404).json({ message: response.message });
    }

    res.json({ message: response.message });
  } catch (error) {
    console.error("🔥 DELETE DRIVE CONTROLLER ERROR:", error.message); // Log error
    res.status(500).json({ message: error.message });
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

export const updateDrive = async (req, res) => {
    try {
        const drive_id = parseInt(req.body.drive_id, 10);
        if (isNaN(drive_id)) {
            return res.status(400).json({ error: "Invalid drive_id" });
        }

        const { drive_id: _, ...driveData } = req.body; // Remove drive_id from data

        // Ensure null-safe values
        const safeValue = (value) => (value === undefined || value === "" ? null : value);
        const updatedData = Object.fromEntries(
            Object.entries(driveData).map(([key, value]) => [key, safeValue(value)])
        );

        const updatedDrive = await DriveServices.updateDrive(drive_id, updatedData);

        res.status(200).json({ message: "Drive updated successfully", updatedDrive });
    } catch (error) {
        console.error("Error updating Drive:", error.message);
        res.status(500).json({ error: error.message || "Failed to update Drive" });
    }
};

export const getPlacementDrives = async (req, res) => {
  try {
    const drives = await DriveServices.getAllPlacementDrives();
    res.status(200).json({ message: "Drives fetched successfully", drives });
  } catch (error) {
    console.error("Error fetching drives:", error);
    res.status(500).json({ error: "Failed to fetch drives" });
  }
};

export const fetchDrivesByCompany = async (req, res) => {
    const { companyName } = req.params;
    const companyId = await ResultService.getCompanyId(companyName);

    if (!companyId || isNaN(companyId)) {
        return res.status(400).json({ message: 'Invalid company ID' });
    }

    try {
        const drives = await DriveServices.getDrivesByCompany(companyId);
        res.status(200).json(drives);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

