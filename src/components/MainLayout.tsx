import Head from 'next/head';
import styles from '../styles/MainLayout.module.scss';
import { FC, PropsWithChildren } from 'react';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <Head>
                <meta name={'keywords'} content={'good things'} />
                <meta charSet={'utf-8'} />
            </Head>
            <main className={styles.mainContent}>{children}</main>
        </div>
    );
};
