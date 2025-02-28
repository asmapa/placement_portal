import { query } from "../db.js";

const ResultService = {
  async getCompanyId(companyName) {
    const result_query = `SELECT company_id FROM company WHERE company_name = $1`;
    const { rows } = await query(result_query, [companyName]);
    return rows[0]?.company_id || null;
  },

  async getDriveId(companyName, jobRole, year) {
    const result_query = `
      SELECT drive_id FROM placement_drive 
      WHERE company_id = (SELECT company_id FROM company WHERE company_name = $1)
      AND job_role = $2 
      AND EXTRACT(YEAR FROM start_date) = $3
    `;
    const { rows } = await query(result_query, [companyName, jobRole, year]);
    return rows[0]?.drive_id || null;
  },

 async isEligibleForNextRound(driveId, roundNumber, ktuId) {
    if (roundNumber === 1) return true; // No previous round, student is eligible by default

    const result_query = `
      SELECT status FROM round_result 
      WHERE drive_id = $1 AND round_number = $2 AND ktu_id = $3
    `;
    const { rows } = await query(result_query, [driveId, roundNumber - 1, ktuId]);

    return rows.length > 0 && rows[0].status === "Cleared";
  },

  async insertRoundResult(driveId, roundNumber, ktuId, status) {
    const result_query = `
        INSERT INTO round_result (drive_id, round_number, ktu_id, status) 
        VALUES ($1, $2, $3, $4) 
        ON CONFLICT (drive_id, round_number, ktu_id) 
        DO UPDATE SET status = EXCLUDED.status
    `;
    await query(result_query, [driveId, roundNumber, ktuId, status]);

    // Check if student has failed any round
    const failCheckQuery = `
        SELECT COUNT(*) AS failed_rounds 
        FROM round_result 
        WHERE drive_id = $1 AND ktu_id = $2 AND status = 'Not Cleared'
    `;
    const failResult = await query(failCheckQuery, [driveId, ktuId]);
    const failedRounds = parseInt(failResult.rows[0].failed_rounds, 10);

    if (failedRounds > 0) {
        // Student failed at least one round, mark as "Not Selected"
        await this.insertDriveResult(driveId, ktuId, "Not Selected");
        return;
    }

    // Check if this is the last round in the drive
    const numRoundsQuery = `SELECT num_of_rounds FROM placement_drive WHERE drive_id = $1`;
    const numRoundsResult = await query(numRoundsQuery, [driveId]);
    const totalRounds = numRoundsResult.rows[0]?.num_of_rounds || 0;

    if (roundNumber === totalRounds && status === "Cleared") {
        // If the student passed the last round, mark as "Selected"
        await this.insertDriveResult(driveId, ktuId, "Selected");
    }
  },

  async insertDriveResult(driveId, ktuId, result) {
    const result_query = `
      INSERT INTO drive_result (drive_id, ktu_id, result) 
      VALUES ($1, $2, $3) 
      ON CONFLICT (drive_id, ktu_id) 
      DO UPDATE SET result = EXCLUDED.result
    `;
    await query(result_query, [driveId, ktuId, result]);
  },

  async getRoundResults(driveId, roundNumber) {
    const result_query = `SELECT * FROM round_result WHERE drive_id = $1 AND round_number = $2`;
    const { rows } = await query(result_query, [driveId, roundNumber]);
    return rows;
  },

  async getDriveResults(driveId) {
    const result_query = `SELECT * FROM drive_result WHERE drive_id = $1`;
    const { rows } = await query(result_query, [driveId]);
    return rows;
  },

  async deleteRoundResult(driveId, roundNumber, ktuId) {
    const result_query = `DELETE FROM round_result WHERE drive_id = $1 AND round_number = $2 AND ktu_id = $3`;
    await query(result_query, [driveId, roundNumber, ktuId]);
  },

  async deleteDriveResult(driveId, ktuId) {
    const result_query = `DELETE FROM drive_result WHERE drive_id = $1 AND ktu_id = $2`;
    await query(result_query, [driveId, ktuId]);
  }
};

export default ResultService;
