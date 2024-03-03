import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT: number = 3001;

app.use(bodyParser.json());

// Connect to MongoDB Atlas
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://sandeep:Sandeep%409@carinventory.swpgm7c.mongodb.net/?retryWrites=true&w=majority&appName=CarInventory'
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

connectToMongoDB();

const defaultConfig = {
  "name": "required",
  "gender": "required",
  "age": "required",
  "profession": "required",
  "services": "required",
  "How did you find us":"required",
  "timer": 1
};


app.get('/config', (req, res) => {
  res.json(defaultConfig);
});

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
