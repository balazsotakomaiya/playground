import styled from 'styled-components';
import React from "react";
import { formatTime } from "../../utils.ts";
import { LapDuration } from "../../types.ts";

interface Props {
    laps: LapDuration[]
}

const Laps: React.FC<Props> = ({ laps }) => {
    return (
        <LapContainer>
            {laps.map((lap, index) => (
                <LapItem key={`lap-${index}`}>
                    <LapNumber className="lap-number">Lap {laps.length - index}</LapNumber>
                    <LapTime className="lap-time"> {formatTime(lap)}</LapTime>
                </LapItem>
            ))}
        </LapContainer>
    );
}

// todo: overflow-y: scroll

const LapContainer = styled.div`
    background-color: black;
    color: white;
`;

const LapItem = styled.div`
    border-bottom: 1px solid rgb(var(--color-gray));
    padding: 8px 0;
`;

const LapNumber = styled.span`
    font-weight: bold;
`;

const LapTime = styled.span`
    margin-left: 10px;
`;

export default Laps;
