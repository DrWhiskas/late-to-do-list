import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';

const app = express();
const port = 3001;

app.use(express.json());


const mongoOptions: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect('mongodb://localhost:27017/auth', mongoOptions).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});