import { query } from "../db.js";

export const addPlacementRound = async (round) => {
  const round_query = `
    INSERT INTO placement_round (drive_id, round_number, round_name, round_date, duration, location, mode)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
  `;
  const values = [
    round.drive_id,
    round.round_number,
    round.round_name,
    round.round_date,
    round.duration,
    round.location,
    round.mode,
  ];
  const result = await query(round_query, values);
  return result.rows[0];
};

export const getPlacementRounds = async () => {
  const result = await query("SELECT * FROM placement_round ORDER BY drive_id,round_date ASC");
  return result.rows;
};

export const getDriveRounds = async (drive_id) => {
  const round_query = `SELECT * FROM placement_round WHERE drive_id = $1`;
  const result = await query(round_query,[drive_id]);
  return result.rows;
};

export const getPlacementRoundById = async (drive_id, round_number) => {
  const round_query = `SELECT * FROM placement_round WHERE drive_id = $1 AND round_number = $2`;
  const result = await query(round_query, [drive_id, round_number]);
  return result.rows[0];
};

export const updatePlacementRound = async (drive_id, round_number, round) => {
  const round_query = `
    UPDATE placement_round 
    SET round_name = $1, round_date = $2, duration = $3, location = $4, mode = $5
    WHERE drive_id = $6 AND round_number = $7 RETURNING *;
  `;
  const values = [
    round.round_name,
    round.round_date,
    round.duration,
    round.location,
    round.mode,
    drive_id,
    round_number,
  ];
  const result = await query(round_query, values);
  return result.rows[0];
};

export const deletePlacementRound = async (drive_id, round_number) => {
  const round_query = `DELETE FROM placement_round WHERE drive_id = $1 AND round_number = $2 RETURNING *;`;
  const result = await query(round_query, [drive_id, round_number]);
  return result.rowCount;
};
