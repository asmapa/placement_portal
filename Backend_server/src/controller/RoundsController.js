import * as roundsServices from "../services/RoundsServices.js";

export const createPlacementRound = async (req, res) => {
  try {
    const rounds = req.body; // Expecting an array of rounds

    if (!Array.isArray(rounds) || rounds.length === 0) {
      return res.status(400).json({ message: "Invalid round data. Must be an array." });
    }

    // Insert each round and collect results
    const insertedRounds = await Promise.all(rounds.map(async (round) => {
      return await roundsServices.addPlacementRound(round);
    }));

    res.status(201).json({ message: "Rounds added successfully!", rounds: insertedRounds });
  } catch (error) {
    console.error("Error inserting rounds:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getAllPlacementRounds = async (req, res) => {
  try {
    const rounds = await roundsServices.getPlacementRounds();
    res.json(rounds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDriveRounds = async (req, res) => {
  try {
    const { drive_id} = req.params;
    const rounds = await roundsServices.getDriveRounds(drive_id);
    if (rounds.length==0) return res.status(404).json({ message: "Drive not found" });
    res.json(rounds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlacementRound = async (req, res) => {
  try {
    const { drive_id, round_number } = req.params;
    const round = await roundsServices.getPlacementRoundById(drive_id, round_number);
    if (!round) return res.status(404).json({ message: "Round not found" });
    res.json(round);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePlacementRound = async (req, res) => {
  try {
    const { drive_id, round_number } = req.params;
    const updatedRound = await roundsServices.updatePlacementRound(drive_id, round_number, req.body);
    if (!updatedRound) return res.status(404).json({ message: "Round not found" });
    res.json(updatedRound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePlacementRound = async (req, res) => {
  try {
    const { drive_id, round_number } = req.params;
    const deleted = await roundsServices.deletePlacementRound(drive_id, round_number);
    if (!deleted) return res.status(404).json({ message: "Round not found" });
    res.json({ message: "Round deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
