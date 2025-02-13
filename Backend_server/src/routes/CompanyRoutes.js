import express from "express"

import * as CompanyController from "../controller/CompanyController.js"

const router = express.Router();

router.post("/add-company", CompanyController.addCompany);

export default router;

//http://localhost:3000/portal/add-company