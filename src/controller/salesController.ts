import { Request, Response, NextFunction } from "express";
import {
  createSale,
  updateSale,
  deleteSale,
  fetchSales,
} from "../services/saleService";

async function createSaleController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { customerId, customerName, date, items, ledgerNotes, total } =
      req.body;

    const newSale = await createSale(
      customerId,
      customerName,
      date,
      items,
      ledgerNotes,
      total
    );

    return res.status(201).json({
      message: "Sale created successfully",
      sale: newSale,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Insufficient quantity")
    ) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
}

// Update an existing sale
async function updateSaleController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { _id } = req.params;
    const updatedSale = await updateSale(_id, req.body);

    if (!updatedSale) {
      return res.status(404).json("Sale not found");
    }

    return res.status(200).json("Sale updated successfully");
  } catch (error) {
    next(error);
  }
}

// Delete a sale
async function deleteSaleController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { _id } = req.params;
    const deletedSale = await deleteSale(_id);

    if (!deletedSale) {
      return res.status(404).json("Sale not found");
    }

    return res.status(200).json("Sale deleted successfully");
  } catch (error) {
    next(error);
  }
}

// Fetch all sales
async function fetchSalesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sales = await fetchSales();

    if (sales.length === 0) {
      return res.status(204).json("No sales found");
    }

    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
}

export {
  createSaleController,
  updateSaleController,
  deleteSaleController,
  fetchSalesController,
};
