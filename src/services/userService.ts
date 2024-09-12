// userServices.ts

import InventoryItem from "../model/inventory";
import {
  IInventoryItem,
  IAddInventory,
  ICheckExist,
  IFetchItems,
  IUpdateItem,
  IDeleteItem,
} from "../interface/Iservices/Iservices";

export const addInventory: IAddInventory = async (
  name,
  description,
  quantity,
  price
) => {
  const inventory = {
    name,
    description,
    quantity,
    price,
  };
  const item = new InventoryItem(inventory);
  const savedItem = await item.save();
  return savedItem;
};

export const checkExist: ICheckExist = async (name) => {
  try {
    const existingItem = await InventoryItem.findOne({ name: name });

    return !!existingItem;
  } catch (error) {
    console.error("Error checking inventory item existence:", error);
    throw error;
  }
};

export const fetchItems: IFetchItems = async (
  search = "",
  page = 1,
  limit = 10
) => {
  const searchFilter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const skip = (page - 1) * limit;

  try {
    const items = await InventoryItem.find(searchFilter)
      .skip(skip)
      .limit(limit);

    const totalItems = await InventoryItem.countDocuments(searchFilter);

    return {
      items,
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
    };
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Failed to fetch items");
  }
};

export const updateItem: IUpdateItem = async (
  _id,
  name,
  description,
  quantity,
  price
) => {
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      _id,
      { name, description, quantity, price },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      throw new Error("Item not found");
    }

    console.log(updatedItem);
    return updatedItem;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteItem: IDeleteItem = async (_id) => {
  try {
    const deletedItem = await InventoryItem.findByIdAndDelete(_id);
    return deletedItem;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
