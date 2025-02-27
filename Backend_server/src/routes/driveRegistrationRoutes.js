import express from "express"

import * as DriveRegistrationController from "../controller/driveRegistrationController.js"

const router = express.Router();

// POST request to register a student for a drive
router.post("/student-drive-register", DriveRegistrationController.handleDriveRegistration);
router.get('/drive/:driveId/students', DriveRegistrationController.fetchRegisteredStudents);

export default router;
//http://localhost:3000/portal/student-drive-register
//http://localhost:3000/portal//drive/:driveId/students