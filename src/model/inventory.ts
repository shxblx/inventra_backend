import mongoose from "mongoose";

// Define the inventory item schema
const inventoryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    required: true,
  },
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

export default InventoryItem;
