import styled from 'styled-components';

const Laps = () => {
    const laps = [
        { number: 3, time: "18:09.75" },
        { number: 2, time: "00:09.82" },
        { number: 1, time: "00:01.31" },
    ];

    return (
        <LapContainer>
            {laps.map(lap => (
                <LapItem key={lap.number}>
                    <LapNumber>Lap {lap.number}</LapNumber>
                    <LapTime>{lap.time}</LapTime>
                </LapItem>
            ))}
        </LapContainer>
    );
}

const LapContainer = styled.div`
    background-color: black;
    color: white;
    font-family: Arial, sans-serif;
    padding: 10px;
`;

const LapItem = styled.div`
    border-bottom: 1px solid red;
    padding: 5px 0;
`;

const LapNumber = styled.span`
    font-weight: bold;
`;

const LapTime = styled.span`
    margin-left: 10px;
`;

export default Laps;
