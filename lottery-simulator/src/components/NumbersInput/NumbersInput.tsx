import React from "react";
import { LotteryNumber } from "../../types.ts";
import { generateUniqueSecureRandomNumbers } from "../../utils.ts";

interface Props {
    value: LotteryNumber[];
    onChange: (newNumbers: LotteryNumber[]) => void;
    isDisabled?: boolean;
}

const NumbersInput: React.FC<Props> = ({ value, onChange, isDisabled }) => {
    const handleInputChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value;

        // If the input is empty, update the state to reflect that
        // by setting the value at the index to null
        if (inputVal === '') {
            const newValue = [...value];
            newValue[index] = null;
            onChange(newValue);
            return;
        }

        const newVal = parseInt(inputVal, 10);

        // Early return if value is not a number after parsing
        if (isNaN(newVal)) return;

        // Update the numbers if all checks pass
        const newValue = [...value];
        newValue[index] = newVal;
        onChange(newValue);
    };

    const handleRandomNumbers = () => {
        const newNumbers = generateUniqueSecureRandomNumbers();
        onChange(newNumbers);
    };

    const inputs = [...Array(5)].map((_, index) => (
        <input
            key={index}
            type="number"
            min="1"
            max="90"
            value={value[index] || ''}
            onChange={handleInputChange(index)}
            disabled={isDisabled}
        />
    ));

    return (
        <div>
            <h2>Your numbers</h2>

            {inputs}

            <button onClick={handleRandomNumbers} disabled={isDisabled}>
                Generate Random Numbers
            </button>
        </div>
    );
}

export default NumbersInput
