// Utility function that generates a random number between min and max using Crypto API
export function generateSecureRandomNumber(min: number, max: number): number {
    const range = max - min + 1;
    const bitsNeeded = Math.ceil(Math.log2(range));
    const bytesNeeded = Math.ceil(bitsNeeded / 8);
    const maxValue = Math.pow(2, bitsNeeded);

    let randomNumber;
    do {
        const randomBytes = new Uint8Array(bytesNeeded);
        window.crypto.getRandomValues(randomBytes);
        randomNumber = 0;
        for (let i = 0; i < bytesNeeded; i++) {
            randomNumber |= randomBytes[i] << (8 * i);
        }
        // Use while loop to reject numbers that are out of range
    } while (randomNumber >= maxValue);

    return (randomNumber % range) + min;
}

// Function to generate an array of 5 unique random numbers using the utility function
export function generateUniqueSecureRandomNumbers(): number[] {
    const uniqueNumbers = new Set<number>();
    while (uniqueNumbers.size < 5) {
        uniqueNumbers.add(generateSecureRandomNumber(1, 90));
    }
    return Array.from(uniqueNumbers);
}

// Utility function to count the number of matches between two arrays
export function countMatches(userNumbers: number[], winningNumbers: number[]) {
    return userNumbers.filter(number => winningNumbers.includes(number)).length;
}
