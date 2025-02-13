import express from "express"

import * as StudentController from "../controller/StudentController.js"

const router = express.Router();

router.get('/students', StudentController.getStudent);
router.post('/students', StudentController.createStudent);

export default router;