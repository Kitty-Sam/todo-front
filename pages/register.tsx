import { MainLayout } from '~/components/MainLayout';
import styles from '~/styles/Profile.module.css';
import Router from 'next/router';
import { Routes } from '~/pages/index';
import { useState } from 'react';
import { Input } from '~/components/Input';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>Register</h2>
                <button className={styles.btn} onClick={() => Router.push(Routes.HOME)}>
                    home
                </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Input placeholder={'enter your name'} value={name} onChange={(e: any) => setName(e.target.value)} />
                <Input placeholder={'enter your email'} value={email} onChange={(e: any) => setEmail(e.target.value)} />
                <Input
                    placeholder={'enter your password'}
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                />
                <button className={styles.btn} onClick={() => console.log('register')}>
                    register
                </button>
            </div>
        </MainLayout>
    );
};

export default Register;