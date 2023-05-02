import { call, put } from '@redux-saga/core/effects';
import { setAppStatus } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { RegisterUser } from '~/store/sagas/sagasActions/actions/registerUser';
import Router from 'next/router';
import { Routes } from '~/pages';

export function* registerUserWorker({ payload }: RegisterUser) {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        // @ts-ignore
        const res = yield fetch(`http://localhost:4000/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        // @ts-ignore
        // const data = yield res.json();
        // yield put(setCurrentUser({ currentUser: data }));
        yield call(Router.push, Routes.LOGIN);

        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
