import { MainLayout } from '~/components/MainLayout';
import stylesRegister from 'src/styles/Register.module.scss';
import styles from 'src/styles/Profile.module.scss';

import { Routes } from './index';
import React, { ChangeEvent, useState } from 'react';
import { Input } from '~/components/Input';
import { useDispatch } from 'react-redux';
import { registerAction } from '~/store/sagas/sagasActions/actions/registerUser';
import { toast } from 'react-toastify';
import Link from 'next/link';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const registerPress = () => {
        const payload = {
            email,
            name,
            password,
            toast,
        };
        dispatch(registerAction(payload));
    };

    const changeUserNamePress = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const changeUserEmailPress = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const changeUserPasswordPress = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>Register</h2>
                <Link href={Routes.HOME} className={stylesRegister.link}>
                    home
                </Link>
            </div>
            <div className={stylesRegister.formContainer}>
                <Input placeholder={'enter your name'} value={name} onChange={changeUserNamePress} />
                <Input placeholder={'enter your email'} value={email} onChange={changeUserEmailPress} />
                <Input placeholder={'enter your password'} value={password} onChange={changeUserPasswordPress} />
                <button className={styles.btn} onClick={registerPress} disabled={!email || !password}>
                    register
                </button>
            </div>
        </MainLayout>
    );
};

export default Register;
