import 'dotenv/config'; // or require('dotenv').config() if using CommonJS
import userRoutes from './routes/user.js' ;

import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);


app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port', process.env.PORT || 5000);
});