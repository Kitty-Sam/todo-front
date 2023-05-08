import { ChangeEvent } from 'react';

export interface IFormProps {
    item: string;
    setItem: (value: string) => void;
}

export interface InputProps {
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type: string;
}
