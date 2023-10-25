import styled from "styled-components";
import React, { useMemo } from "react";
import { formatTime } from "../../utils.ts";
import { LapDuration } from "../../types.ts";

interface Props {
  laps: LapDuration[];
}

const Laps: React.FC<Props> = ({ laps }) => {
  const lapsWithoutCurrent = laps.slice(1);

  const [bestLapTime, worstLapTime] = useMemo(() => {
    if (lapsWithoutCurrent.length > 1) {
      return [
        Math.min(...lapsWithoutCurrent),
        Math.max(...lapsWithoutCurrent)
      ];
    }
    return [null, null];
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
          <span>Lap {laps.length - index}</span>
          <LapTime> {formatTime(lap)}</LapTime>
        </LapItem>
      ))}
    </LapContainer>
  );
};

const LapContainer = styled.ul`
  overflow-y: auto;
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
  display: flex;
  justify-content: space-between;

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

const LapTime = styled.span`
  margin-left: 10px;
`;

export default Laps;
