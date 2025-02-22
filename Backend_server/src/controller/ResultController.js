import ResultService from "../services/resultServices.js";

const ResultController = {
  async getCompanyId(req, res) {
    try {
      const { companyName } = req.params;
      const companyId = await ResultService.getCompanyId(companyName);
      if (!companyId) return res.status(404).json({ message: "Company not found" });
      res.json({ companyId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getDriveId(req, res) {
    try {
      const { companyName, jobRole, year } = req.params;
      const driveId = await ResultService.getDriveId(companyName, jobRole, year);
      if (!driveId) return res.status(404).json({ message: "Drive not found" });
      res.json({ driveId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async checkEligibility(req, res) {
    try {
      const { driveId, roundNumber, ktuId } = req.params;
      const eligible = await ResultService.isEligibleForNextRound(driveId, roundNumber, ktuId);
      res.json({ eligible });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async insertRoundResult(req, res) {
    try {
      const { driveId, roundNumber, ktuId, status } = req.body;
      await ResultService.insertRoundResult(driveId, roundNumber, ktuId, status);
      res.json({ message: "Round result recorded" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async insertDriveResult(req, res) {
    try {
      const { driveId, ktuId, result } = req.body;
      await ResultService.insertDriveResult(driveId, ktuId, result);
      res.json({ message: "Drive result recorded" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getRoundResults(req, res) {
    try {
      const { driveId, roundNumber } = req.params;
      const results = await ResultService.getRoundResults(driveId, roundNumber);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getDriveResults(req, res) {
    try {
      const { driveId } = req.params;
      const results = await ResultService.getDriveResults(driveId);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteRoundResult(req, res) {
    try {
      const { driveId, roundNumber, ktuId } = req.params;
      await ResultService.deleteRoundResult(driveId, roundNumber, ktuId);
      res.json({ message: "Round result deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteDriveResult(req, res) {
    try {
      const { driveId, ktuId } = req.params;
      await ResultService.deleteDriveResult(driveId, ktuId);
      res.json({ message: "Drive result deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default ResultController;
