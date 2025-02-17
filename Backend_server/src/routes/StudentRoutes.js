import express from "express"

import * as StudentController from "../controller/StudentController.js"

const router = express.Router();

router.post("/add-student", StudentController.addStudent);
router.get("/eligible-drives/:ktu_id", StudentController.getEligibleDrives);

export default router;

//http://localhost:3000/portal/add-student
//http://localhost:3000/portal/eligible-drives/KTE24CS025