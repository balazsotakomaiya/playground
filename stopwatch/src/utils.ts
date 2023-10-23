/**
 * Sum an array of numbers.
 *
 * @param array
 */
export const sumNumbers: (array: number[]) => number = (array) =>
  array.reduce((a, b) => a + b, 0);

/**
 * Format a time in milliseconds as a string in the format "mm:ss.sss".
 *
 * @param time
 */
export const formatTime = (time: number) => {
    const date = new Date(time);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
};
