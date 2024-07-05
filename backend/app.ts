import express from 'express';
import path from 'path';
import cors from 'cors'
import session from 'express-session'
import  {ConnectDB}  from './src/database';
import morgan from "morgan"
import userRouter from './src/routes/Users';
import adminRouter from './src/routes/Admin';
import dotenv from 'dotenv';
dotenv.config()

const app = express();

app.use(morgan("dev"))
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));


app.use(express.json());


app.use('/',userRouter);
app.use('/admin',adminRouter);


app.use(express.static(path.join(__dirname, 'public')));

ConnectDB();

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;