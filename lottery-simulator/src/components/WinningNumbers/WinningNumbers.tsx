import React from "react";
import { OptionalLotteryNumber } from "../../types.ts";
import styled from "styled-components";

interface Props {
    winningNumbers: OptionalLotteryNumber[]
}

const WinningNumbers: React.FC<Props> = ({ winningNumbers }) => {
    return (
        <Wrapper>
            <Title>Winning numbers</Title>

            <Numbers>
                {winningNumbers.map((number, index) => (
                    // Not great practice, but perf is not a concern here
                    <Number key={index}>
                        {number}
                    </Number>
                ))}
            </Numbers>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: flex;
  margin-top: 32px;
  align-items: center;
  gap: 32px;
`

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
`

const Numbers = styled.div`
    display: flex;
    gap: 16px;
`

const Number = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #a5d9c8;
  color: white;
  font-weight: 600;
  font-size: 18px;
  width: 48px;
  height: 56px;
  border-radius: 4px;
`

export default WinningNumbers
