import InventoryItem from "../model/inventory";

export async function addInventory(
  name: string,
  description: string,
  quantity: number,
  price: number
) {
  const inventory = {
    name,
    description,
    quantity,
    price,
  };
  const item = new InventoryItem(inventory);
  const savedItem = await item.save();
  return savedItem;
}
