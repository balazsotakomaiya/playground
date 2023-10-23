import { useEffect, useMemo, useReducer } from "react";
import stopwatchReducer, { initialState } from "./reducer";
import { DigitalTime } from "./components/DigitalTime";
import { Laps } from "./components/Laps";
import styled from "styled-components";
import { RoundButton } from "./components/RoundButton";

const UPDATE_INTERVAL = 10; // The stopwatch UI update interval in milliseconds

function App() {
  const [state, dispatch] = useReducer(stopwatchReducer, initialState);

  const worstLapTime = useMemo(() => {
    return state.laps.length > 0 ? Math.max(...state.laps) : null;
  }, [state.laps]);

  const bestLapTime = useMemo(() => {
    return state.laps.length > 0 ? Math.min(...state.laps) : null;
  }, [state.laps]);

  const reversedLaps = [...state.laps].reverse(); // Do not mutate React state directly

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
        <DigitalTime elapsedTime={state.elapsedTime} />
        <Controls>
          { state.isRunning ? (
              <RoundButton onClick={recordLap}>
                Lap
              </RoundButton>
          ) : (
              <RoundButton onClick={resetStopwatch}>
                Reset
              </RoundButton>
          )}

          {/*todo: slider controls*/}

          { state.isRunning ? (
              <RoundButton onClick={stopStopwatch}>
                Stop
              </RoundButton>
          ) : (
              <RoundButton onClick={startStopwatch}>
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
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  padding: 20px;
`

const TimeAndControls = styled.div`
  height: 400px;
  border-bottom: 1px solid var(--primary-color);
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`

export default App;
