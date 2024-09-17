// IService.ts

import { Document } from "mongoose";
import { ISale, ISaleItem } from "../../model/sales";

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
    price: number,
    unit: "kg" | "litre" | "nos"
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
    price: number,
    unit: "kg" | "litre" | "nos"
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

export type ICreateSale = (
  customerId: string,
  customerName: string,
  date: Date,
  items: ISaleItem[],
  ledgerNotes: string,
  total: number
) => Promise<ISale>;
export type IUpdateSale = (
  _id: string,
  updatedSale: Partial<ISale>
) => Promise<ISale | null>;
export type IDeleteSale = (_id: string) => Promise<ISale | null>;
export type IFetchSales = () => Promise<ISale[]>;
