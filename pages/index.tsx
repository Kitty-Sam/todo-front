import styles from '~/styles/Home.module.css';
import Router from 'next/router';
import { MainLayout } from '~/components/MainLayout';
import { useEffect, useState } from 'react';
import { Form } from '~/components/Form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, getDeals, getIsLogged } from '~/store/selectors/userSelector';
import { fetchDealsAction } from '~/store/sagas/sagasActions/actions/fetchDeals';
import { updateDealAction } from '~/store/sagas/sagasActions/actions/updateDeal';
import { removeDealAction } from '~/store/sagas/sagasActions/actions/removeDeal';
import { checkTokenAction } from '~/store/sagas/sagasActions/actions/checkToken';
import { PersonalInfo } from '~/components/PersonalInfo';

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
    const [editedDeal, setEditedDeal] = useState('');
    const [editMode, setEditMode] = useState('');

    const deals = useSelector(getDeals, shallowEqual);
    const isLogged = useSelector(getIsLogged);
    const currentUser = useSelector(getCurrentUser, shallowEqual);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDealsAction());
        dispatch(checkTokenAction());
    }, []);

    const removeDealPress = (title: string) => async () => {
        dispatch(removeDealAction({ title }));
    };

    const updateDealPress = (newTitle: string, oldTitle: string) => async () => {
        dispatch(updateDealAction({ newTitle, oldTitle }));
        setEditMode('');
    };

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
                            <ol>
                                {!deals.length ? (
                                    <p>Please,create new deal</p>
                                ) : (
                                    deals.map((el, index) => (
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
                                                    // width: '200px',
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
                                                        editMode === el
                                                            ? updateDealPress(editedDeal, el)
                                                            : removeDealPress(el)
                                                    }
                                                >
                                                    {editMode === el ? 'save' : 'x'}
                                                </button>
                                            </li>
                                        </div>
                                    ))
                                )}
                            </ol>
                        </div>
                    )}
                </div>
            </MainLayout>
        </>
    );
}
