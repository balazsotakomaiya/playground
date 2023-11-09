import React from "react";
import styled from "styled-components";
import { formatNumber } from "../../utils.ts";

interface Props {
    numberOfDraws: number
    costPerDraw: number
    hasFullDraw: boolean
}

const StatisticsCard: React.FC<Props> = ({ numberOfDraws, costPerDraw, hasFullDraw }) => {
    // Memoize the years calculation
    const yearsSpent = React.useMemo(() => {
        return Math.floor(numberOfDraws / 52); // Assuming there are 52 draws in a year and rounding down to the nearest whole number
    }, [numberOfDraws]);

    // Memoize the cost calculation
    const totalCost = React.useMemo(() => {
        return numberOfDraws * costPerDraw;
    }, [numberOfDraws, costPerDraw]);

    // Format numbers for display
    const formattedYearsSpent = formatNumber(yearsSpent);
    const formattedTotalCost = formatNumber(totalCost);

    return (
        <Card>
            <p>Number of tickets: {numberOfDraws}</p>
            { hasFullDraw ? (
                <b>Years spent: {formattedYearsSpent}</b>
            ) : (
                <p>Years spent: {formattedYearsSpent}</p>
            ) }
            <p>Total cost: {formattedTotalCost} Ft</p>
        </Card>
    );
};


const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  background: #a5d9c8;
  padding: 24px 32px;
  border-radius: 16px;
  color: white;
  font-weight: 500;
  font-size: 18px;
  gap: 16px;
  margin-bottom: 32px;

  p {
    margin: 0;
  }
`

export default StatisticsCard
