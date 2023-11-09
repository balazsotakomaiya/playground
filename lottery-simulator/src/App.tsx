import { useReducer } from 'react'
import { initialState, reducer } from "./reducer.ts";
import { StatisticsCard } from "./components/StatisticsCard";
import { MatchesCard } from "./components/MatchesCard";
import { WinningNumbers } from "./components/WinningNumbers";
import { NumbersInput } from "./components/NumbersInput";

const COST_PER_DRAW = 300;

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

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
        </div>
    );
}

export default App
