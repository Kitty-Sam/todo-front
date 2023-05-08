import { MainLayout } from '~/components/MainLayout';
import styles from 'src/styles/Profile.module.scss';

import { Routes } from './index';
import { Input } from '~/components/Input';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '~/store/sagas/sagasActions/actions/loginUser';
import { toast } from 'react-toastify';
import stylesRegister from 'src/styles/Register.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setIsVisible] = useState(false);

    const dispatch = useDispatch();

    const loginPress = () => {
        const payload = {
            email,
            password,
            toast,
        };
        dispatch(loginAction(payload));
    };

    const changeUserPasswordPress = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const changeUserEmailPress = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const toggleVisibilityForPassword = () => {
        setIsVisible(!visible);
    };

    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>Login</h2>
                <Link href={Routes.HOME} className={stylesRegister.link}>
                    home
                </Link>
            </div>
            <div className={stylesRegister.formContainer}>
                <Input placeholder={'enter email'} value={email} onChange={changeUserEmailPress} type="text" />
                <div className={stylesRegister.eyeContainer}>
                    <Input
                        placeholder={'enter password'}
                        value={password}
                        onChange={changeUserPasswordPress}
                        type={visible ? 'text' : 'password'}
                    />

                    <FontAwesomeIcon
                        icon={visible ? 'eye-slash' : 'eye'}
                        onClick={toggleVisibilityForPassword}
                        className={stylesRegister.eye}
                    />
                </div>

                <button className={styles.btn} onClick={loginPress} disabled={!email || !password}>
                    login
                </button>
            </div>
        </MainLayout>
    );
};

export default Login;
