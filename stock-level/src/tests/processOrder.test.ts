import 'jest';
import { OrderItem, StockLevels } from "../types";
import processOrder from "../commands/processOrder";
describe('processOrder', () => {
    let stockLevels: StockLevels;
    let consoleWarnSpy: jest.SpyInstance;

    beforeEach(() => {
        stockLevels = {
            'AB-123': 50,
            'CD-456': 75
        };
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
        consoleWarnSpy.mockRestore();
    });

    it('correctly processes a valid order', () => {
        const orderItems: OrderItem[] = [{ sku: 'AB-123', amount: 5 }];
        const newStockLevels = processOrder(orderItems, stockLevels);
        expect(newStockLevels['AB-123']).toBe(45);
    });

    it('ignores non-existent SKUs', () => {
        const orderItems: OrderItem[] = [{ sku: 'invalid-sku', amount: 10 }];
        const newStockLevels = processOrder(orderItems, stockLevels);
        expect(newStockLevels).toEqual(stockLevels);
        expect(consoleWarnSpy).toHaveBeenCalledWith('Invalid SKU: invalid-sku. Operation skipped.');
    });

    it('processes multiple valid items in a single order', () => {
        const orderItems: OrderItem[] = [
            { sku: 'AB-123', amount: 5 },
            { sku: 'CD-456', amount: 10 }
        ];
        const newStockLevels = processOrder(orderItems, stockLevels);
        expect(newStockLevels['AB-123']).toBe(45);
        expect(newStockLevels['CD-456']).toBe(65);
    });
});
