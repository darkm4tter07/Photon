import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.route.js';
import messageRoutes from './src/routes/message.route.js';
import {connectDB} from './src/lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {app, server} from './src/lib/socket.js';

dotenv.config();

const port = 3000 || process.env.PORT;


app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' })); 
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    connectDB();
});
