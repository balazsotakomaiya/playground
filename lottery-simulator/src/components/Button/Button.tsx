import React from 'react';
import styled from "styled-components";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
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
`

Button.displayName = 'Button';

export default Button;
