export type StockLevels = {
    [sku: string]: number;
};

export interface Command {
    command: string;
    args: string[];
}

export type SKU = string;
export type Amount = number;

export type OrderItem = {
    sku: SKU;
    amount: Amount;
};

export type StockItem = OrderItem
