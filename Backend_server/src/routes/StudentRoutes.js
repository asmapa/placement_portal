import express from "express"

import * as StudentController from "../controller/StudentController.js"

const router = express.Router();

router.post("/add-student", StudentController.addStudent);
router.get("/eligible-drives/:ktu_id", StudentController.getEligibleDrives);
router.get("/get-all-students", StudentController.getStudents);
router.get("/get-students-by-year/:year", StudentController.getStudentsByYear);
router.get("/get-students/placed", StudentController.getPlaced);
/*api response:[
    {
        "ktu_id": "KTE24CS025",
        "student_name": "Ananya Menon",
        "department": "CSE",
        "rit_email": "24cs22025@rit.ac.in",
        "phone_number": "9876541234",
        "program": "B Tech",
        "semester": 4,
        "date_of_birth": "2002-09-19T18:30:00.000Z",
        "year_of_graduation": 2026,
        "gender": "female",
        "cgpa": "8.40",
        "no_of_backlogs": 1,
        "supply_history": true,
        "skills": null,
        "resume_url": null,
        "password": null,
        "drive_id": 15,
        "company_name": "Tech Innovators Pvt Ltd",
        "job_role": "Software Engineer",
        "permanent_package": "12.50"
    }
]*/
router.get("/get-students/registered", StudentController.getRegistered);
/*api response:
{
    "count": 1,
    "students": [
        {
            "ktu_id": "KTE24CS025",
            "student_name": "Ananya Menon",
            "department": "CSE",
            "rit_email": "24cs22025@rit.ac.in",
            "phone_number": "9876541234",
            "program": "B Tech",
            "semester": 4,
            "date_of_birth": "2002-09-19T18:30:00.000Z",
            "year_of_graduation": 2026,
            "gender": "female",
            "cgpa": "8.40",
            "no_of_backlogs": 1,
            "supply_history": true,
            "skills": null,
            "resume_url": null,
            "password": null
        }
    ]
}*/
router.get("/placed-count/:year", StudentController.fetchPlacedCountByGraduationYear);
/*{
    "placed_count": "0"
}*/
router.get("/department-wise-stats/:year", StudentController.fetchDepartmentWiseStats);
/*[
    {
        "department": "CSE",
        "placed_count": "1"
    },
    {
        "department": "EC",
        "placed_count": "1"
    }
]*/


export default router;

//http://localhost:3000/portal/add-student
//http://localhost:3000/portal/eligible-drives/KTE24CS025
//http://localhost:3000/portal//get-all-students
//http://localhost:3000/portal/get-students-by-year/2025
//http://localhost:3000/portal/get-students/placed
//http://localhost:3000/portal/get-students/registered
//http://localhost:3000/portal/placed-count/2025
//http://localhost:3000/portal/department-wise-stats/2025