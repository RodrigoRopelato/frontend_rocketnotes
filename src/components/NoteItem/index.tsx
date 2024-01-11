import React, { ChangeEvent, MouseEvent } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

import { Container } from './styles';

interface NoteItemProps {
    isNew?: boolean;
    value: string;
    placeholder?: string;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function NoteItem({ isNew = false, value, onClick, ...rest }: NoteItemProps) {
    return (
        <Container $isNew={isNew}>
            <input
                type="text"
                value={value}
                readOnly={!isNew}
                {...rest}
            />

            <button
                type='button'
                onClick={onClick}
                className={isNew ? 'button-add' : 'button-delete'}
            >
                {isNew ? <FiPlus /> : <FiX />}
            </button>
        </Container>
    )
}