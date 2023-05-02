import { MainLayout } from '~/components/MainLayout';
import styles from '~/styles/Profile.module.css';
import Router from 'next/router';
import { Routes } from '~/pages/index';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getFriends } from '~/store/selectors/userSelector';
import { fetchFriendsAction } from '~/store/sagas/sagasActions/actions/fetchFriends';
import { removeFriendAction } from '~/store/sagas/sagasActions/actions/removeFriend';

const Friends = () => {
    const friends = useSelector(getFriends, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFriendsAction());
    }, []);
    const removeFriendPress = (email: string) => async () => {
        dispatch(removeFriendAction({ email }));
    };

    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>Friends</h2>
                <button className={styles.btn} onClick={() => Router.push(Routes.HOME)}>
                    home
                </button>
            </div>

            {friends.length && (
                <ol>
                    {friends.map((el, index) => (
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
