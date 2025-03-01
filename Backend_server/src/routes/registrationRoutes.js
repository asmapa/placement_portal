import express from 'express';
import multer from 'multer';
import { registerStudent } from '../controller/registrationController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/students/register', upload.single('resume'), registerStudent);
/*
response object:
{
    "message": "Registration successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrdHVJZCI6IklESzIwTUUzMDMiLCJpYXQiOjE3NDA3NDk5MDEsImV4cCI6MTc0MDc1MzUwMX0.q2b7T_Hzi1mZYez5uskn5So6YYk9uz9HuxfVkxwELMo"
}
*/

// Example of a protected route
router.get('/students/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

export default router;