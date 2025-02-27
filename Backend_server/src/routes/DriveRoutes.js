import express from "express"

import * as DriveController from "../controller/DriveController.js"

const router = express.Router();

router.post("/add-drive", DriveController.addDrive);


router.put("/updateDrive", DriveController.updateDrive);

router.delete("/deleteDrive/:drive_id", DriveController.deleteDrive);

//The below Route is for student Dashborad because i need company name also in front so i jin them and get needed data

router.get("/getPlacement", DriveController.getPlacementDrives);

router.get('/getdrives', DriveController.getAllDrives);

// Route to get upcoming drives
router.get('/drives/upcoming', DriveController.getUpcomingDrivesController);

// Route to get past drives
router.get('/drives/past', DriveController.getPastDrivesController);

// Route to get ongoing drives
router.get('/drives/ongoing', DriveController.getOngoingDrivesController);

router.get('/company/:companyName/drives', DriveController.fetchDrivesByCompany);

export default router;

//http://localhost:3000/portal/deleteDrive/:drive_id
//http://localhost:3000/portal/add-drive
//http://localhost:3000/portal/drives/upcoming
//http://localhost:3000/portal/drives/past
//http://localhost:3000/portal/drives/ongoing

//http://localhost:3000/portal/getdrives
//http://localhost:3000/portal/updateDrive
