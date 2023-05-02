import { call, put } from '@redux-saga/core/effects';
import { setAppStatus } from '~/store/actions/actions';
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
        yield call(Router.push, Routes.HOME);

        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
