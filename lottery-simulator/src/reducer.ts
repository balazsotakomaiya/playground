import { produce } from 'immer';
import { LotteryNumber, Milliseconds } from "./types.ts";

export type State = {
    numberOfDraws: number;
    winningNumbers: LotteryNumber[];
    userNumbers: LotteryNumber[];
    speed: Milliseconds;
    matchCounts: {
        two: number;
        three: number;
        four: number;
        five: number;
    };
    isRunning: boolean;
};

export type Action =
    | { type: 'INCREMENT_DRAWS' }
    | { type: 'SET_WINNING_NUMBERS'; payload: LotteryNumber[] }
    | { type: 'SET_USER_NUMBERS'; payload: LotteryNumber[] }
    | { type: 'SET_SPEED'; payload: number }
    | { type: 'START_DRAW' }
    | { type: 'STOP_DRAW' }
    | {
        type: 'INCREMENT_MATCH_COUNT';
        payload: 'two' | 'three' | 'four' | 'five';
    };

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
        case 'INCREMENT_DRAWS':
            draft.numberOfDraws += 1;
            break;
        case 'SET_WINNING_NUMBERS':
            draft.winningNumbers = action.payload;
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
        case 'INCREMENT_MATCH_COUNT':
            if (draft.matchCounts[action.payload]) {
                draft.matchCounts[action.payload] += 1;
            } else {
                draft.matchCounts[action.payload] = 1; // Initialize if not present
            }
            break;
    }
});
