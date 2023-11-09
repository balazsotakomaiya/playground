import { useEffect, useReducer } from 'react'
import { initialState, reducer } from "./reducer.ts";
import { StatisticsCard } from "./components/StatisticsCard";
import { MatchesCard } from "./components/MatchesCard";
import { WinningNumbers } from "./components/WinningNumbers";
import { NumbersInput } from "./components/NumbersInput";
import { LotteryNumber, Milliseconds, OptionalLotteryNumber } from "./types.ts";
import { SpeedSlider } from "./components/SpeedSlider";
import { generateUniqueSecureRandomNumbers } from "./utils.ts";

const COST_PER_DRAW = 300;
const MIN_SPEED: Milliseconds = 1;
const MAX_SPEED: Milliseconds = 1000;

const validateNumbers = (numbers: OptionalLotteryNumber[]) => {
    if (numbers.some(number => number === null)) {
        return 'All number inputs must be filled out.';
    }

    const numberSet = new Set(numbers);
    if (numberSet.size !== numbers.length) {
        return 'Numbers must be unique. Duplicate numbers found.';
    }

    if ((numbers as LotteryNumber[]).some((number) => number < 1 || number > 90)) {
        return 'Numbers must be between 1 and 90. Out of range number found.';
    }

    return null; // No errors found
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const hasFullDraw = state.matchCounts.five > 0;

    useEffect(() => {
        let interval: number | undefined;

        if (state.isRunning) {
            interval = window.setInterval(() => {
                const newNumbers = generateUniqueSecureRandomNumbers();

                dispatch({ type: "PERFORM_DRAW", payload: newNumbers });
                dispatch({ type: "CHECK_FOR_MATCHES" })
            }, state.speed);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [state.isRunning, state.speed]);

    useEffect(() => {
        if (hasFullDraw) {
            dispatch({ type: 'STOP_DRAW' });

            // todo: show UI, change to 5
        }
    }, [hasFullDraw, dispatch]);

    return (
        <div>
            <StatisticsCard
                numberOfDraws={state.numberOfDraws}
                costPerDraw={COST_PER_DRAW}
                hasFullDraw={hasFullDraw}
            />

            <MatchesCard
                matchCounts={state.matchCounts}
            />

            <WinningNumbers
                winningNumbers={state.winningNumbers}
            />

            <NumbersInput
                onChange={(newNumbers) => {
                    dispatch({ type: 'SET_USER_NUMBERS', payload: newNumbers })
                }}
                value={state.userNumbers}
            />

            <SpeedSlider
                minSpeed={MIN_SPEED}
                maxSpeed={MAX_SPEED}
                value={state.speed}
                onChange={(newSpeed) => {
                    dispatch({ type: 'SET_SPEED', payload: newSpeed })
                }}
            />

            {state.isRunning ? (
                <button
                    onClick={() => {
                        dispatch({ type: 'STOP_DRAW' })
                    }}
                >
                    Pause Drawing
                </button>
            ) : (
                <button
                    onClick={() => {
                        const validationError = validateNumbers(state.userNumbers);
                        if (!validationError) {
                            dispatch({ type: 'CLEAR_ERROR' });
                            dispatch({ type: 'START_DRAW' });
                        } else {
                            dispatch({ type: 'ERROR', payload: validationError });
                        }
                    }}
                >
                    Start Drawing
                </button>
            )}

            <button
                onClick={() => {
                    dispatch({ type: 'RESET' });
                }}
            >
                Reset
            </button>

            {state.errorMessage && <p>{state.errorMessage}</p>}
        </div>
    );
}

export default App
