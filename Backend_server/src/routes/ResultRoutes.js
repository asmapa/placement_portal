import express from "express";
import ResultController from "../controller/ResultController.js";

const router = express.Router();

router.get("/company-id/:companyName", ResultController.getCompanyId);
router.get("/drive-id/:companyName/:jobRole/:year", ResultController.getDriveId);
/*http://localhost:3000/portal/drive-id/Google/Data Analyst/2025
{
    "driveId": 16
}
*/
router.post("/round-result", ResultController.insertRoundResult);
router.post("/drive-result", ResultController.insertDriveResult);
router.get("/round-results/:driveId/:roundNumber", ResultController.getRoundResults);
router.get("/drive-results/:driveId", ResultController.getDriveResults);
router.delete("/round-result/:driveId/:roundNumber/:ktuId", ResultController.deleteRoundResult);
router.delete("/drive-result/:driveId/:ktuId", ResultController.deleteDriveResult);
router.get("/check-eligibility/:driveId/:roundNumber/:ktuId", ResultController.checkEligibility);

export default router;
