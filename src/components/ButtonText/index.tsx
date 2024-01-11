import React, { ButtonHTMLAttributes } from "react";
import { Container } from "./styles";

interface ButtonTextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    isActive?: boolean;
  }

export function ButtonText({ title, isActive = false, ...rest }:ButtonTextProps) {
    return (
        <Container
            type="button"
            $isActive= {isActive}
            {...rest}
        >
            {title}
        </Container>
    );
}