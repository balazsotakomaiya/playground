import React from "react";

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
        <div>
            <div>
                <h3>2 matches</h3>

                {matchCounts.two}
            </div>

            <div>
                <h3>3 matches</h3>

                {matchCounts.three}
            </div>

            <div>
                <h3>4 matches</h3>

                {matchCounts.four}
            </div>

            <div>
                <h3>5 matches</h3>

                {matchCounts.five}
            </div>
        </div>
    );
}

export default MatchesCard
