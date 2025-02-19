import express from "express"

import * as CompanyController from "../controller/CompanyController.js"

const router = express.Router();

router.post("/add-company", CompanyController.addCompany);
router.get("/get-all-companies", CompanyController.getCompanies);
/*sample api response:(count also included)
{
    "count": 2,
    "companies": [
        {
            "company_id": 6,
            "company_name": "Tech Innovators Pvt Ltd",
            "contact_person_name": "John Doe",
            "phone_number": "9876543210",
            "official_mail": "contact@techinnovators.com",
            "address": "123, Silicon Valley, California, USA",
            "website_link": "https://www.techinnovators.com"
        },
        {
            "company_id": 8,
            "company_name": "Google",
            "contact_person_name": "Sundar Pichai",
            "phone_number": "6502530000",
            "official_mail": "careers@google.com",
            "address": "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
            "website_link": "https://careers.google.com"
        }
    ]
}*/
router.post("/update-company", CompanyController.updateCompany);
router.put("/update-company", CompanyController.updateCompany);
router.get("/get-company", CompanyController.getAllCompanies);
router.delete("/delete-company/:company_id", CompanyController.deleteCompany);


export default router;

//http://localhost:3000/portal/add-company
//http://localhost:3000/portal/delete-company/12
//http://localhost:3000/portal/get-all-companies
////http://localhost:3000/portal/update-company
//http://localhost:3000/portal/delete-company/12
