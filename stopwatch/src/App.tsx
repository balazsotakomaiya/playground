import { useEffect, useMemo, useReducer } from 'react'
import { produce } from "immer";
import { sumNumbers } from "./utils.ts";
import { ElapsedTime, Lap } from "./types.ts";

type StopwatchState = {
  isRunning: boolean;
  elapsedTime: ElapsedTime;
  laps: Lap[];
};

type StopwatchAction =
    | { type: 'START_STOPWATCH' }
    | { type: 'STOP_STOPWATCH' }
    | { type: 'RESET_STOPWATCH' }
    | { type: 'RECORD_LAP' }
    | { type: 'INCREMENT_ELAPSED_TIME', interval: number }
    ;

// Initial state
const initialState: StopwatchState = {
  isRunning: false,
  elapsedTime: 0,
  laps: [],
};

const UPDATE_INTERVAL = 10 // The stopwatch UI update interval in milliseconds

function stopwatchReducer(state: StopwatchState, action: StopwatchAction): StopwatchState {
  return produce(state, draftState => {
    switch (action.type) {
      case 'START_STOPWATCH':
        draftState.isRunning = true;
        break;
      case 'STOP_STOPWATCH':
        draftState.isRunning = false;
        break;
      case 'INCREMENT_ELAPSED_TIME':
        if (state.isRunning) {
          draftState.elapsedTime = state.elapsedTime + action.interval;
        }
        break;
      case 'RESET_STOPWATCH':
        draftState.isRunning = initialState.isRunning;
        draftState.elapsedTime = initialState.elapsedTime;
        draftState.laps = initialState.laps;
        break;
      case 'RECORD_LAP':
        if (state.isRunning) {
          // Calculate the duration of the current lap. The duration is the difference between
          // the total elapsed time so far and the sum of the durations of all previous laps.
          const lapDuration = state.elapsedTime - sumNumbers(state.laps)

          // Record the new lap
          draftState.laps.push(lapDuration);
        }
        break;
    }
  });
}

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
        <div>Elapsed Time: {formatTime(state.elapsedTime)}</div>
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
