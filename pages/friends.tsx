import { MainLayout } from '~/components/MainLayout';
import styles from '~/styles/Profile.module.css';
import { Routes } from '~/pages/index';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getFriends } from '~/store/selectors/userSelector';
import { fetchFriendsAction } from '~/store/sagas/sagasActions/actions/fetchFriends';
import { removeFriendAction } from '~/store/sagas/sagasActions/actions/removeFriend';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { openedFriendAction } from '~/store/sagas/sagasActions/actions/openedFriend';

const Friends = () => {
    const Router = useRouter();
    const friends = useSelector(getFriends, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFriendsAction());
    }, []);
    const removeFriendPress = (email: string) => async () => {
        dispatch(removeFriendAction({ email }));
    };

    const openedFriendPress = (id: string) => {
        Router.push(Routes.FRIEND_PROFILE + '/' + id);
        // dispatch(openedFriendAction({ email }));
    };

    // const normilizedFriends = friends.map((friend) => ({ id: Date.now().toString() + friend }));

    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>Friends</h2>
                <Link href={Routes.HOME}>home</Link>
                <p>You can look throw pages of your friends</p>
            </div>

            {!friends.length ? (
                <p>Just follow for someone from users page</p>
            ) : (
                <ol>
                    {friends.map((el, index) => (
                        <div key={el} onClick={() => openedFriendPress(el)}>
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
                                <button onClick={removeFriendPress(el)}>unfollow</button>
                            </li>
                        </div>
                    ))}
                </ol>
            )}
        </MainLayout>
    );
};

export default Friends;
