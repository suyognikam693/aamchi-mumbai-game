import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from './routes/authRoutes.js';
import round from './routes/round.js';
import communityRoutes from './routes/communityRoutes.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());


app.use('/api/auth',authRoutes);
app.use('/api/round',round);
app.use('/api/community',communityRoutes);

app.get("/",(req,res) => {
    res.send("Ganpati Bappa Morya");
});


app.listen(PORT,() => {
    console.log(`Server running on ${PORT}`);
});