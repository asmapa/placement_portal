import express from "express";
import { getFilteredStudents } from "../controller/FilterController.js";

const router = express.Router();

router.get("/filter-students", getFilteredStudents);

/*http://localhost:3000/portal/filter-students?department=CSE&minCgpa=5.0&no_of_backlogs=3&placed=false&graduationYear=2026&noSupplyHistory=false
no need for all parameters*/

export default router;
