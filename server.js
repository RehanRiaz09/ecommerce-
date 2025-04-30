import express from 'express';
const app = express();
import cors from 'cors';
import routes from './routes/routes.js';
import connectDB from './config/database.js';
import multer from 'multer';
// import morgan from 'morgan';
import cloudinary from 'cloudinary';
connectDB();

// “For every incoming request to the app, use Morgan to log the request details in a concise format.”
// app.use(morgan('tinny'));
cloudinary.config({
  cloud_name: 'dopjntwst',
  api_key: '562983899357314',
  api_secret: 'w4BttPF_0dzJU6cF5z_xcJEIhsA',
});

const upload = multer({ dest: 'uploads/' });
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ urlencoded: true }));
app.use('/', routes);
app.get('/', (req, res) => {
  res.send('welcome to E-store APIs');
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running and listening on ${PORT}`);
});
