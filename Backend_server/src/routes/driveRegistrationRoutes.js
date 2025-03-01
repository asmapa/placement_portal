import express from "express"

import * as DriveRegistrationController from "../controller/driveRegistrationController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST request to register a student for a drive
router.post("/student-drive-register/:driveId",authenticateToken, DriveRegistrationController.handleDriveRegistration);
/*
add token in header
sample response:
{
    "message": "Registration successful",
    "data": {
        "drive_id": 4,
        "ktu_id": "KTE24CS010"
    }
}
*/
router.get('/Getstudents/:driveId', DriveRegistrationController.fetchRegisteredStudents);

export default router;
