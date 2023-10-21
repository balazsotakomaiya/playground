import { Command, OrderItem, StockItem } from "./types";

export const parseLine = (line: string): Command | null => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return null;

    const [command, ...args] = trimmedLine.split(' ');
    return { command, args };
};

export const parseItems = (args: string[]): (StockItem | OrderItem)[] => {
    const items: (StockItem | OrderItem)[] = [];

    for (let i = 0; i < args.length; i += 2) {
        const sku = args[i];
        const amount = parseInt(args[i + 1]);

        if (!isNaN(amount) && amount >= 0) {
            items.push({ sku, amount });
        } else {
            console.warn(`Invalid amount for SKU: ${sku}, amount: ${args[i + 1]}. Operation skipped.`);
        }
    }

    return items;
}
