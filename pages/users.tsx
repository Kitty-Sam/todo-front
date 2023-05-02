import { MainLayout } from '~/components/MainLayout';
import styles from '~/styles/Profile.module.css';
import { useRouter } from 'next/router';
import { Routes } from '~/pages/index';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface IUser {
    id: string;
    name: string;
    email: string;
    deals: string[];
    friends: string[];
}

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0ZW1AZ21haWwuY29tIiwibmFtZSI6Iml0ZW0iLCJpYXQiOjE2ODMwMjkyMTAsImV4cCI6MTY4MzExNTYxMH0.xgt2oOE_q7YSyYULdG_KifQGXqtrwG-Fqxd_zYAetzw';
const Users = () => {
    // const { push } = useRouter();
    const [users, setUsers] = useState<null | IUser[]>(null);

    useEffect(() => {
        const callAPI = async () => {
            try {
                const res = await fetch(`http://localhost:4000/user/users`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                const normalizeData: IUser[] = data.map((el: any) => ({
                    id: el._id,
                    name: el.name,
                    email: el.email,
                    deals: el.deals,
                    friends: el.friends,
                }));
                setUsers(normalizeData);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };

        callAPI();
    }, []);

    const addFriend = async (value: string) => {
        try {
            const res = await fetch(`http://localhost:4000/user/add-friend`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: value }),
            });
            const data = await res.json();
            console.log('data after add', data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>Users</h2>
                <Link href={Routes.HOME}>home</Link>
            </div>
            {users && (
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
                                <button onClick={() => addFriend(el.email)}>follow</button>
                            </li>
                        </div>
                    ))}
                </ol>
            )}
        </MainLayout>
    );
};

export default Users;
