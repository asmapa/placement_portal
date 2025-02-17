import express from "express"

import * as DriveRegistrationController from "../controller/driveRegistrationController.js"

const router = express.Router();

// POST request to register a student for a drive
router.post("/student-drive-register", DriveRegistrationController.handleDriveRegistration);

export default router;
//http://localhost:3000/portal/student-drive-register