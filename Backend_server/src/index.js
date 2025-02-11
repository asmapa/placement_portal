import express from "express";
import cors from "cors"
import StudentRoutes from "./routes/StudentRoutes.js"
//import StudentRoutes from "./routes/StudentRoutes.js"
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/portal', StudentRoutes);


app.listen(port, () => {
    console.log(`Its listening at port ${port}`);
});
