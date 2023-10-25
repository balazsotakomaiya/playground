import React from "react";
import { LapDuration, Milliseconds } from "../../types.ts";
import styled from "styled-components";
import { formatTime } from "../../utils.ts";

interface Props {
  elapsedTime: Milliseconds
  currentLap: LapDuration | null
}

const MinuteHand: React.FC<{ minutes: number; seconds: number; milliseconds: number }> = ({ minutes, seconds, milliseconds }) => {
  const totalMinutes = minutes + seconds / 60 + milliseconds / 60000;
  const degrees = (totalMinutes / 60) * 360;
  return <Hand $degrees={degrees} width="4px" height="36px" color="#f7a21a" />;
};

const SecondHand: React.FC<{ seconds: number; milliseconds: number }> = ({ seconds, milliseconds }) => {
  const totalSeconds = seconds + milliseconds / 1000;
  const degrees = (totalSeconds / 60) * 360; // Convert the total seconds into a degree value.
  return <Hand $degrees={degrees} width="2px" height="160px" color="#f7a21a" />;
};

const LapHand: React.FC<{ seconds: number; milliseconds: number }> = ({ seconds, milliseconds }) => {
  const totalSeconds = seconds + milliseconds / 1000;
  const degrees = (totalSeconds / 60) * 360; // Convert the total seconds into a degree value.
  return <Hand $degrees={degrees} width="2px" height="160px" color="#1788fd" />;
};

const AnalogClock: React.FC<Props> = ({ elapsedTime, currentLap }) => {
  const milliseconds = elapsedTime % 1000;
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const lapMilliseconds = currentLap ? currentLap % 1000 : 0;
  const lapSeconds = currentLap ? Math.floor((currentLap / 1000) % 60) : 0;

  return (
      <Wrapper>
        <Clock>
          <SecondHand seconds={seconds} milliseconds={milliseconds} />
          {currentLap ? <LapHand seconds={lapSeconds} milliseconds={lapMilliseconds} /> : null}

          <InnerDigitalClock role="timer" aria-label="Elapsed time on analog stopwatch">
            {formatTime(elapsedTime)}
          </InnerDigitalClock>

          <CenterDot />
        </Clock>

        <MinuteClock>
          <MinuteHand minutes={minutes} seconds={seconds} milliseconds={milliseconds} />
        </MinuteClock>
      </Wrapper>
  );
};

const InnerDigitalClock = styled.time`
  font-size: 1.5rem;
  font-weight: 300;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 128px;
`;

const CenterDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #f7a21a;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10; // this ensures it stays on top of the hands
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const Clock = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  border: 5px solid rgba(var(--color-gray));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const MinuteClock = styled.time`
  position: absolute;
  z-index: 1;
  top: 48px;
  width: 100px;
  height: 100px;
  border: 3px solid rgb(var(--color-gray));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Using .attrs is required to avoid creating a new class every time the component is rendered
const Hand = styled.div.attrs<{ $degrees: number }>(props => ({
  style: {
    transform: `translateX(-50%) rotate(${props.$degrees}deg)`,
  },
}))<{ width: string; height: string; color: string }>`
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.color};
  transform-origin: bottom;
`;

export default AnalogClock;
