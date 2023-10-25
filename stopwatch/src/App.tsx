import { useEffect, useReducer } from "react";
import stopwatchReducer, { initialState } from "./reducer";
import { Laps } from "./components/Laps";
import styled from "styled-components";
import { RoundButton } from "./components/RoundButton";
import { Pagination } from "./components/Pagination";
import {
  ANALOG_CLOCK_INDEX,
  ClockSlider,
  DIGITAL_CLOCK_INDEX,
} from "./components/ClockSlider";

const UPDATE_INTERVAL = 10; // The stopwatch UI update interval in milliseconds

function App() {
  const [state, dispatch] = useReducer(stopwatchReducer, initialState);

  const reversedLaps = [...state.laps].reverse(); // Do not mutate React state directly
  const canReset = state.elapsedTime > 0 && !state.isRunning;
  const canLap = state.elapsedTime > 0;

  const startStopwatch = () => {
    dispatch({ type: "START_STOPWATCH" });
  };

  const stopStopwatch = () => {
    dispatch({ type: "STOP_STOPWATCH" });
  };

  const resetStopwatch = () => {
    dispatch({ type: "RESET_STOPWATCH" });
  };

  const recordLap = () => {
    dispatch({ type: "RECORD_LAP" });
  };

  useEffect(() => {
    let interval: number | undefined;

    if (state.isRunning) {
      interval = window.setInterval(() => {
        dispatch({
          type: "INCREMENT_ELAPSED_TIME",
          interval: UPDATE_INTERVAL,
        });
      }, UPDATE_INTERVAL); // updating the time every 10 milliseconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.isRunning]);

  return (
    <Wrapper>
      <TimeAndControls>
        <ClockSlider
          elapsedTime={state.elapsedTime}
          displayMode={state.displayMode}
          currentLap={reversedLaps.length > 1 ? reversedLaps[0] : null}
          onClockModeChange={(displayMode) => {
            dispatch({ type: "SET_DISPLAY_MODE", displayMode });
          }}
        />

        <Controls>
          {canReset ? (
            <RoundButton onClick={resetStopwatch}>Reset</RoundButton>
          ) : (
            <RoundButton onClick={recordLap} disabled={!canLap}>
              Lap
            </RoundButton>
          )}

          <Pagination
            numberOfDots={2}
            activeDotIndex={
              state.displayMode === "digital"
                ? DIGITAL_CLOCK_INDEX
                : ANALOG_CLOCK_INDEX
            }
          />

          {state.isRunning ? (
            <RoundButton variant="danger" onClick={stopStopwatch}>
              Stop
            </RoundButton>
          ) : (
            <RoundButton variant="success" onClick={startStopwatch}>
              Start
            </RoundButton>
          )}
        </Controls>
      </TimeAndControls>

      <Laps laps={reversedLaps} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;

  // Narrow screen on desktop
  @media (min-width: 768px) {
    width: 550px;
    margin: 0 auto;
  }
`;

const TimeAndControls = styled.div`
  height: 450px;
  border-bottom: 1px solid rgba(var(--color-gray));
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default App;
