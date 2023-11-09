import React from "react";
import { OptionalLotteryNumber } from "../../types.ts";
import { generateUniqueSecureRandomNumbers } from "../../utils.ts";
import { Button } from "../Button";
import styled from "styled-components";

interface Props {
    value: OptionalLotteryNumber[];
    onChange: (newNumbers: OptionalLotteryNumber[]) => void;
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
        <NumberInput
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
        <Wrapper>
            <TitleAndNumbers>
                <Title>Your numbers</Title>

                <Numbers>
                    {inputs}
                </Numbers>
            </TitleAndNumbers>

            <Button onClick={handleRandomNumbers} disabled={isDisabled}>
                Generate Random Numbers
            </Button>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: flex;
  margin-top: 32px;
  gap: 16px;
  align-items: flex-start;
  flex-direction: column;
`

const TitleAndNumbers = styled.div`
  display: flex;
  gap: 16px;
  align-items: start;
  flex-direction: column;

  @media (min-width: 768px) {
    gap: 32px;
    align-items: center;
    flex-direction: row;
  }
`

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
`

const Numbers = styled.div`
  display: flex;
  gap: 16px;
`

const NumberInput = styled.input`
  text-align: center;
  border: 1px solid #a5d9c8;
  color: #363636;
  background: transparent;
  font-weight: 600;
  font-size: 18px;
  width: 44px;
  height: 52px;
  border-radius: 4px;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
`

export default NumbersInput
