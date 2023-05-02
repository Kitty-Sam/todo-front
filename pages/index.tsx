import styles from '~/styles/Home.module.css';
import Router from 'next/router';
import { MainLayout } from '~/components/MainLayout';
import { useState } from 'react';
import { Form } from '~/components/Form';

export enum Routes {
    HOME = '/',
    FRIENDS = '/friends',
    USERS = '/users',
    FRIEND_PROFILE = '/friendProfile',
    REGISTER = '/register',
    LOGIN = '/login',
}

const list = ['buy apple', 'clean room', 'fix broken table', 'play with dog'];

export default function Home() {
    const [item, setItem] = useState('');

    return (
        <>
            <MainLayout>
                <div className={styles.mainContent}>
                    <div className={styles.text}>
                        <h1>List of good things</h1>
                        <div className={styles.buttonsContainer}>
                            <button className={styles.btn} onClick={() => Router.push(Routes.FRIENDS)}>
                                friends
                            </button>
                            <button className={styles.btn} onClick={() => Router.push(Routes.USERS)}>
                                all users
                            </button>
                            <button className={styles.btn} onClick={() => Router.push(Routes.LOGIN)}>
                                login
                            </button>
                            <button className={styles.btn} onClick={() => Router.push(Routes.REGISTER)}>
                                register
                            </button>
                            <button className={styles.btn} onClick={() => Router.push(Routes.FRIEND_PROFILE)}>
                                friend profile
                            </button>
                        </div>
                        <div>
                            <span>Personal info</span>
                            <p>user name: test</p>
                            <p>email: test@gmail.com</p>
                        </div>

                        <span>Create new item</span>

                        <Form item={item} setItem={setItem} />

                        <span>List</span>
                        <ol>
                            {list.map((el, index) => (
                                <div key={el}>
                                    <li
                                        style={{
                                            paddingTop: '10px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            width: '200px',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <p>
                                            {index + 1} {'. '}
                                            {el}
                                        </p>
                                        <button onClick={() => console.log('el', el)}>x</button>
                                    </li>
                                </div>
                            ))}
                        </ol>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}
