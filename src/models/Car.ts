import mongoose, { Document, Model } from 'mongoose';

interface CarAttributes {
  modelName: string;
  brand: string;
  quantity: number;
  price: number;
}

export interface CarDocument extends Document, CarAttributes {}

export interface CarModel extends Model<CarDocument> {}

const carSchema = new mongoose.Schema<CarDocument, CarModel>(
  {
    modelName: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: {type: Number, required: true}
  },
  {
    timestamps: true, // Add timestamps to the schema (createdAt and updatedAt)
  }
);

const Car = mongoose.model<CarDocument, CarModel>('Car', carSchema);

export default Car;
