import React from 'react';
import { Milliseconds } from "../../types.ts";

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
        <div>
            <label htmlFor="speed-slider">Draw Speed: {value}ms</label>
            <input
                id="speed-slider"
                type="range"
                min={minSpeed}
                max={maxSpeed}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default SpeedSlider;
