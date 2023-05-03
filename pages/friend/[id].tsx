import { MainLayout } from '~/components/MainLayout';
import styles from '~/styles/Profile.module.css';
import { Routes } from '~/pages';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { openedFriendAction } from '~/store/sagas/sagasActions/actions/openedFriend';
import { IUser } from '~/store/reducers/userReducer';
import { GetServerSideProps } from 'next';

const Friend = (data: { openedFriend: IUser }) => {
    const { openedFriend } = data;
    const { deals, name } = openedFriend;

    const { query } = useRouter();
    const { id } = query;

    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(openedFriendAction({ id: String(id) }));
        }
    }, []);

    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>{name} profile</h2>
                <Link href={Routes.FRIENDS}>back</Link>
            </div>
            <span>List</span>
            {!deals.length ? (
                <div>{name} does not have any good deals yet</div>
            ) : (
                <ol>
                    {deals.map((el, index) => (
                        <div key={el.id}>
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
                                <p>
                                    {index + 1} {'. '}
                                    {el.title}
                                </p>
                            </li>
                        </div>
                    ))}
                </ol>
            )}
        </MainLayout>
    );
};

export default Friend;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context?.query;

    const result = await fetch(`http://localhost:4000/user/get-user-by-id`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
    });

    const openedFriend = await result.json();

    return { props: { openedFriend } };
};
