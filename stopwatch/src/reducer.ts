import { produce } from "immer";
import { sumNumbers } from "./utils.ts";
import { LapDuration, Milliseconds } from "./types.ts";

export enum DisplayMode {
    DIGITAL = 'digital',
    ANALOG = 'analog',
}

export type StopwatchAction =
    | { type: 'START_STOPWATCH' }
    | { type: 'STOP_STOPWATCH' }
    | { type: 'RESET_STOPWATCH' }
    | { type: 'RECORD_LAP' }
    | { type: 'INCREMENT_ELAPSED_TIME', interval: number }
    | { type: 'SET_DISPLAY_MODE', displayMode: DisplayMode }
    ;

export type StopwatchState = {
    isRunning: boolean;
    elapsedTime: Milliseconds;
    laps: LapDuration[];
    displayMode: DisplayMode;
};

// Initial state
export const initialState: StopwatchState = {
    isRunning: false,
    elapsedTime: 0,
    laps: [],
    displayMode: DisplayMode.DIGITAL,
};

const reducer = (state: StopwatchState, action: StopwatchAction): StopwatchState => {
    return produce(state, draftState => {
        switch (action.type) {
            case 'START_STOPWATCH':
                draftState.isRunning = true;

                // Create a new lap, if laps are empty
                if (draftState.laps.length === 0) {
                    draftState.laps.push(0);
                }
                break;
            case 'STOP_STOPWATCH':
                draftState.isRunning = false;
                break;
            case 'INCREMENT_ELAPSED_TIME':
                if (state.isRunning) {
                    draftState.elapsedTime = state.elapsedTime + action.interval;

                    // Update the duration of the current lap
                    const previousLapsDuration = sumNumbers(draftState.laps.slice(0, -1));
                    draftState.laps[draftState.laps.length - 1] = draftState.elapsedTime - previousLapsDuration;
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
            case 'SET_DISPLAY_MODE':
                draftState.displayMode = action.displayMode;
                break;
        }
    });
}

export default reducer;
