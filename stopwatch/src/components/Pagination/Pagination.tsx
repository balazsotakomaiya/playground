import styled from "styled-components";
import React from "react";

interface Props {
    numberOfDots: number
    activeDotIndex: number
}

const Pagination: React.FC<Props> = ({ activeDotIndex, numberOfDots }) => (
    <DotsWrapper>
        {Array.from({ length: numberOfDots }).map((_, index) => (
            <Dot key={index} isActive={activeDotIndex === index} />
        ))}
    </DotsWrapper>
);

const DotsWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const Dot = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.isActive ? 'white' : 'rgba(var(--color-gray))'};
`;

export default Pagination;
