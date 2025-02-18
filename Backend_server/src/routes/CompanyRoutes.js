import express from "express"

import * as CompanyController from "../controller/CompanyController.js"

const router = express.Router();

router.post("/add-company", CompanyController.addCompany);
router.put("/update-company", CompanyController.updateCompany);
router.get("/get-company", CompanyController.getAllCompanies);
router.delete("/delete-company/:company_id", CompanyController.deleteCompany);


export default router;

//http://localhost:3000/portal/add-company
////http://localhost:3000/portal/update-company
//http://localhost:3000/portal/delete-company/12