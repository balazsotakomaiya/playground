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
            <Title>Draw Speed <Value>{value}ms</Value></Title>
            <Slider
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
  flex-direction: column;
  gap: 16px;
`

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
`

const Value = styled.span`
  font-weight: 400;
  margin-left: 8px;
`;

const Slider = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 100%;
  height: 24px; /* Specified height */
  background: transparent;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;

  /* Styles for the slider handle */
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 16px;
    height: 16px;
    background: white;
    border: 1px solid #A5D9C8;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #A5D9C8;
    cursor: pointer;
  }

  /* Styles for the track */
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 16px;
    cursor: pointer;
    animate: 0.2s;
    background: #A5D9C8;
    border-radius: 8px;
  }

  &::-moz-range-track {
    width: 100%;
    height: 16px;
    cursor: pointer;
    animate: 0.2s;
    background: #A5D9C8;
    border-radius: 8px;
  }
`;

export default SpeedSlider;
