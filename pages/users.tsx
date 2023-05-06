import { MainLayout } from '~/components/MainLayout';
import styles from 'src/styles/Profile.module.scss';
import { Routes } from './index';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getFriends } from '~/store/selectors/userSelector';
import { fetchAllUsersAction } from '~/store/sagas/sagasActions/actions/fetchAllUsers';
import { addFriendAction } from '~/store/sagas/sagasActions/actions/addFriend';
import { fetchFriendsAction } from '~/store/sagas/sagasActions/actions/fetchFriends';
import { removeFriendAction } from '~/store/sagas/sagasActions/actions/removeFriend';
import stylesLink from '~/styles/Link.module.scss';

const Users = () => {
    const users = useSelector(getAllUsers, shallowEqual);
    const friends = useSelector(getFriends, shallowEqual);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsersAction());
        dispatch(fetchFriendsAction());
    }, []);

    const addFriendPress = (payload: { email: string; id: string }) => async () => {
        const { email, id } = payload;
        dispatch(addFriendAction({ email, id }));
    };

    const removeFriendPress = (id: string) => async () => {
        dispatch(removeFriendAction({ id }));
    };

    const isFriend = (email: string) => {
        return friends.find((friend) => friend.email === email);
    };

    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>Users</h2>
                <Link href={Routes.HOME} className={stylesLink.link}>
                    home
                </Link>
                <p>Just follow for someone to look him/her list</p>
            </div>
            {!users.length ? (
                <p>It seems to me that your are alone here</p>
            ) : (
                <ol>
                    {users.map((el) => (
                        <div key={el.name} className={styles.friendContainer}>
                            <li className={styles.userItemContainer}>
                                <p>{el.name}</p>
                            </li>
                            <button
                                onClick={
                                    isFriend(el.email)
                                        ? removeFriendPress(el.id)
                                        : addFriendPress({ email: el.email, id: el.id })
                                }
                            >
                                {isFriend(el.email) ? 'unfollow' : 'follow'}
                            </button>
                        </div>
                    ))}
                </ol>
            )}
        </MainLayout>
    );
};

export default Users;
