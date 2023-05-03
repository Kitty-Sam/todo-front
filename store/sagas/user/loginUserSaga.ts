import { call, put } from '@redux-saga/core/effects';
import { setAppStatus, setCurrentUser, setIsLogged } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { LoginUser } from '~/store/sagas/sagasActions/actions/loginUser';
import Router from 'next/router';
import { Routes } from '~/pages';

export function* loginUserWorker({ payload }: LoginUser) {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        // @ts-ignore
        const res = yield fetch(`http://localhost:4000/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data: { token: string } = yield res.json();

        yield localStorage.setItem('token', JSON.stringify(data.token));

        // @ts-ignore
        const result = yield fetch(`http://localhost:4000/user/get-user-by-email`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${data.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: payload.email }),
        });

        // @ts-ignore
        const currentUser = yield result.json();

        yield localStorage.setItem(
            'currentUser',
            JSON.stringify({
                name: currentUser.name,
                email: currentUser.email,
                friends: currentUser.friends,
                deals: currentUser.deals,
                id: currentUser.id,
            }),
        );

        yield put(
            setCurrentUser({
                currentUser: {
                    name: currentUser.name,
                    email: currentUser.email,
                    friends: currentUser.friends,
                    deals: currentUser.deals,
                    id: currentUser.id,
                },
            }),
        );

        yield put(setIsLogged({ isLogged: true }));

        yield call(Router.push, Routes.HOME);

        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
