// IService.ts

import { Document } from "mongoose";

export interface IInventoryItem extends Document {
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export interface IAddInventory {
  (
    name: string,
    description: string,
    quantity: number,
    price: number
  ): Promise<IInventoryItem>;
}

export interface ICheckExist {
  (name: string): Promise<boolean>;
}

export interface IFetchItemsResult {
  items: IInventoryItem[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export interface IFetchItems {
  (search?: string, page?: number, limit?: number): Promise<IFetchItemsResult>;
}

export interface IUpdateItem {
  (
    _id: string,
    name: string,
    description: string,
    quantity: number,
    price: number
  ): Promise<IInventoryItem>;
}

export interface IDeleteItem {
  (_id: string): Promise<IInventoryItem | null>;
}
