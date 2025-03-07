import express from "express"

import * as StudentController from "../controller/StudentController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/add-student", StudentController.addStudent);
router.get("/eligible-drives", authenticateToken,StudentController.getEligibleDrives);
/*
http://localhost:3000/portal/eligible-drives and add token in header

sample response:
{
    "on_campus": [
        {
            "drive_id": 15,
            "company_id": 6,
            "job_role": "Software Engineer",
            "num_of_rounds": 4,
            "drive_mode": "On Campus",
            "drive_type": "Dream",
            "start_date": "2025-06-14T18:30:00.000Z",
            "no_of_backlogs_permitted": 1,
            "supply_history_allowed": false,
            "min_cgpa_required": "8.00",
            "focused_branches": [
                "CSE",
                "IT"
            ],
            "description": "Hiring for software engineering roles.",
            "training_package": "6.50",
            "permanent_package": "12.50",
            "last_date_to_submit": "2025-06-09T18:30:00.000Z",
            "registration_link": "https://example.com/register1",
            "work_location": "Bangalore",
            "duration": null
        },
    ],
    "off_campus": [
        {
            "drive_id": 16,
            "company_id": 8,
            "job_role": "Data Analyst",
            "num_of_rounds": 3,
            "drive_mode": "Off Campus",
            "drive_type": "Open",
            "start_date": "2025-07-09T18:30:00.000Z",
            "no_of_backlogs_permitted": 2,
            "supply_history_allowed": true,
            "min_cgpa_required": "7.50",
            "focused_branches": [
                "CSE",
                "ECE",
                "EEE"
            ],
            "description": "Looking for skilled data analysts with SQL and Python knowledge.",
            "training_package": "5.00",
            "permanent_package": "9.80",
            "last_date_to_submit": "2025-07-04T18:30:00.000Z",
            "registration_link": "https://example.com/register2",
            "work_location": "Hyderabad",
            "duration": null
        },
        
    ]
}
*/
router.get("/get-all-registered-students", StudentController.getRegisteredStudents);
router.get("/get-all-students", StudentController.getAllStudents);
router.get("/get-students-by-year/:year", StudentController.getStudentsByYear);
router.get("/get-students-by-department/:dept", StudentController.getStudentsByDepartment);
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
router.get("/placement-stats/:year", StudentController.fetchPlacementStatsByGraduationYear);
//http://localhost:3000/portal/placement-stats/:year
/*{
    "placed_count": "2",
    "ongoing_rounds": "0",
    "upcoming_deadlines": "7",
    "registered_students": "3",
    "placement_success_rate": "66.67"
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
router.get("/placed-students/count-by-year", StudentController.getPlacedStudentCountByLast10YearController);
/*{
  "placement_data": {
    "2015": 45,
    "2016": 50,
    "2017": 60,
    "2018": 55,
    "2019": 70,
    "2020": 65,
    "2021": 80,
    "2022": 75,
    "2023": 90,
    "2024": 85
  }
}
*/

export default router;

//http://localhost:3000/portal/add-student
//http://localhost:3000/portal/eligible-drives/KTE24CS025
//http://localhost:3000/portal//get-all-students
//http://localhost:3000/portal/get-students-by-year/2025
//http://localhost:3000/portal/get-students/placed
//http://localhost:3000/portal/get-students/registered
//http://localhost:3000/portal/placed-count/2025
//http://localhost:3000/portal/department-wise-stats/2025