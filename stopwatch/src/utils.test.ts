import { sumNumbers, formatTime } from './utils';

describe('utils', () => {
    describe('sumNumbers', () => {
        it('correctly sums an array of numbers', () => {
            expect(sumNumbers([1, 2, 3])).toBe(6);
            expect(sumNumbers([-1, 1])).toBe(0);
        });

        it('returns 0 for an empty array', () => {
            expect(sumNumbers([])).toBe(0);
        });
    });

    describe('formatTime', () => {
        it('formats time correctly', () => {
            // 1 minute, 30 seconds, and 500 milliseconds
            // Note: Time is in milliseconds
            const time = (1 * 60 * 1000) + (30 * 1000) + 500;
            expect(formatTime(time)).toBe("01:30.50");
        });

        it('formats time correctly when minutes and seconds are less than 10', () => {
            // 5 minutes, 5 seconds, and 50 milliseconds
            const time = (5 * 60 * 1000) + (5 * 1000) + 50;
            expect(formatTime(time)).toBe("05:05.05");
        });

        it('handles 0 milliseconds correctly', () => {
            expect(formatTime(0)).toBe("00:00.00");
        });
    });
});
