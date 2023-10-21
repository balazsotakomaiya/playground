import { parseLine } from "../utils";

describe('parseLine', () => {
    it('parses a well-formed command line correctly', () => {
        const line = "add-stock AB-123 100";
        const result = parseLine(line);
        expect(result).toEqual({ command: "add-stock", args: ["AB-123", "100"] });
    });

    it('correctly trims and parses command line with extra spaces', () => {
        const line = "  add-stock    AB-123    100  ";
        const result = parseLine(line);
        expect(result).toEqual({ command: "add-stock", args: ["AB-123", "100"] });
    });

    it('returns null for an empty line', () => {
        const line = "   ";
        const result = parseLine(line);
        expect(result).toBeNull();
    });

    it('parses line with command only and no arguments', () => {
        const line = "list-stock";
        const result = parseLine(line);
        expect(result).toEqual({ command: "list-stock", args: [] });
    });

    it('parses line with multiple arguments', () => {
        const line = "set-stock AB-123 100 CD-456 200 EF-789 300";
        const result = parseLine(line);
        expect(result).toEqual({
            command: "set-stock",
            args: ["AB-123", "100", "CD-456", "200", "EF-789", "300"]
        });
    });

    it('parses line with special characters in arguments', () => {
        const line = "set-stock AB-123 100$ CD-456 200#";
        const result = parseLine(line);
        expect(result).toEqual({
            command: "set-stock",
            args: ["AB-123", "100$", "CD-456", "200#"]
        });
    });
});

