import express from "express"

import * as DriveController from "../controller/DriveController.js"

const router = express.Router();

router.post("/add-drive", DriveController.addDrive);

export default router;

//http://localhost:3000/portal/add-drive