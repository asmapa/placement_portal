import express from 'express';
import multer from 'multer';
import { registerStudent } from '../controller/registrationController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/students/register', upload.single('resume'), registerStudent);

// Example of a protected route
router.get('/students/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

export default router;