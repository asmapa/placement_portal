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