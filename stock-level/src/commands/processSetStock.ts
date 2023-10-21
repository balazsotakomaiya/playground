import { StockItem, StockLevels } from "../types";

const processSetStock = (items: StockItem[], stockLevels: StockLevels): StockLevels => {
    const newStockLevels = { ...stockLevels };
    items.forEach(({ sku, amount }) => {
        if (amount >= 0) {
            newStockLevels[sku] = amount;
        } else {
            console.warn(`Invalid amount for SKU: ${sku}. Operation skipped.`);
        }
    });
    return newStockLevels;
};
export default processSetStock;
