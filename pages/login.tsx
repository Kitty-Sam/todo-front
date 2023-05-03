import { MainLayout } from '~/components/MainLayout';
import styles from '~/styles/Profile.module.css';
import Router from 'next/router';
import { Routes } from '~/pages/index';
import { Input } from '~/components/Input';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '~/store/sagas/sagasActions/actions/loginUser';
import { toast } from 'react-toastify';
import { getAppError } from '~/store/selectors/userSelector';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const loginPress = () => {
        const payload = {
            email,
            password,
            toast,
        };
        dispatch(loginAction(payload));
    };

    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>Login</h2>
                <button className={styles.btn} onClick={() => Router.push(Routes.HOME)}>
                    home
                </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Input placeholder={'enter your email'} value={email} onChange={(e: any) => setEmail(e.target.value)} />
                <Input
                    placeholder={'enter your password'}
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                />
                <div>
                    <button className={styles.btn} onClick={loginPress}>
                        login
                    </button>
                </div>
            </div>
        </MainLayout>
    );
};

export default Login;
