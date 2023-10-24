import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'danger' | 'success'
    disabled?: boolean
}

const RoundButton: React.FC<Props> = (props) => {
    const {
        variant = 'primary',
        disabled,
        ...rest
    } = props

    return (
        <StyledRoundButton
            {...rest}
            $variant={variant}
            disabled={disabled}
        />
    );
}

const StyledRoundButton = styled.button<{
    $variant: Props['variant'],
    disabled: Props['disabled']
}>`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border: none;
  font-size: 1rem;
  outline: none;
  opacity: ${props => props.disabled ? 0.8 : 1};
  background: ${props => {
    switch (props.$variant) {
      case 'primary':
        return 'rgba(var(--color-gray))';
      case 'danger':
        return 'rgba(var(--color-red), 0.2)';
      case 'success':
        return 'rgba(var(--color-green), 0.2)';
    }
  }};
  color: ${props => {
    switch (props.$variant) {
      case 'primary':
        return 'white';
      case 'danger':
        return 'rgba(var(--color-red))';
      case 'success':
        return 'rgba(var(--color-green))';
    }
  }};

  &:active {
    background: ${props => {
      switch (props.variant) {
        case 'primary':
          return 'rgba(var(--color-gray), 0.8)';
        case 'danger':
          return 'rgba(var(--color-red), 0.1)';
        case 'success':
          return 'rgba(var(--color-green), 0.1)';
      }
    }};
  }
`

export default RoundButton
