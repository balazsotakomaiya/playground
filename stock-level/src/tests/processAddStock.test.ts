import { StockLevels } from "../types";
import processAddStock from "../commands/processAddStock";

describe('processAddStock', () => {
    let stockLevels: StockLevels;

    beforeEach(() => {
        stockLevels = {
            'AB-123': 100,
            'CD-456': 200,
        };
    });

    it('correctly adds stock for a valid SKU and amount', () => {
        const newStockLevels = processAddStock([{ sku: 'AB-123', amount: 50 }], stockLevels);
        expect(newStockLevels['AB-123']).toBe(150);
    });

    it('ignores non-existent SKUs', () => {
        const newStockLevels = processAddStock([{ sku: 'non-existent-sku', amount: 50 }], stockLevels);
        expect(newStockLevels).toEqual(stockLevels);
    });

    it('adds negative stock values if provided', () => {
        const newStockLevels = processAddStock([{ sku: 'AB-123', amount: -50 }], stockLevels);
        expect(newStockLevels['AB-123']).toBe(50); // Assuming you allow negative values for restocking
    });

    it('processes multiple valid items in a single instruction', () => {
        const newStockLevels = processAddStock([{ sku: 'AB-123', amount: 30 }, { sku: 'CD-456', amount: 70 }], stockLevels);
        expect(newStockLevels['AB-123']).toBe(130);
        expect(newStockLevels['CD-456']).toBe(270);
    });
});
