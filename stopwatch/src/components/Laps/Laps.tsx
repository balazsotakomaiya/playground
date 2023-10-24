import styled from "styled-components";
import React, { useMemo } from "react";
import { formatTime } from "../../utils.ts";
import { LapDuration } from "../../types.ts";

interface Props {
  laps: LapDuration[];
}

const Laps: React.FC<Props> = ({ laps }) => {
  const lapsWithoutCurrent = laps.slice(1);

  const worstLapTime = useMemo(() => {
    if (lapsWithoutCurrent.length > 1) {
      // Ensure there are at least three laps (excluding current lap)
      return Math.max(...lapsWithoutCurrent);
    }
    return null; // Return null if there are less than three laps (excluding current lap)
  }, [lapsWithoutCurrent]);

  const bestLapTime = useMemo(() => {
    if (lapsWithoutCurrent.length > 1) {
      return Math.min(...lapsWithoutCurrent);
    }
    return null;
  }, [lapsWithoutCurrent]);

  return (
    <LapContainer>
      {laps.map((lap, index) => (
        <LapItem
          key={`lap-${index}`}
          $isBestLap={lap === bestLapTime}
          $isWorstLap={lap === worstLapTime}
        >
          <LapNumber className="lap-number">
            Lap {laps.length - index}
          </LapNumber>
          <LapTime className="lap-time"> {formatTime(lap)}</LapTime>
        </LapItem>
      ))}
    </LapContainer>
  );
};

// todo: overflow-y: scroll

const LapContainer = styled.div`
  background-color: black;
  color: white;
`;

const LapItem = styled.div<{
  $isBestLap?: boolean;
  $isWorstLap?: boolean;
}>`
  border-bottom: 1px solid rgb(var(--color-gray));
  padding: 8px 0;

  ${(props) =>
    props.$isBestLap &&
    `
    color: rgba(var(--color-green));
  `}
  ${(props) =>
    props.$isWorstLap &&
    `
    color: rgba(var(--color-red));
  `}
`;

const LapNumber = styled.span`
  font-weight: bold;
`;

const LapTime = styled.span`
  margin-left: 10px;
`;

export default Laps;
