import mongoose, { Schema, Document } from "mongoose";


interface ISaleItem {
  inventoryItemId: string;
  name: string;
  price: number;
  quantity: number;
  unit: "kg" | "litre" | "nos";
}

interface ISale extends Document {
  customerId: string;
  customerName: string;
  date: Date;
  items: ISaleItem[];
  total: number;
  ledgerNotes?: string;
}
const saleItemSchema = new Schema<ISaleItem>({
  inventoryItemId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, enum: ["kg", "litre", "nos"], required: true },
});

const saleSchema = new Schema<ISale>({
  customerId: { type: String, required: true },
  customerName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  items: [saleItemSchema],
  total: { type: Number, required: true },
  ledgerNotes: { type: String },
});

const Sale = mongoose.model<ISale>("Sale", saleSchema);
export { Sale, ISale, ISaleItem };
