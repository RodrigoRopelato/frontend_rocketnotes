import React, { TextareaHTMLAttributes } from "react";
import { Container } from "./styles";


interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    value?: string;
}

export function Textarea({value, ...rest} : TextareaProps){
    return(
        <Container {...rest}>
            {value}
        </Container>
    )
}