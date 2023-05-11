import { MainLayout } from '~/components/MainLayout';
import stylesRegister from 'src/styles/Register.module.scss';
import styles from 'src/styles/Profile.module.scss';

import { Routes } from './index';
import React, { ChangeEvent, useState } from 'react';
import { Input } from '~/components/Input';
import { useDispatch } from 'react-redux';
import { registerAction } from '~/store/sagas/sagasActions/actions/registerUser';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [visible, setIsVisible] = useState(false);

    const dispatch = useDispatch();
    const registerPress = () => {
        const payload = {
            email,
            name,
            password,
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

    const toggleVisibilityForPassword = () => {
        setIsVisible(!visible);
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
                <Input placeholder={'enter name'} value={name} onChange={changeUserNamePress} type="text" />
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
                <button className={styles.btn} onClick={registerPress} disabled={!email || !password}>
                    register
                </button>
            </div>
        </MainLayout>
    );
};

export default Register;
