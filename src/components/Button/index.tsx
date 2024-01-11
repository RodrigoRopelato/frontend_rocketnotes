import React, { ButtonHTMLAttributes } from "react";
import { Container } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    loading?: boolean;
  }

export function Button({ title, loading = false, ...rest }:ButtonProps) {
    return (
        <Container
            type="button"
            disabled={loading}
            {...rest}
        >
            {loading ? 'Carregando' : title}
        </Container>
    );
}