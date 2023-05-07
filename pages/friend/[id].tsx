import { MainLayout } from '~/components/MainLayout';
import styles from 'src/styles/Profile.module.scss';
import stylesLink from 'src/styles/Link.module.scss';

import Link from 'next/link';
import { IUser } from '~/store/reducers/userReducer';
import { GetServerSideProps } from 'next';
import { Routes } from '../index';
import axios from 'axios';
import { removeFriendAction } from '~/store/sagas/sagasActions/actions/removeFriend';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const Friend = (data: { data?: IUser; error?: { message: string } }) => {
    const router = useRouter();

    const { id } = router.query;
    const dispatch = useDispatch();
    const removeFriendPress = (id: string) => () => {
        dispatch(removeFriendAction({ id }));
        router.push(Routes.FRIENDS);
    };

    const { deals, name } = data.data || {};

    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>{name} profile</h2>
                <Link href={Routes.FRIENDS} className={stylesLink.link}>
                    home
                </Link>
            </div>
            <span>List</span>
            {!deals || !deals.length ? (
                <>
                    <div>It is absent any good deals here or user removed his/her profile</div>
                    <button onClick={removeFriendPress(String(id))}>unfollow</button>
                </>
            ) : (
                <ol>
                    {deals.map((el) => (
                        <div key={el.id}>
                            <li className={styles.userItemContainer}>
                                <p>{el.title}</p>
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

    try {
        const { data } = await axios.post(
            'http://localhost:4000/user/get-user-by-id',
            {
                id: String(id),
            },
            {
                withCredentials: true,
                headers: {
                    Cookie: context.req.headers.cookie,
                },
            },
        );
        return { props: { data } };
    } catch (error) {
        console.log(error);

        return {
            props: {
                error: {
                    message: 'Error fetching data from server',
                },
            },
        };
    }
};
