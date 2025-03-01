import express from 'express';
import { viewProfile, editProfile,fetchStudentDriveStats,getStudentRegisteredDrives,getRoundResultsForDrive,getProgressForDrive,fetchDriveStatus } from '../controller/StudDashboardController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', authenticateToken, viewProfile);
router.put('/Update-profile', authenticateToken, editProfile);
/*
{
  "phone_number": "1234543210",
  "skills": "Java, Python, React",
  "resume_url": "https://cloudinary.com/new_resume.pdf"
}
any no of attributes of student in this form.Also add header
fetch("/api/some-endpoint", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
})
*/

/*to register for a drive use the api :  http://localhost:3000/portal/student-drive-register/:driveId
in file driveRegistrationRoutes.js*/

router.get('/registered-drives', authenticateToken, getStudentRegisteredDrives);
/*
just add the token in the header
response object:
[
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
        "duration": null,
        "company_name": "Tech Innovators Pvt Ltd"
    },
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
        "duration": null,
        "company_name": "Google"
    }
]
*/

//To view the rounds of a particular drive: http://localhost:3000/portal/get-drive-rounds/:drive_id in ROundsRoutes.js

router.get('/drive/:driveId/round-results', authenticateToken, getRoundResultsForDrive);
/*add token in header
[
    {
        "round_number": 1,
        "round_name": "Aptitude",
        "round_date": "2024-01-14T18:30:00.000Z",
        "duration": {
            "hours": 1
        },
        "location": "Online",
        "mode": "Online",
        "status": "Cleared"
    },
    {
        "round_number": 2,
        "round_name": "Technical",
        "round_date": "2024-01-19T18:30:00.000Z",
        "duration": {
            "hours": 2
        },
        "location": "Company Office",
        "mode": "Offline",
        "status": "Cleared"
    },
    {
        "round_number": 3,
        "round_name": "HR",
        "round_date": "2024-01-24T18:30:00.000Z",
        "duration": {
            "hours": 1,
            "minutes": 30
        },
        "location": "Company Office",
        "mode": "Offline",
        "status": "Pending"
    }
]
*/


//to fetch the drives for which a student is eligible use http://localhost:3000/portal/eligible-drives in studentRoutes.js and add token in header

router.get('/drive/:driveId/progress', authenticateToken, getProgressForDrive);
/*add token in request header
sample response object:
{
    "driveId": "1",
    "ktuId": "KTE24CS010",
    "totalRounds": 3,
    "clearedRounds": 2,
    "progressPercentage": "66.67"
}
*/

router.get('/drive/:driveId/status', authenticateToken, fetchDriveStatus);
/*add token in request header
{
    "status": 200,
    "driveStatus": "Completed",
    "result": "Selected"
}
*/

router.get('/student/drives/stats', authenticateToken, fetchStudentDriveStats);
/*add token in request header
{
    "status": 200,
    "totalRegistered": 3,
    "ongoingDrives": 1,
    "placedDrives": 2
}
*/
export default router;
