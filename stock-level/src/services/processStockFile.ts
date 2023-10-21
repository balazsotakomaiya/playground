import fs from "fs";
import processCommand from "./processCommand";
import { StockLevels } from "../types";
import { parseLine } from "../utils";

const processStockFile = (filename: string): void => {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file: ', err);
            return;
        }

        // Parse file into lines
        const lines = data.split('\n');
        let stockLevels: StockLevels = {};

        // Process each line
        lines.forEach((line) => {
            const command = parseLine(line);
            if (command) {
                stockLevels = processCommand(command, stockLevels);
            }
        });

        // Sort and print stock levels
        const sortedStock = Object.keys(stockLevels).sort();
        sortedStock.forEach(skuId => console.log(`${skuId} ${stockLevels[skuId]}`));
    });
};

export default processStockFile;
