import { MainLayout } from '~/components/MainLayout';
import styles from '~/styles/Profile.module.css';
import { Routes } from '~/pages';
import { shallowEqual, useSelector } from 'react-redux';
import { getOpenedFriend } from '~/store/selectors/userSelector';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Friend = () => {
    const openedFriend = useSelector(getOpenedFriend, shallowEqual);

    const { deals, name } = openedFriend;

    const { query } = useRouter();

    console.log('query', query);

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
                        <div key={el}>
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
                                    {el}
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
