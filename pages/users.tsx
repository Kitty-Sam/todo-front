import { MainLayout } from '~/components/MainLayout';
import styles from '~/styles/Profile.module.css';
import { useRouter } from 'next/router';
import { Routes } from '~/pages/index';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IUser } from '~/store/reducers/authReducer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '~/store/selectors/userSelector';
import { fetchAllUsersAction } from '~/store/sagas/sagasActions/actions/fetchAllUsers';

const Users = () => {
    const users = useSelector(getAllUsers, shallowEqual);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsersAction());
    }, []);

    // const addFriend = async (value: string) => {
    //     try {
    //         const res = await fetch(`http://localhost:4000/user/add-friend`, {
    //             method: 'POST',
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ email: value }),
    //         });
    //         const data = await res.json();
    //         console.log('data after add', data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>Users</h2>
                <Link href={Routes.HOME}>home</Link>
            </div>
            {users.length && (
                <ol>
                    {users.map((el, index) => (
                        <div key={el.name}>
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
                                    {el.name}
                                </p>
                                {/*<button onClick={() => addFriend(el.email)}>follow</button>*/}
                            </li>
                        </div>
                    ))}
                </ol>
            )}
        </MainLayout>
    );
};

export default Users;
