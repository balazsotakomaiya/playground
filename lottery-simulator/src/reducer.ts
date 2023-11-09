import { produce } from 'immer';
import { Milliseconds } from "./types.ts";

export type State = {
    numberOfDraws: number;
    winningNumbers: number[];
    userNumbers: number[];
    speed: Milliseconds;
    matchCounts: {
        two: number;
        three: number;
        four: number;
        five: number;
    };
};

export type Action =
    | { type: 'INCREMENT_DRAWS' }
    | { type: 'SET_WINNING_NUMBERS'; payload: number[] }
    | { type: 'SET_USER_NUMBERS'; payload: number[] }
    | { type: 'SET_SPEED'; payload: number }
    | {
        type: 'INCREMENT_MATCH_COUNT';
        payload: 'two' | 'three' | 'four' | 'five';
    };

export const initialState: State = {
    numberOfDraws: 0,
    winningNumbers: [],
    userNumbers: [],
    speed: 1000, // Default speed is set to 1 second
    matchCounts: {
        two: 0,
        three: 0,
        four: 0,
        five: 0,
    }
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
        case 'INCREMENT_MATCH_COUNT':
            if (draft.matchCounts[action.payload]) {
                draft.matchCounts[action.payload] += 1;
            } else {
                draft.matchCounts[action.payload] = 1; // Initialize if not present
            }
            break;
    }
});
