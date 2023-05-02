import { MainLayout } from '~/components/MainLayout';
import styles from '~/styles/Profile.module.css';
import Router from 'next/router';
import { Routes } from '~/pages/index';

const FriendProfile = () => {
    return (
        <MainLayout>
            <div>
                <h2 className={styles.header}>Friends profile</h2>
                <button className={styles.btn} onClick={() => Router.push(Routes.HOME)}>
                    home
                </button>
            </div>
            <span>Friends list</span>
        </MainLayout>
    );
};

export default FriendProfile;
