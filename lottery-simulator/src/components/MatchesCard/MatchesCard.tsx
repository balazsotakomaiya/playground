import React from "react";
import styled from "styled-components";

interface Props {
    matchCounts: {
        two: number;
        three: number;
        four: number;
        five: number;
    }
}

const MatchesCard: React.FC<Props> = ({ matchCounts }) => {
    return (
        <Card>
            <Match>
                <MatchTitle>2 matches</MatchTitle>

                <MatchValue>{matchCounts.two}</MatchValue>
            </Match>

            <Match>
                <MatchTitle>3 matches</MatchTitle>

                <MatchValue>{matchCounts.three}</MatchValue>
            </Match>

            <Match>
                <MatchTitle>4 matches</MatchTitle>

                <MatchValue>{matchCounts.four}</MatchValue>
            </Match>

            <Match>
                <MatchTitle>5 matches</MatchTitle>

                <MatchValue>{matchCounts.five}</MatchValue>
            </Match>
        </Card>
    );
}

const Card = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border: 1px solid lightgray;
  border-radius: 16px;
  border-collapse: collapse;

  & > * + * {
    border-left: 1px solid lightgray;
    border-right-width: 0;
  }
`

const Match = styled.div`
  padding: 24px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`

const MatchTitle = styled.h3`
  margin: 0;
  font-weight: 400;
`

const MatchValue = styled.span`
  font-size: 24px;
  font-weight: 600;
`

export default MatchesCard
