import { parseItems } from "../utils";

describe('parseItems', () => {
    it('correctly parses valid items', () => {
        const input = ['AB-123', '5', 'CD-456', '10'];
        const expectedResult = [
            { sku: 'AB-123', amount: 5 },
            { sku: 'CD-456', amount: 10 }
        ];
        expect(parseItems(input)).toEqual(expectedResult);
    });

    it('skips items with invalid amount', () => {
        const input = ['AB-123', 'invalid-amount', 'CD-456', '10'];
        const expectedResult = [
            { sku: 'CD-456', amount: 10 }
        ];
        expect(parseItems(input)).toEqual(expectedResult);
    });

    it('skips items with negative amount', () => {
        const input = ['AB-123', '-5', 'CD-456', '10'];
        const expectedResult = [
            { sku: 'CD-456', amount: 10 }
        ];
        expect(parseItems(input)).toEqual(expectedResult);
    });

    it('returns an empty array for an empty input', () => {
        const input: string[] = [];
        const expectedResult: { sku: string; amount: number }[] = [];
        expect(parseItems(input)).toEqual(expectedResult);
    });

    it('handles input with uneven pairs', () => {
        const input = ['AB-123', '5', 'CD-456']; // CD-456 has no corresponding amount
        const expectedResult = [
            { sku: 'AB-123', amount: 5 }
            // CD-456 is skipped
        ];
        expect(parseItems(input)).toEqual(expectedResult);
    });
});
