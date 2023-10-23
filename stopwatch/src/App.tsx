import { useEffect, useMemo, useReducer } from 'react'
import { formatTime } from "./utils.ts";
import stopwatchReducer, { initialState } from "./reducer";
import { DigitalTime } from "./components/DigitalTime";
import { Laps } from "./components/Laps";

const UPDATE_INTERVAL = 10 // The stopwatch UI update interval in milliseconds

function App() {
  const [state, dispatch] = useReducer(stopwatchReducer, initialState)

  const worstLapTime = useMemo(() => {
    return state.laps.length > 0 ? Math.max(...state.laps) : null;
  }, [state.laps]);

  const bestLapTime = useMemo(() => {
    return state.laps.length > 0 ? Math.min(...state.laps) : null;
  }, [state.laps]);

  const reversedLaps = [...state.laps].reverse() // Do not mutate React state directly

  const startStopwatch = () => {
    dispatch({ type: 'START_STOPWATCH' });
  };

  const stopStopwatch = () => {
    dispatch({ type: 'STOP_STOPWATCH' });
  };

  const resetStopwatch = () => {
    dispatch({ type: 'RESET_STOPWATCH' });
  };

  const recordLap = () => {
    dispatch({ type: 'RECORD_LAP' });
  };

  useEffect(() => {
    let interval: number | undefined;

    if (state.isRunning) {
      interval = window.setInterval(() => {
        dispatch({
          type: 'INCREMENT_ELAPSED_TIME',
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
      <div>
        <DigitalTime elapsedTime={state.elapsedTime} />
        <button onClick={startStopwatch} disabled={state.isRunning}>
          Start
        </button>
        <button onClick={stopStopwatch} disabled={!state.isRunning}>
          Stop
        </button>
        <button onClick={resetStopwatch} disabled={state.isRunning}>
          Reset
        </button>
        <button onClick={recordLap} disabled={!state.isRunning}>
          Lap
        </button>
        <h2>Laps</h2>
        <Laps />

        {reversedLaps.map((lap, index) => (
            <li
                key={`lap-${index}`}
            >
              <span className="lap-number">Lap {state.laps.length - index}</span>
              <span className="lap-time"> {formatTime(lap)}</span>
            </li>
        ))}
      </div>
  )
}

export default App
