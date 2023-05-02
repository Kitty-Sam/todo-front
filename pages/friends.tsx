import { MainLayout } from '~/components/MainLayout';
import styles from '~/styles/Profile.module.css';
import Router from 'next/router';
import { Routes } from '~/pages/index';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getFriends } from '~/store/selectors/userSelector';
import { fetchFriendsAction } from '~/store/sagas/sagasActions/actions/fetchFriends';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0ZW1AZ21haWwuY29tIiwibmFtZSI6Iml0ZW0iLCJpYXQiOjE2ODMwMjkyMTAsImV4cCI6MTY4MzExNTYxMH0.xgt2oOE_q7YSyYULdG_KifQGXqtrwG-Fqxd_zYAetzw';
const Friends = () => {
    const friends = useSelector(getFriends, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFriendsAction());
    }, []);
    // const removeFriend = async (value: string) => {
    //     try {
    //         const res = await fetch(`http://localhost:4000/user/remove-friend`, {
    //             method: 'DELETE',
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ email: value }),
    //         });
    //         const data = await res.json();
    //         setFriends(data);
    //         console.log('data after remove', data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

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
                                {/*<button onClick={() => removeFriend(el)}>unfollow</button>*/}
                            </li>
                        </div>
                    ))}
                </ol>
            )}
        </MainLayout>
    );
};

export default Friends;
