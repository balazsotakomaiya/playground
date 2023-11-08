import { produce } from 'immer';
import { Milliseconds } from "./types.ts";

export type State = {
    numberOfDraws: number;
    winningNumbers: number[];
    userNumbers: number[];
    speed: Milliseconds;
};

export type Action =
    | { type: 'INCREMENT_DRAWS' }
    | { type: 'SET_WINNING_NUMBERS'; payload: number[] }
    | { type: 'SET_USER_NUMBERS'; payload: number[] }
    | { type: 'SET_SPEED'; payload: number };

export const initialState: State = {
    numberOfDraws: 0,
    winningNumbers: [],
    userNumbers: [],
    speed: 1000, // Default speed is set to 1 second
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
    }
});
