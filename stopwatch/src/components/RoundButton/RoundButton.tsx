import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'danger' | 'success'
}

const RoundButton: React.FC<Props> = (props) => {
    const {
        variant,
        ...rest
    } = props

    return <StyledRoundButton {...rest} variant={variant} />;
}

const StyledRoundButton = styled.button<{ variant: Props['variant'] }>`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border: none;
  font-size: 1rem;
`

export default RoundButton
