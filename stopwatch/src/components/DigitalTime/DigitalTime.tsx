import React from "react";
import { formatTime } from "../../utils.ts";
import { Milliseconds } from "../../types.ts";
import styled from "styled-components";

interface Props {
    elapsedTime: Milliseconds
}

const DigitalTime: React.FC<Props> = ({ elapsedTime }) => {
    return (
        <Wrapper>
            {formatTime(elapsedTime)}
        </Wrapper>
    )
}

const Wrapper = styled.div`
  font-size: 4.5rem;
  font-weight: 300;
  width: 100%;
  text-align: center;
  display: grid;
  place-items: center;
`

export default DigitalTime
