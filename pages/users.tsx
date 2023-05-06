import { MainLayout } from '~/components/MainLayout';
import styles from '~/styles/Profile.module.css';
import { Routes } from './index';
import Link from 'next/link';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getFriends } from '~/store/selectors/userSelector';
import { fetchAllUsersAction } from '~/store/sagas/sagasActions/actions/fetchAllUsers';
import { addFriendAction } from '~/store/sagas/sagasActions/actions/addFriend';
import { fetchFriendsAction } from '~/store/sagas/sagasActions/actions/fetchFriends';
import { removeFriendAction } from '~/store/sagas/sagasActions/actions/removeFriend';

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

    const removeFriendPress = (email: string) => async () => {
        dispatch(removeFriendAction({ email }));
    };

    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>Users</h2>
                <Link href={Routes.HOME}>home</Link>
                <p>Just follow for someone to look him/her list</p>
            </div>
            {!users.length ? (
                <p>It seems to me that your are alone here</p>
            ) : (
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
                                <button
                                    onClick={
                                        friends.find((friend) => friend.email === el.email)
                                            ? removeFriendPress(el.email)
                                            : addFriendPress({ email: el.email, id: el.id })
                                    }
                                >
                                    {friends.find((friend) => friend.email === el.email) ? 'unfollow' : 'follow'}
                                </button>
                            </li>
                        </div>
                    ))}
                </ol>
            )}
        </MainLayout>
    );
};

export default Users;
