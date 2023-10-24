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
          $isBestLap={index === 0 ? false : lap === bestLapTime} // Exclude current lap from best lap calculation
          $isWorstLap={index === 0 ? false : lap === worstLapTime} // Exclude current lap from worst lap calculation
          aria-label={`Lap ${laps.length - index}, time: ${formatTime(lap)} ${
            index !== 0 && lap === bestLapTime ? ", best lap" : ""
          }${index !== 0 && lap === worstLapTime ? ", worst lap" : ""}`}
        >
          <LapNumber>Lap {laps.length - index}</LapNumber>
          <LapTime> {formatTime(lap)}</LapTime>
        </LapItem>
      ))}
    </LapContainer>
  );
};

const LapContainer = styled.ul`
  background-color: black;
  color: white;
  overflow-y: scroll;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const LapItem = styled.li<{
  $isBestLap?: boolean;
  $isWorstLap?: boolean;
}>`
  border-bottom: 1px solid rgb(var(--color-gray));
  padding: 8px 0;
  list-style: none;

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
