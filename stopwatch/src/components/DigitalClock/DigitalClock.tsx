import React from "react";
import { formatTime } from "../../utils.ts";
import { Milliseconds } from "../../types.ts";
import styled from "styled-components";

interface Props {
  elapsedTime: Milliseconds;
}

const DigitalClock: React.FC<Props> = ({ elapsedTime }) => {
  return (
    <Wrapper role="timer" aria-label="Elapsed time on stopwatch">
      {formatTime(elapsedTime)}
    </Wrapper>
  );
};

const Wrapper = styled.time`
  font-size: 5rem;
  font-weight: 300;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default DigitalClock;
