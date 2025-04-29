import express from 'express';
const app = express();
import cors from 'cors';
import connectDB from './config/database.js';
import multer from 'multer';
import morgan from 'morgan';
connectDB();

// “For every incoming request to the app, use Morgan to log the request details in a concise format.”
app.use(morgan('tinny'));

const upload = multer({ dest: 'uploads/' });
app.get('/', (req, res) => {
  res.send('welcome to E-store APIs');
});
const PORT = process.env.PORT || 3000;
// app.use('/', routes)
app.listen(PORT, () => {
  console.log(`server is running and listening on ${PORT}`);
});
