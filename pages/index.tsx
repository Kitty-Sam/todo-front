import styles from '~/styles/Home.module.css';
import Router from 'next/router';
import { MainLayout } from '~/components/MainLayout';
import { useEffect, useState } from 'react';
import { Form } from '~/components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, getDeals } from '~/store/selectors/userSelector';
import { fetchDealsAction } from '~/store/sagas/sagasActions/actions/fetchDeals';
import { updateDealAction } from '~/store/sagas/sagasActions/actions/updateDeal';
import { removeDealAction } from '~/store/sagas/sagasActions/actions/removeDeal';

export enum Routes {
    HOME = '/',
    FRIENDS = '/friends',
    USERS = '/users',
    FRIEND_PROFILE = '/friendProfile',
    REGISTER = '/register',
    LOGIN = '/login',
}

export default function Home() {
    const [item, setItem] = useState('');
    const [editedDeal, setEditedDeal] = useState('');
    const [editMode, setEditMode] = useState('');

    const deals = useSelector(getDeals);
    const currentUser = useSelector(getCurrentUser);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDealsAction());
    }, []);

    const removeDealPress = (title: string) => async () => {
        dispatch(removeDealAction({ title }));
    };

    const updateDealPress = (newTitle: string, oldTitle: string) => async () => {
        console.log('newTitle', newTitle);
        dispatch(updateDealAction({ newTitle, oldTitle }));
        setEditMode('');
    };

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
                            <p>user name: {currentUser.name}</p>
                            <p>email: {currentUser.email}</p>
                        </div>

                        <span>Create new item</span>

                        <Form item={item} setItem={setItem} />

                        <span>List</span>
                        <ol>
                            {deals.map((el, index) => (
                                <div
                                    key={el}
                                    onDoubleClick={() => {
                                        setEditMode(el);
                                        setEditedDeal(el);
                                    }}
                                >
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
                                        {editMode === el ? (
                                            <textarea
                                                value={editedDeal}
                                                onChange={(e) => setEditedDeal(e.target.value)}
                                            />
                                        ) : (
                                            <p>
                                                {index + 1} {'. '}
                                                {el}
                                            </p>
                                        )}

                                        <button
                                            onClick={
                                                editMode === el ? updateDealPress(editedDeal, el) : removeDealPress(el)
                                            }
                                        >
                                            {editMode === el ? 'save' : 'x'}
                                        </button>
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
