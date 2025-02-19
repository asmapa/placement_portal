import express from "express";
import cors from "cors"
import StudentRoutes from "./routes/StudentRoutes.js"
import DriveRoutes from "./routes/DriveRoutes.js"
import CompanyRoutes from "./routes/CompanyRoutes.js"
import driveRegistrationRoutes from "./routes/driveRegistrationRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import regRoutes from "./routes/registrationRoutes.js"
import roundsRoutes from "./routes/RoundsRoutes.js"

//import StudentRoutes from "./routes/StudentRoutes.js"
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/portal', StudentRoutes);
app.use('/portal', DriveRoutes);
app.use('/portal', CompanyRoutes);
app.use('/portal', driveRegistrationRoutes);
app.use('/portal', authRoutes);
app.use('/portal', regRoutes);
app.use('/portal', roundsRoutes);


app.listen(port, () => {
    console.log(`Its listening at port ${port}`);
});
