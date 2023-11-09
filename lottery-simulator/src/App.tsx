import { useEffect, useReducer } from 'react'
import { initialState, reducer } from "./reducer.ts";
import { StatisticsCard } from "./components/StatisticsCard";
import { MatchesCard } from "./components/MatchesCard";
import { WinningNumbers } from "./components/WinningNumbers";
import { NumbersInput } from "./components/NumbersInput";
import { Milliseconds } from "./types.ts";
import { SpeedSlider } from "./components/SpeedSlider";

const COST_PER_DRAW = 300;
const MIN_SPEED: Milliseconds = 1;
const MAX_SPEED: Milliseconds = 1000;

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let interval: number | undefined;

        if (state.isRunning) {
            interval = window.setInterval(() => {
                dispatch({ type: "INCREMENT_DRAWS" });
            }, state.speed);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [state.isRunning, state.speed]);

    return (
        <div>
            <StatisticsCard
                numberOfDraws={state.numberOfDraws}
                costPerDraw={COST_PER_DRAW}
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
                        dispatch({ type: 'START_DRAW' })
                    }}
                >
                    Start Drawing
                </button>
            )}
        </div>
    );
}

export default App
