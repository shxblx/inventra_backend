// userServices.ts

import InventoryItem from "../model/inventory";
import {
  IAddInventory,
  ICheckExist,
  IFetchItems,
  IUpdateItem,
  IDeleteItem,
} from "../interface/Iservices/IServices";

export const addInventory: IAddInventory = async (
  name,
  description,
  quantity,
  price,
  unit
) => {
  const inventory = {
    name,
    description,
    quantity,
    price,
    unit,
  };
  const item = new InventoryItem(inventory);
  console.log(item);

  const savedItem = await item.save();
  return savedItem;
};

export const checkExist: ICheckExist = async (name: string, id?: string) => {
  try {
    const query: any = { name: new RegExp(`^${name}$`, "i") };
    if (id) {
      query._id = { $ne: id };
    }

    const existingItem = await InventoryItem.findOne(query);
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
  price,
  unit
) => {
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      _id,
      { name, description, quantity, price, unit },
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
