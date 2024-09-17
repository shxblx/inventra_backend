import { NextFunction, Request, Response } from "express";
import {
  addCustomer,
  checkCustomerExist,
  editCustomer,
  fetchCustomers,
  removeCustomer,
} from "../services/customerService";

export async function createCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, address, mobileNumber } = req.body;
    const exist = await checkCustomerExist(name);
    if (exist) {
      return res.status(409).json("customer already exist");
    }
    const item = await addCustomer(name, address, mobileNumber);
    if (item) {
      return res.status(200).json("Customer added successfully");
    }
    return res.status(400).json("Something went wrong");
  } catch (error) {
    next(error);
  }
}

export async function getCustomers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = req.params.page as unknown as number;

    const searchTerm = req.query.search as string;
    const item = await fetchCustomers(searchTerm, page);
    if (item) {
      return res.status(200).json(item);
    } else {
      return res.status(204).json("No Items Found");
    }
  } catch (error) {
    next(error);
  }
}

export async function updateCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, address, mobileNumber } = req.body.updatedCustomer;
    const { _id } = req.body;

    const exist = await checkCustomerExist(name, _id);

    if (exist) {
      return res.status(409).json("Customer already exists");
    }

    const updatedCustomer = await editCustomer(
      _id,
      name,
      address,
      mobileNumber
    );

    if (updatedCustomer) {
      return res.status(200).json("Customer updated successfully");
    }
    return res.status(400).json("Something went wrong");
  } catch (error) {
    next(error);
  }
}

export async function deleteCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.body;
    const deletedCustomer = await removeCustomer(id);
    if (deletedCustomer) {
      return res.status(200).json("Customer deleted successfully");
    }
    return res.status(400).json("Something went wrong");
  } catch (error) {
    next(error);
  }
}
