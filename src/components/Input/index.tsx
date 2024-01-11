import React, { ComponentType, InputHTMLAttributes } from "react";
import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ComponentType<{ size: number }>;
  }

export function Input({icon: Icon, ...rest}:InputProps){
    return(
        <Container>

           {Icon && <Icon size={20}/>}
            <input {...rest}/>

        </Container>
    )
}