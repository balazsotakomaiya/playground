import { produce } from "immer";
import { sumNumbers } from "./utils.ts";
import { LapDuration, Milliseconds } from "./types.ts";

export type DisplayMode = 'digital' | 'analog'

export type StopwatchAction =
    | { type: 'START_STOPWATCH' }
    | { type: 'STOP_STOPWATCH' }
    | { type: 'RESET_STOPWATCH' }
    | { type: 'RECORD_LAP' }
    | { type: 'INCREMENT_ELAPSED_TIME', interval: number }
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
    displayMode: 'digital',
};

const reducer = (state: StopwatchState, action: StopwatchAction): StopwatchState => {
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

export default reducer;
