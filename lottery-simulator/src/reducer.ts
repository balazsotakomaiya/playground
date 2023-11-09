import { produce } from 'immer';
import { LotteryNumber, Milliseconds, OptionalLotteryNumber } from "./types.ts";
import { countMatches } from "./utils.ts";

export type BaseState = {
    numberOfDraws: number;
    speed: Milliseconds;
    matchCounts: {
        two: number;
        three: number;
        four: number;
        five: number;
    };
}

export type RunningState = BaseState & {
    isRunning: true;
    userNumbers: LotteryNumber[];
    winningNumbers: LotteryNumber[];
}

export type StoppedState = BaseState & {
    isRunning: false;
    userNumbers: OptionalLotteryNumber[];
    winningNumbers: OptionalLotteryNumber[];
}

function isRunningState(state: State): state is RunningState {
    return state.isRunning;
}

export type State = RunningState | StoppedState;

export type Action =
    | { type: 'PERFORM_DRAW'; payload: LotteryNumber[] }
    | { type: 'SET_USER_NUMBERS'; payload: OptionalLotteryNumber[] }
    | { type: 'SET_SPEED'; payload: Milliseconds }
    | { type: 'START_DRAW' }
    | { type: 'STOP_DRAW' }
    | { type: 'CHECK_FOR_MATCHES' };

export const initialState: State = {
    numberOfDraws: 0,
    winningNumbers: [null, null, null, null, null],
    userNumbers: [null, null, null, null, null],
    speed: 1000, // Default speed is set to 1 second
    matchCounts: {
        two: 0,
        three: 0,
        four: 0,
        five: 0,
    },
    isRunning: false,
};

export const reducer = produce((draft: State, action: Action) => {
    switch (action.type) {
        case 'PERFORM_DRAW':
            if (!isRunningState(draft)) return;

            draft.winningNumbers = action.payload;
            draft.numberOfDraws += 1;
            break;
        case 'CHECK_FOR_MATCHES':
            if (!isRunningState(draft)) return;

            switch (countMatches(draft.userNumbers, draft.winningNumbers)) {
                case 2:
                    draft.matchCounts.two += 1;
                    break;
                case 3:
                    draft.matchCounts.three += 1;
                    break;
                case 4:
                    draft.matchCounts.four += 1;
                    break;
                case 5:
                    draft.matchCounts.five += 1;
                    break;
                default:
                    // No action needed for fewer than 2 matches
                    break;
            }
            break;
        case 'SET_USER_NUMBERS':
            draft.userNumbers = action.payload;
            break;
        case 'SET_SPEED':
            draft.speed = action.payload;
            break;
        case 'START_DRAW':
            draft.isRunning = true;
            break;
        case 'STOP_DRAW':
            draft.isRunning = false;
            break;
    }
});
