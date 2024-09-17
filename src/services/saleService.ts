import { Sale } from "../model/sales";
import { ClientSession } from "mongoose";
import {
  ICreateSale,
  IUpdateSale,
  IDeleteSale,
  IFetchSales,
} from "../interface/Iservices/IServices";
import InventoryItem from "../model/inventory";

export const createSale: ICreateSale = async (
  customerId,
  customerName,
  date,
  items,
  ledgerNotes,
  total
) => {
  const session = await Sale.startSession();
  session.startTransaction();

  try {
    const newSale = new Sale({
      customerId,
      customerName,
      date,
      items,
      ledgerNotes,
      total,
    });

    const savedSale = await newSale.save({ session });

    for (const item of items) {
      await updateInventoryQuantity(
        item.inventoryItemId,
        -item.quantity,
        session
      );
    }

    await session.commitTransaction();
    session.endSession();

    return savedSale;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const updateInventoryQuantity = async (
  productId: string,
  quantityChange: number,
  session: ClientSession
) => {
  const updatedItem = await InventoryItem.findByIdAndUpdate(
    productId,
    { $inc: { quantity: quantityChange } },
    { new: true, session, runValidators: true }
  );

  if (!updatedItem) {
    throw new Error(`Inventory item with id ${productId} not found`);
  }

  if (updatedItem.quantity < 0) {
    throw new Error(`Insufficient quantity for product ${updatedItem.name}`);
  }

  return updatedItem;
};

export const updateSale: IUpdateSale = async (_id, updatedSale) => {
  return await Sale.findByIdAndUpdate(_id, updatedSale, { new: true });
};

export const deleteSale: IDeleteSale = async (_id) => {
  return await Sale.findByIdAndDelete(_id);
};

export const fetchSales: IFetchSales = async () => {
  return await Sale.find();
};
