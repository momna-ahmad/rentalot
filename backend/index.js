import 'dotenv/config'; // or require('dotenv').config() if using CommonJS
import userRoutes from './routes/user.js' ;
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // ✅ allow cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/add-listings', express.json({ limit: '10mb' }));
app.use('/add-listings', express.urlencoded({ extended: true }));

app.use(userRoutes);


app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port', process.env.PORT || 5000);
});