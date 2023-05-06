import styles from 'src/styles/Home.module.scss';
import stylesLink from 'src/styles/Link.module.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayout } from '~/components/MainLayout';
import { PersonalInfo } from '~/components/PersonalInfo';
import { Form } from '~/components/Form';
import { getIsLogged } from '~/store/selectors/userSelector';
import { fetchDealsAction } from '~/store/sagas/sagasActions/actions/fetchDeals';
import { checkTokenAction } from '~/store/sagas/sagasActions/actions/checkToken';
import UserDeals from '~/components/UserDeals';
import Link from 'next/link';

export enum Routes {
    HOME = '/',
    FRIENDS = '/friends',
    USERS = '/users',
    FRIEND_PROFILE = '/friend',
    REGISTER = '/register',
    LOGIN = '/login',
}

export default function Home() {
    const [item, setItem] = useState('');

    const isLogged = useSelector(getIsLogged);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDealsAction());
        dispatch(checkTokenAction());
    }, []);

    return (
        <>
            <MainLayout>
                <div className={styles.mainContent}>
                    {!isLogged ? (
                        <div className={styles.text}>
                            <h1>List of good things</h1>
                            <div className={styles.buttonsContainer}>
                                <Link href={Routes.LOGIN} className={stylesLink.link}>
                                    login
                                </Link>
                                <Link href={Routes.REGISTER} className={stylesLink.link}>
                                    register
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.text}>
                            <h1>List of good things</h1>
                            <div className={styles.buttonsContainer}>
                                <Link href={Routes.FRIENDS} className={stylesLink.link}>
                                    friends
                                </Link>
                                <Link href={Routes.USERS} className={stylesLink.link}>
                                    all users
                                </Link>
                            </div>
                            <PersonalInfo />
                            <span>Create new item</span>
                            <Form item={item} setItem={setItem} />

                            <span>List</span>
                            <UserDeals />
                        </div>
                    )}
                </div>
            </MainLayout>
        </>
    );
}
