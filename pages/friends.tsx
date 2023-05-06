import styles from '~/styles/Profile.module.scss';
import stylesLink from '~/styles/Link.module.scss';

import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { removeFriendAction } from '~/store/sagas/sagasActions/actions/removeFriend';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getFriends } from '~/store/selectors/userSelector';
import { fetchFriendsAction } from '~/store/sagas/sagasActions/actions/fetchFriends';
import { Routes } from './index';
import { MainLayout } from '~/components/MainLayout';

const Friends = () => {
    const Router = useRouter();
    const friends = useSelector(getFriends, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFriendsAction());
    }, []);
    const removeFriendPress = (id: string) => async () => {
        dispatch(removeFriendAction({ id }));
    };

    const openedFriendPress = (id: string) => {
        Router.push(`${Routes.FRIEND_PROFILE}/${id}`);
    };

    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>Friends</h2>
                <Link href={Routes.HOME} className={stylesLink.link}>
                    home
                </Link>
                <p>You can look throw pages of your friends</p>
            </div>

            {!friends.length ? (
                <p>Just follow for someone from users page</p>
            ) : (
                <ol>
                    {friends.map((el) => (
                        <div key={el.id} className={styles.friendContainer}>
                            <li className={styles.userItemContainer}>
                                <p onClick={() => openedFriendPress(el.id)}>{el.email}</p>
                            </li>
                            <button onClick={removeFriendPress(el.id)}>unfollow</button>
                        </div>
                    ))}
                </ol>
            )}
        </MainLayout>
    );
};

export default Friends;
