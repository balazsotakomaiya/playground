import { StockLevels } from "../types";
import processSetStock from "../commands/processSetStock";

describe('processSetStock', () => {
    let initialStockLevels: StockLevels;

    beforeEach(() => {
        initialStockLevels = {
            'AB-123': 100,
            'CD-456': 200,
        };
    });

    it('correctly sets stock for existing SKUs', () => {
        const newStockLevels = processSetStock([{ sku: 'AB-123', amount: 150 }, { sku: 'CD-456', amount: 250 }], initialStockLevels);
        expect(newStockLevels).toEqual({
            'AB-123': 150,
            'CD-456': 250,
        });
    });

    it('adds new SKUs with specified stock levels', () => {
        const newStockLevels = processSetStock([{ sku: 'EF-789', amount: 300 }], initialStockLevels);
        expect(newStockLevels).toEqual({
            'AB-123': 100,
            'CD-456': 200,
            'EF-789': 300,
        });
    });

    it('handles setting negative stock values', () => {
        const newStockLevels = processSetStock([{ sku: 'AB-123', amount: -50 }], initialStockLevels);
        expect(newStockLevels['AB-123']).toBe(100);
    });

    it('processes multiple items in a single instruction, including new SKUs', () => {
        const newStockLevels = processSetStock([{ sku: 'AB-123', amount: 50 }, { sku: 'CD-456', amount: 150 }, { sku: 'GH-012', amount: 400 }], initialStockLevels);
        expect(newStockLevels).toEqual({
            'AB-123': 50,
            'CD-456': 150,
            'GH-012': 400,
        });
    });
});
