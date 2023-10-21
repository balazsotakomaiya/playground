import { StockItem, StockLevels } from "../types";

const processAddStock = (items: StockItem[], stockLevels: StockLevels): StockLevels => {
    const newStockLevels = { ...stockLevels };
    items.forEach(({ sku, amount }) => {
        if (newStockLevels[sku] !== undefined) {
            newStockLevels[sku] += amount;
        } else {
            console.warn(`Invalid SKU: ${sku}. Operation skipped.`);
        }
    });
    return newStockLevels;
};

export default processAddStock;
