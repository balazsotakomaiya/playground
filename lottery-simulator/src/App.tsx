import { useEffect, useReducer } from 'react'
import { initialState, reducer } from "./reducer.ts";
import { StatisticsCard } from "./components/StatisticsCard";
import { MatchesCard } from "./components/MatchesCard";
import { WinningNumbers } from "./components/WinningNumbers";
import { NumbersInput } from "./components/NumbersInput";
import { LotteryNumber, Milliseconds, OptionalLotteryNumber } from "./types.ts";
import { SpeedSlider } from "./components/SpeedSlider";
import { generateUniqueSecureRandomNumbers } from "./utils.ts";
import styled from "styled-components";
import { Button } from "./components/Button";

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

    // Stop the draw if the user has a full draw
    useEffect(() => {
        if (hasFullDraw) {
            dispatch({ type: 'STOP_DRAW' });
        }
    }, [hasFullDraw, dispatch]);

    return (
        <Wrapper>
            <Card>
                <Title>
                    Lottery Simulator
                </Title>

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

                <Buttons>
                    {state.isRunning ? (
                        <Button
                            onClick={() => {
                                dispatch({ type: 'STOP_DRAW' })
                            }}
                        >
                            Pause Drawing
                        </Button>
                    ) : (
                        <Button
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
                        </Button>
                    )}

                    <Button
                        onClick={() => {
                            dispatch({ type: 'RESET' });
                        }}
                    >
                        Reset
                    </Button>
                </Buttons>

                {state.errorMessage && <p>{state.errorMessage}</p>}
            </Card>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;

  @media (min-width: 768px) {
    padding: 32px;
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  border: 1px solid lightgray;
  border-radius: 16px;
  padding: 48px;
  width: 100%;
  box-sizing: border-box;
  
  @media (min-width: 768px) {
    margin: 0 auto;
    width: 800px;
  }
`

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 32px;
`

const Buttons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`

export default App
