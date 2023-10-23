import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'danger' | 'success'
    disabled?: boolean
}

const RoundButton: React.FC<Props> = (props) => {
    const {
        variant,
        disabled,
        ...rest
    } = props

    return (
        <StyledRoundButton
            {...rest}
            variant={variant}
            disabled={disabled}
        />
    );
}

const StyledRoundButton = styled.button<{
    variant: Props['variant'],
    disabled: Props['disabled']
}>`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border: none;
  font-size: 1rem;
  background: var(--primary-color);
  
  opacity: ${props => props.disabled ? 0.8 : 1};
`

export default RoundButton
