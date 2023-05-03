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

        if (res?.ok) {
            yield call(Router.push, Routes.LOGIN);
            yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
            yield call(payload.toast, 'Success!');
        } else {
            yield call(payload.toast, 'Check your credentials (password should contains min 4 symbols');
        }
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
