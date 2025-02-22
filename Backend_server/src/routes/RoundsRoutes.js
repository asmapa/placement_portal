import express from "express";
import * as roundsController from "../controller/RoundsController.js";

const router = express.Router();

router.post("/create-round", roundsController.createPlacementRound);
router.get("/get-all-rounds", roundsController.getAllPlacementRounds);
router.get("/get-drive-rounds/:drive_id", roundsController.getDriveRounds);
router.get("/get-a-round/:drive_id/:round_number", roundsController.getPlacementRound);
router.put("/update-round/:drive_id/:round_number", roundsController.updatePlacementRound);
router.delete("/delete-round/:drive_id/:round_number", roundsController.deletePlacementRound);

export default router;
//http://localhost:3000/portal/create-round
//http://localhost:3000/portal/get-all-rounds