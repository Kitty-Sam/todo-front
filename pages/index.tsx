import styles from '~/styles/Home.module.css';
import Router from 'next/router';
import { MainLayout } from '~/components/MainLayout';
import { useEffect, useState } from 'react';
import { Form } from '~/components/Form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getDeals, getIsLogged } from '~/store/selectors/userSelector';
import { fetchDealsAction } from '~/store/sagas/sagasActions/actions/fetchDeals';
import { updateDealAction } from '~/store/sagas/sagasActions/actions/updateDeal';
import { removeDealAction } from '~/store/sagas/sagasActions/actions/removeDeal';
import { checkTokenAction } from '~/store/sagas/sagasActions/actions/checkToken';
import { PersonalInfo } from '~/components/PersonalInfo';
import { toast } from 'react-toastify';

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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDealsAction());
        dispatch(checkTokenAction());
    }, []);

    const removeDealPress = (id: string) => async () => {
        dispatch(removeDealAction({ id }));
        toast('Item is successfully removed!');
    };

    const updateDealPress = (newTitle: string, id: string) => async () => {
        dispatch(updateDealAction({ newTitle, id }));
        setEditMode('');
        toast('Title is successfully updated!');
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
                                            key={el.id}
                                            onDoubleClick={() => {
                                                setEditMode(el.title);
                                                setEditedDeal(el.title);
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
                                                {editMode === el.title ? (
                                                    <textarea
                                                        value={editedDeal}
                                                        onChange={(e) => setEditedDeal(e.target.value)}
                                                    />
                                                ) : (
                                                    <p>
                                                        {index + 1} {'. '}
                                                        {el.title}
                                                    </p>
                                                )}

                                                <button
                                                    onClick={
                                                        editMode === el.title
                                                            ? updateDealPress(editedDeal, el.id)
                                                            : removeDealPress(el.id)
                                                    }
                                                >
                                                    {editMode === el.title ? 'save' : 'x'}
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
