import { Command, StockLevels } from "../types";
import processSetStock from "../commands/processSetStock";
import processAddStock from "../commands/processAddStock";
import processOrder from "../commands/processOrder";
import { parseItems } from "../utils";

const processCommand = (command: Command, stockLevels: StockLevels): StockLevels => {
    switch (command.command) {
        case 'set-stock':
            return processSetStock(parseItems(command.args), stockLevels);
        case 'add-stock':
            return processAddStock(parseItems(command.args), stockLevels);
        case 'order':
            const orderReference = command.args[0]; // The first argument is always order reference
            const items = parseItems(command.args.slice(1));

            return processOrder(items, stockLevels);
        default:
            console.warn(`Invalid command: ${command.command}`);
            return stockLevels;
    }
};

export default processCommand;
