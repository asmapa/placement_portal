import { query } from "../db.js";
import sendEmailNotification from "./emailServices.js";

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
    // Insert or update the round result
    const resultQuery = `
        INSERT INTO round_result (drive_id, round_number, ktu_id, status) 
        VALUES ($1, $2, $3, $4) 
        ON CONFLICT (drive_id, round_number, ktu_id) 
        DO UPDATE SET status = EXCLUDED.status
    `;
    await query(resultQuery, [driveId, roundNumber, ktuId, status]);

    const driveQuery = `
    SELECT c.company_name, pr.round_name, pd.num_of_rounds 
    FROM placement_drive pd
    JOIN placement_round pr ON pd.drive_id = pr.drive_id
    JOIN company c ON pd.company_id = c.company_id
    WHERE pd.drive_id = $1 AND pr.round_number = $2
  `;

    const driveResult = await query(driveQuery, [driveId, roundNumber]);
    const { company_name, round_name, num_of_rounds } = driveResult.rows[0] || {};

    // Check if student failed any round
    const failCheckQuery = `
        SELECT COUNT(*) AS failed_rounds 
        FROM round_result 
        WHERE drive_id = $1 AND ktu_id = $2 AND status = 'Not Cleared'
    `;
    const failResult = await query(failCheckQuery, [driveId, ktuId]);
    const failedRounds = parseInt(failResult.rows[0].failed_rounds, 10);

    let finalStatus = null;
    if (failedRounds > 0) {
        finalStatus = "Not Selected"; // If failed any round, mark as "Not Selected"
    } else if (roundNumber === num_of_rounds && status === "Cleared") {
        finalStatus = "Selected"; // If cleared last round, mark as "Selected"
    }

    if (finalStatus) {
        await this.insertDriveResult(driveId, ktuId, finalStatus);
    }

    // Fetch student's email
    const studentQuery = `SELECT rit_email FROM student WHERE ktu_id = $1`;
    const studentResult = await query(studentQuery, [ktuId]);
    const ritEmail = studentResult.rows[0]?.rit_email;
    console.log(ritEmail);
    if (!ritEmail) {
        console.error(`No email found for KTU ID: ${ktuId}`);
        return;
    }

    // Email Details
    const resultStatus = status === "Cleared" ? "Passed" : "Not Cleared";
    const loginLink = "http://localhost:3000/portal/login";
    const currentDate = new Date().toLocaleDateString("en-GB");

    const message = `
        <p>Dear Student,</p>
        <p>Your result for <strong>${round_name}</strong> at <strong>${company_name}</strong> has been updated.</p>
        <p><strong>Status:</strong> ${resultStatus}</p>
        <p><strong>Update Date:</strong> ${currentDate}</p>
        <p>Please check the placement portal for further details:</p>
        <p><a href="${loginLink}" target="_blank" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Result</a></p>
        <p>Best Regards,<br>Placement Cell</p>
    `;

    // Send Email
    await sendEmailNotification(ritEmail, `Placement Round Result Update - ${company_name}`, message, true);
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
