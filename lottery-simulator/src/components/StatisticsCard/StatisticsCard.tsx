import React from "react";

interface Props {
    numberOfDraws: number
    costPerDraw: number
    hasFullDraw: boolean
}

const StatisticsCard: React.FC<Props> = ({ numberOfDraws, costPerDraw, hasFullDraw }) => {
    // Memoize the years calculation
    const yearsSpent = React.useMemo(() => {
        return numberOfDraws / 52; // Assuming there are 52 draws in a year
    }, [numberOfDraws]);

    // Memoize the cost calculation
    const totalCost = React.useMemo(() => {
        return numberOfDraws * costPerDraw;
    }, [numberOfDraws, costPerDraw]);

    // Format numbers to a fixed decimal place for display
    const formattedYearsSpent = yearsSpent.toFixed(0);
    const formattedTotalCost = totalCost.toFixed(0);

    return (
        <div>
            <h2>Statistics</h2>
            <p>Number of tickets: {numberOfDraws}</p>
            { hasFullDraw ? (
                <b>Years spent: {formattedYearsSpent}</b>
            ) : (
                <p>Years spent: {formattedYearsSpent}</p>
            ) }
            <p>Total cost: {formattedTotalCost} Ft</p>
        </div>
    );
}

export default StatisticsCard
