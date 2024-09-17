// customerService.ts

import Customer from "../model/cusomters"; // Import the Customer model
import {
  IAddCustomer,
  IUpdateCustomer,
  IDeleteCustomer,
  IFetchCustomer,
  ICheckCustomerExist,
} from "../interface/Iservices/IServices";

export const addCustomer: IAddCustomer = async (
  name,
  address,
  mobileNumber
) => {
  const customer = new Customer({ name, address, mobileNumber });
  const savedCustomer = await customer.save();
  return savedCustomer;
};

export const checkCustomerExist: ICheckCustomerExist = async (
  name: string,
  id?: string
) => {
  try {
    const query: any = { name: new RegExp(`^${name}$`, "i") };
    if (id) {
      query._id = { $ne: id };
    }

    const existingCustomer = await Customer.findOne(query);
    return !!existingCustomer;
  } catch (error) {
    console.error("Error checking customer existence:", error);
    throw error;
  }
};

export const editCustomer: IUpdateCustomer = async (
  _id,
  name,
  address,
  mobileNumber
) => {
  try {
    console.log(name);

    const updatedCustomer = await Customer.findByIdAndUpdate(
      _id,
      { name, address, mobileNumber },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      throw new Error("Customer not found");
    }

    return updatedCustomer;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

export const removeCustomer: IDeleteCustomer = async (_id) => {
  try {
    console.log(_id);

    const deletedCustomer = await Customer.findByIdAndDelete(_id);
    return deletedCustomer;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};

export const fetchCustomers: IFetchCustomer = async (
  search = "",
  page = 1,
  limit = 10
) => {
  const searchFilter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const skip = (page - 1) * limit;

  try {
    const customers = await Customer.find(searchFilter).skip(skip).limit(limit);

    const totalCustomers = await Customer.countDocuments(searchFilter);

    return {
      customers,
      totalCustomers,
      currentPage: page,
      totalPages: Math.ceil(totalCustomers / limit),
    };
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to fetch customers");
  }
};
