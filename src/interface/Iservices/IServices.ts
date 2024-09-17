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
    address: string,
    quantity: number,
    price: number
  ): Promise<IInventoryItem>;
}

export interface ICheckExist {
  (name: string, id?: string): Promise<boolean>;
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

export interface ICustomer extends Document {
  name: string;
  address: string;
  mobileNumber: string;
}

export interface IAddCustomer {
  (name: string, address: string, mobileNumber: string): Promise<ICustomer>;
}

export interface IUpdateCustomer {
  (
    _id: string,
    name: string,
    address: string,
    mobileNumber: string
  ): Promise<ICustomer>;
}

export interface IDeleteCustomer {
  (_id: string): Promise<ICustomer | null>;
}

export interface IFetchCustomerResult {
  customers: ICustomer[];
  totalCustomers: number;
  currentPage: number;
  totalPages: number;
}

export interface IFetchCustomer {
  (
    search?: string,
    page?: number,
    limit?: number
  ): Promise<IFetchCustomerResult>;
}

export interface ICheckCustomerExist {
  (name: string, id?: string): Promise<boolean>;
}
