import express from 'express';
import path from 'path';
import cors from 'cors'
import  {ConnectDB}  from './src/database';
const app = express();

import userRouter from './src/routes/Users';
import adminRouter from './src/routes/Admin';

app.use(cors());

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