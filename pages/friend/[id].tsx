import { MainLayout } from '~/components/MainLayout';
import styles from '~/styles/Profile.module.css';
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
    const dispatch = useDispatch();
    const removeFriendPress = (email: string) => () => {
        dispatch(removeFriendAction({ email }));
        router.push(Routes.FRIENDS);
    };

    const { deals, name } = data.data || {};

    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>{name} profile</h2>
                <Link href={Routes.FRIENDS}>back</Link>
            </div>
            <span>List</span>
            {!deals || !deals.length ? (
                <>
                    <div>It is absent any good deals here or user removed his/her profile</div>
                    <button onClick={removeFriendPress('asd@gmail.com')}>unfollow</button>
                </>
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
        console.log('data request', data);
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
