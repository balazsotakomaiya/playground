import React from "react";
import { LotteryNumber } from "../../types.ts";

interface Props {
    winningNumbers: LotteryNumber[]
}

const WinningNumbers: React.FC<Props> = ({ winningNumbers }) => {
    return (
        <div>
            <h2>Winning numbers</h2>

            <p>{winningNumbers.join(', ')}</p>
        </div>
    );
}

export default WinningNumbers
