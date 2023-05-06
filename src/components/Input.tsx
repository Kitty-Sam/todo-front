import React, { FC } from 'react';
import { InputProps } from '~/components/interfaces';
import styles from '~/styles/Input.module.scss';

export const Input: FC<InputProps> = ({ placeholder, value, onChange }) => {
    return <input value={value} onChange={onChange} placeholder={placeholder} className={styles.input} />;
};
