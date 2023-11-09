import React from "react";
import { OptionalLotteryNumber } from "../../types.ts";

interface Props {
    winningNumbers: OptionalLotteryNumber[]
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
