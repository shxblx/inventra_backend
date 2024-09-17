import mongoose from "mongoose";
const Schema = mongoose.Schema;

const saleItemSchema = new Schema({
  inventoryItemId: {
    type: Schema.Types.ObjectId,
    ref: "InventoryItem",
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
});

const saleSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  customerName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  items: [saleItemSchema],
  ledgerNotes: { type: String, required: false },
  total: { type: Number, required: true },
});

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;
