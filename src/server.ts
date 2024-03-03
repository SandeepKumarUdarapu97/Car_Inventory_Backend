import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

const app = express();
const PORT: number = 3001;

app.use(bodyParser.json());
app.use(cors());

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

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
