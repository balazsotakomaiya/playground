import React from 'react';
import { Milliseconds } from "../../types.ts";
import styled from "styled-components";

interface Props {
    minSpeed: Milliseconds;
    maxSpeed: Milliseconds;
    value: Milliseconds;
    onChange: (newSpeed: Milliseconds) => void;
}

const SpeedSlider: React.FC<Props> = ({ minSpeed, maxSpeed, value, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <Wrapper>
            <label htmlFor="speed-slider">Draw Speed: {value}ms</label>
            <input
                id="speed-slider"
                type="range"
                min={minSpeed}
                max={maxSpeed}
                value={value}
                onChange={handleChange}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  margin-top: 32px;
`

export default SpeedSlider;
