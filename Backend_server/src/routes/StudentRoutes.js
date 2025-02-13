import express from "express"

import * as StudentController from "../controller/StudentController.js"

const router = express.Router();

router.post("/add-student", StudentController.addStudent);

export default router;

//http://localhost:3000/portal/add-student