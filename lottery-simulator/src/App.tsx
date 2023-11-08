import { useReducer } from 'react'
import { initialState, reducer } from "./reducer.ts";
import { StatisticsCard } from "./components/StatisticsCard";

const COST_PER_DRAW = 300;

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <StatisticsCard
                numberOfDraws={state.numberOfDraws}
                costPerDraw={COST_PER_DRAW}
            />
        </div>
    );
}

export default App
