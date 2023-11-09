import React from 'react';
import styled from "styled-components";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'warning'
}

const Button = React.forwardRef<HTMLButtonElement, Props>(({ children, ...props }, ref) => {
    return (
        <StyledButton ref={ref} {...props}>
            {children}
        </StyledButton>
    );
});

const StyledButton = styled.button<Props>`
  padding: 12px 16px;
  border: 0;
  cursor: pointer;
  border-radius: 8px;
  width: auto;
  background: ${(props) => {
    const variant = props.variant || 'primary';
    switch (variant) {
      case 'primary':
        return '#a5d9c8';
      case 'secondary':
        return 'lightgray';
      case 'warning':
        return '#f5b971';
      default:
        return '#a5d9c8';
    }
  }};

  color: ${(props) => {
    const variant = props.variant || 'primary';
    switch (variant) {
      case 'primary':
        return 'white';
      case 'secondary':
        return 'white';
      case 'warning':
        return 'white';
      default:
        return 'white';
    }
  }};
`

Button.displayName = 'Button';

export default Button;
