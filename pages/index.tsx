import styles from '~/src/styles/Home.module.css';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayout } from '~/components/MainLayout';
import { PersonalInfo } from '~/components/PersonalInfo';
import { Form } from '~/components/Form';
import { getIsLogged } from '~/store/selectors/userSelector';
import { fetchDealsAction } from '~/store/sagas/sagasActions/actions/fetchDeals';
import { checkTokenAction } from '~/store/sagas/sagasActions/actions/checkToken';
import UserDeals from '~/components/UserDeals';

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
                                {/*<Link href={Routes.LOGIN}>login</Link>*/}
                                {/*<Link href={Routes.REGISTER}>register</Link>*/}
                                <button className={styles.btn} onClick={() => Router.push(Routes.LOGIN)}>
                                    login
                                </button>
                                <button className={styles.btn} onClick={() => Router.push(Routes.REGISTER)}>
                                    register
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.text}>
                            <h1>List of good things</h1>
                            <div className={styles.buttonsContainer}>
                                <button className={styles.btn} onClick={() => Router.push(Routes.FRIENDS)}>
                                    friends
                                </button>
                                <button className={styles.btn} onClick={() => Router.push(Routes.USERS)}>
                                    all users
                                </button>
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
