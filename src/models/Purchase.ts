import mongoose, { Document, Model, Schema } from 'mongoose';

interface PurchaseAttributes {
  user: mongoose.Types.ObjectId;
  car: mongoose.Types.ObjectId;
  quantity: number;
  purchaseDate?: Date;
}

export interface PurchaseDocument extends Document, PurchaseAttributes {}

export interface PurchaseModel extends Model<PurchaseDocument> {}

const purchaseSchema = new Schema<PurchaseDocument, PurchaseModel>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    quantity: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Purchase = mongoose.model<PurchaseDocument, PurchaseModel>('Purchase', purchaseSchema);

export default Purchase;
