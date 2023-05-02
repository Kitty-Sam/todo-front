import React, { FC } from 'react';

export interface InputProps {
    placeholder: string;
    value: string;
    onChange: any;
}
export const Input: FC<InputProps> = ({ placeholder, value, onChange }) => {
    return (
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{ padding: 10, borderRadius: 10, borderColor: 'black', marginRight: 10, margin: 10 }}
        />
    );
};
