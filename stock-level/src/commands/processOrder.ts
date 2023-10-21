import { OrderItem, StockLevels } from "../types";

export const processOrder = (items: OrderItem[], stockLevels: StockLevels): StockLevels => {
    const newStockLevels = { ...stockLevels };

    items.forEach(({ sku, amount }) => {
        if (!newStockLevels.hasOwnProperty(sku)) {
            console.warn(`Invalid SKU: ${sku}. Operation skipped.`);
            return;
        }

        if (newStockLevels[sku] < amount) {
            console.warn(`Insufficient stock for SKU: ${sku}. Operation skipped.`);
            return;
        }

        newStockLevels[sku] -= amount;
    });

    return newStockLevels;
};

export default processOrder;
