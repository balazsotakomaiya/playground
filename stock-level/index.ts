import { argv } from 'process';
import processStockFile from "./src/services/processStockFile";

if (argv.length < 3) {
    console.error('Error: No file input provided.');
} else {
    const filename = argv[2];
    processStockFile(filename);
}
